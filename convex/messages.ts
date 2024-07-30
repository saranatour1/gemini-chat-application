// get messages in thread
import { v } from "convex/values";
import { internalAction, internalMutation, mutation, query, action, internalQuery } from "./_generated/server";
import { auth } from "./auth";
import { getAll, getManyFrom } from "convex-helpers/server/relationships";
import { chatResponse, singleMessageChat, singleOutputResponse } from "./model";
import { Doc, Id } from "./_generated/dataModel";
import { internal } from "./_generated/api";
import { DatabaseReader } from "./_generated/server";
import { getUserSettings } from "./settingsHelpers";
import { getEntireChat, summarizeThread } from "./threadHelpers";
import { settingsSchema } from "./schema";
import { literals } from "convex-helpers/validators";
import { runModelResponses } from "./messagesHelpers";

// viewing the message in thread
export const viewer = query({
  args: { threadId: v.id("threads") },
  handler: async (ctx, args_0) => {
    const messages = await getManyFrom(ctx.db, "messages", "threadId", args_0.threadId);
    return messages;
  },
});

export const threadMessages = internalQuery({
  args: { threadId: v.id("threads") },
  handler: async (ctx, args_0) => {
    return await getEntireChat(ctx, args_0.threadId);
  },
});

// creating the messages, either user or system or assistant
export const createMessage = mutation({
  args: { content: v.string(), threadId: v.id("threads") },
  handler: async (ctx, args) => {
    // adding the new message written by the user to the db
    const user = await auth.getUserId(ctx);
    const newMessage = await ctx.db.insert("messages", {
      threadId: args.threadId,
      message: args.content,
      state: "generating",
      author: { role: "user", userId: user! },
    });
    // getting the user settings
    const { settings } = await getUserSettings(ctx);
    await summarizeThread(ctx, args.threadId, settings!);

    await runModelResponses(ctx,newMessage,args.content,args.threadId, settings!)
  },
});

export const singleMessageResponse = internalAction({
  args:{messageId:v.id("messages"), content:v.string(), threadId:v.id("threads"), settings:v.object(settingsSchema)},
  handler:async(ctx, args_0)=>{
    console.log("single chat response")
    const result = await singleMessageChat(args_0.content, args_0.settings);
    for await (const chunk of result.stream) {
      const chunkText = chunk.text();
      // chunkedText += chunkText;
      await ctx.runMutation( internal.messages.setUpMessage, {
        messageId: args_0.messageId,
        messageChunk: chunkText,
        state:"generating"
      });
    }
    await ctx.runMutation(internal.messages.finishJob, {
      messageId: args_0.messageId,
      completeMessage: "", // Send the complete message
      state:"success"
    });
  },
})

export const setUpMessage = internalMutation({
  args: { messageId: v.id("messages"), messageChunk: v.string() ,state:literals("success", "generating", "failed")},
  handler: async (ctx, args_0) => {
    const existingMessage = await ctx.db.get(args_0.messageId);
    const updatedMessage = existingMessage!.message + args_0.messageChunk;
    await ctx.db.patch(args_0.messageId, {
      message: updatedMessage,
    });
  },
});

export const finishJob = internalMutation({
  args: { messageId: v.id("messages"), completeMessage: v.string(), state:literals("success", "generating", "failed")},
  handler: async (ctx, args_0) => {
    await ctx.db.patch(args_0.messageId, {
      state: "success",
      message: args_0.completeMessage, // Ensure the message is fully updated
    });
  },
});

// entire chat response
export const runEntireChat = internalAction({
  args: { settings: v.object(settingsSchema), threadId: v.id("threads"), messageId: v.id("messages") },
  handler: async (ctx, args_0) => {
    const messages = await ctx.runQuery(internal.messages.threadMessages, { threadId: args_0.threadId });
    const result = await chatResponse(messages, args_0.settings);
    for await (const chunk of result.stream) {
      await ctx.runMutation(internal.messages.patchStreamMessage, {
        messageId: args_0.messageId,
        chunk: chunk.text(),
        state: "generating",
      });
    }
    await ctx.runMutation(internal.messages.patchStreamMessage, {
      messageId: args_0.messageId,
      chunk: ".",
      state: "success",
    });
  },
});

// patch existing message
export const patchStreamMessage = internalMutation({
  args: { messageId: v.id("messages"), chunk: v.string(), state: literals("success", "generating", "failed") },
  handler: async (ctx, args_0) => {
    const message = await ctx.db.get(args_0.messageId);
    const updatedMessage = message?.message + args_0.chunk;
    await ctx.db.patch(args_0.messageId, {
      message: updatedMessage,
      state: args_0.state,
    });
  },
});

/** Summarize functions */
export const summarize = internalAction({
  args: { threadId: v.id("threads"), firstMessage: v.string(), settings:v.any() },
  handler: async (ctx, args_0) => {
    const prompt = `write a proper summary that describes the following message ${args_0.firstMessage}, make it small, straight to the point, no longer than 30 characters, don't type anything else other than chat title summary.`;

    await ctx.scheduler.runAfter(5000, internal.messages.actionToSummarize, {
      prompt: prompt,
      threadId: args_0.threadId,
      settings: args_0.settings as Doc<"settings">,
    });
  },
});

export const actionToSummarize = internalAction({
  args: { prompt: v.string(), threadId: v.id("threads"), settings: v.any() },
  handler: async (ctx, args_0) => {
    const request = await singleOutputResponse(args_0.prompt, args_0.settings as Doc<"settings">);
    const response = request.response.text();
    await ctx.scheduler.runAfter(0, internal.messages.updateSummery, {
      output: response,
      id: args_0.threadId,
    });
  },
});

export const updateSummery = internalMutation({
  args: { output: v.string(), id: v.id("threads") },
  handler: async (ctx, args_0) => {
    await ctx.db.patch(args_0.id, {
      summary: args_0.output,
    });
  },
});

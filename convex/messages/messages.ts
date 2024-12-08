// get messages in thread
import { v } from "convex/values";
import { internalAction, query, internalQuery } from "@convex/_generated/server";
import { chatResponse, singleMessageChat, singleOutputResponse } from "../model";
import { Doc } from "@convex/_generated/dataModel";
import { internal } from "@convex/_generated/api";
import { getUserSettings } from "@convex/settings/settingsHelpers";
import { getEntireChat, summarizeThread } from "../threads/threadHelpers";
import { literals } from "convex-helpers/validators";
import { mutateStream, runModelResponses } from "./messagesHelpers";
import { internalMutation, mutation } from "../functions";
import { getCurrentUser } from "@convex/users/userHelpers";

// viewing the message in thread
export const viewer = query({
  args: { threadId: v.id("threads") },
  handler: async (ctx, args_0) => {
    const messages = await getEntireChat(ctx, args_0.threadId)
    return messages;
  },
});
// internal query to run later on
export const threadMessages = internalQuery({
  args: { threadId: v.id("threads") },
  handler: async (ctx, args_0) => {
    return await getEntireChat(ctx, args_0.threadId);
  },
});

// creating the messages, either user or system or assistant
export const createMessage = mutation({
  args: { content: v.string(), threadId: v.id("threads"), file:v.optional(v.any()) },
  handler: async (ctx, args) => {
    // adding the new message written by the user to the db
    const user = await getCurrentUser(ctx) // just the userId
    const newUserMessage = await ctx.db.insert("messages", {
      threadId: args.threadId,
      message: args.content,
      state: "generating",
      author: { role: "user", userId: user?._id! },
    });
    
    // getting the user settings
    const { settings } = await getUserSettings(ctx);
    await summarizeThread(ctx, args.threadId, settings!);

    if(args.file instanceof File && args.file !== undefined){
      await ctx.scheduler.runAfter(0,internal.messages.messages.sendMessageWithAttachment,{
        threadId:args.threadId,
        file:args.file,
        content:args.content
      })
    }else{
      await runModelResponses(ctx, newUserMessage, args.content, args.threadId, settings!);
    }
  },
});

export const singleMessageResponse = internalAction({
  args: { messageId: v.id("messages"), content: v.string(), threadId: v.id("threads"), settings: v.any() },
  handler: async (ctx, args_0) => {
    const result = await singleMessageChat(args_0.content, args_0.settings);
    await mutateStream(ctx, result.stream,args_0.messageId)
  },
});

export const setUpMessage = internalMutation({
  args: { messageId: v.id("messages"), messageChunk: v.string(), state: literals("success", "generating", "failed") },
  handler: async (ctx, args_0) => {
    const existingMessage = await ctx.db.get(args_0.messageId);
    const updatedMessage = existingMessage!.message + args_0.messageChunk;
    await ctx.db.patch(args_0.messageId, {
      message: updatedMessage,
    });
  },
});

// entire chat response
export const runEntireChat = internalAction({
  args: { settings: v.any(), threadId: v.id("threads"), messageId: v.id("messages") },
  handler: async (ctx, args_0) => {
    const messages = await ctx.runQuery(internal.messages.messages.threadMessages, { threadId: args_0.threadId });
    const result = await chatResponse(messages, args_0.settings);
    await mutateStream(ctx,result.stream,args_0.messageId)
  },
});

/** Summarize functions */
export const summarize = internalAction({
  args: { threadId: v.id("threads"), firstMessage: v.string(), settings: v.any() },
  handler: async (ctx, args_0) => {
    const prompt = `write a proper summary that describes the following message ${args_0.firstMessage}, make it small, straight to the point, no longer than 30 characters, don't type anything else other than chat title summary.`;

    await ctx.runAction(internal.messages.messages.actionToSummarize, {
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
    await ctx.scheduler.runAfter(0, internal.messages.messages.updateSummery, {
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

export const sendMessageWithAttachment = internalAction({
  args:{threadId:v.id("threads"), file:v.optional(v.any()),content:v.string()},
  handler(ctx, args_0) {
    console.info("hey", args_0.file,args_0.threadId, args_0.content)
  },
})
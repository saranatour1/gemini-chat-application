// get messages in thread
import { v } from "convex/values";
import { internalAction, internalMutation, mutation, query, action } from './_generated/server';
import { auth } from "./auth";
import { getAll, getManyFrom } from "convex-helpers/server/relationships";
import { model } from "./model";
import { Id } from "./_generated/dataModel";
import { internal } from "./_generated/api";
import { DatabaseReader } from "./_generated/server";
export const viewer = query({
  args: { threadId: v.id("threads") },
  handler: async (ctx, args_0) => {
    const messages = await getManyFrom(ctx.db, "messages", "threadId", args_0.threadId);
    return messages;
  },
});

export const createMessage = mutation({
  args: { content: v.string(), threadId: v.id("threads") },
  handler: async (ctx, args) => {
    const user = await auth.getUserId(ctx);
    const newMessage = await ctx.db.insert("messages", {
      threadId: args.threadId,
      message: args.content,
      state: "generating",
      author: { role: "user", userId: user! },
    });
    
    
    await ctx.scheduler.runAfter(0, internal.messages.runModelResponse, {
      messageId: newMessage,
      threadId: args.threadId,
      content: args.content,
    });
  },
});

export const runModelResponse = internalMutation({
  args: {
    messageId: v.id("messages"),
    threadId: v.id("threads"),
    content:v.string() // message to respond to
  },
  handler:async(ctx, args_0) =>{
    const newMessageUpdate = await ctx.db.insert("messages",{
      threadId:args_0.threadId,
      message:"...",
      author:{
      role:"assistant",
      },
      state:"generating",
    })
    
    await ctx.scheduler.runAfter(0,internal.messages.maintainStream,{
      messageId:newMessageUpdate,
      content: args_0.content,
    })
  },
});


export const maintainStream = internalAction({
  args: { content: v.string(), messageId: v.id("messages") },
  handler: async (ctx, args) => {
    let chunkedText = "";
    const result = await model.generateContentStream(args.content);
    for await (const chunk of result.stream) {
      const chunkText = chunk.text();
      chunkedText += chunkText;
      await ctx.scheduler.runAfter(0, internal.messages.setUpMessage, {
        messageId: args.messageId,
        messageChunk: chunkText,
      });
    }
    await ctx.scheduler.runAfter(0, internal.messages.finishJob, {
      messageId: args.messageId,
      completeMessage: chunkedText, // Send the complete message
    });
  },
});

export const setUpMessage = internalMutation({
  args: { messageId: v.id("messages"), messageChunk: v.string() },
  handler: async (ctx, args_0) => {
    const existingMessage = await ctx.db.get(args_0.messageId);
    const updatedMessage = existingMessage!.message + args_0.messageChunk;
    await ctx.db.patch(args_0.messageId, {
      message: updatedMessage,
    });
  },
});

export const finishJob = internalMutation({
  args: { messageId: v.id("messages"), completeMessage: v.string() },
  handler: async (ctx, args_0) => {
    await ctx.db.patch(args_0.messageId, {
      state: "success",
      message: args_0.completeMessage, // Ensure the message is fully updated
    });
  },
});

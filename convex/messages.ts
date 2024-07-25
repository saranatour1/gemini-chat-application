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
    });
  },
});

export const runModelResponse = internalMutation({
  args: {
    messageId: v.id("messages"),
    threadId: v.id("threads"),
  },
  handler:async(ctx, args_0) =>{

  },
});



// export const runModelResponse = internalAction({
//   args: {
//     messageId: v.id("messages"),
//     threadId: v.id("threads"),
//   },
//   handler: async (ctx, args) => {
//     let chunkedText = "";

//     const newMessage = await ctx.db.get(args.messageId); // from user
//     const newUpdatedMessage = await ctx.db.insert("messages", {
//       threadId: args.threadId,
//       author: {
//         role: "assistant",
//         // context: olderMessages,
//       },
//       state: "generating",
//       message: "...",
//     });

//     const result = await model.generateContentStream(newMessage?.message!);

//     for await (const chunk of result.stream) {
//       const chunkText = chunk.text();
//       chunkedText += chunkText;
//       await ctx.db.patch(newUpdatedMessage, {
//         message: chunkedText,
//       });
//     }

//     await ctx.db.patch(newUpdatedMessage, {
//       state: "success",
//     });

//     return {message:"success"}
//   },
// });
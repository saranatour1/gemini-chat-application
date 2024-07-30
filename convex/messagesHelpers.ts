import { internal } from "./_generated/api";
import { Doc, Id } from "./_generated/dataModel";
import { MutationCtx } from "./_generated/server";
import { singleMessageChat } from "./model";

export const runModelResponses = async(ctx:MutationCtx, messageId:Id<"messages">,content:string, threadId:Id<"threads">,settings:Doc<"settings">) =>{
  const newMessageUpdate = await ctx.db.insert("messages", {
    threadId: threadId,
    message: "...",
    author: {
      role: "assistant",
    },
    state: "generating",
  });

  if (settings.responseType === "single-message") {
    await ctx.scheduler.runAfter(0, internal.messages.singleMessageResponse,{
      messageId:newMessageUpdate,
      content:content,
      threadId:threadId,
      settings:settings
    })
  } else {
    // run for entire chat response
    await ctx.scheduler.runAfter(0, internal.messages.runEntireChat, {
      settings: settings,
      threadId: threadId,
      messageId: newMessageUpdate, // to patch by the model
    });
  }
}

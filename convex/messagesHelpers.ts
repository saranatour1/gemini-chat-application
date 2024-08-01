import { EnhancedGenerateContentResponse } from "@google/generative-ai";
import { internal } from "./_generated/api";
import { Doc, Id } from "./_generated/dataModel";
import { ActionCtx, MutationCtx } from "./_generated/server";
import { singleMessageChat } from "./model";

export const runModelResponses = async(ctx:MutationCtx, messageId:Id<"messages">,content:string, threadId:Id<"threads">,settings:Doc<"settings">, attachment?:File) =>{
  const newMessageUpdate = await ctx.db.insert("messages", {
    threadId: threadId,
    message: "",
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
  } else if(settings.responseType ==="chat") {
    // run for entire chat response
    await ctx.scheduler.runAfter(0, internal.messages.runEntireChat, {
      settings: settings,
      threadId: threadId,
      messageId: newMessageUpdate, // to patch by the model
    });
  }
}

export const mutateStream =async(ctx:ActionCtx, stream: AsyncGenerator<EnhancedGenerateContentResponse, any, any>, messageId:Id<"messages">)=>{
  let chunkedText = "";
  for await (const chunk of stream){
    chunkedText += chunk.text()
    await ctx.runMutation(internal.messages.setUpMessage, {
      messageId: messageId,
      messageChunk: chunk.text(),
      state: "generating",
    });
  }
  await ctx.runMutation(internal.messages.setUpMessage, {
    messageId: messageId,
    messageChunk: "", // Send the complete message
    state: "success",
  });
}
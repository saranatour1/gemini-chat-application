import { getManyFrom } from "convex-helpers/server/relationships";
import { internal } from "../_generated/api";
import { Doc, Id } from "../_generated/dataModel";
import { MutationCtx, QueryCtx } from "../_generated/server";
import { getMessagesFromThreadId } from "@convex/messages/messagesHelpers";

// summarize thread through first messages
export const summarizeThread = async (ctx: MutationCtx, threadId: Id<"threads">, settings:Doc<"settings">) => {
  const firstMessage = await ctx.db
    .query("messages")
    .withIndex("threadId", (q) => q.eq("threadId", threadId))
    .collect();
  if (firstMessage.length === 1) {
    await ctx.scheduler.runAfter(0, internal.messages.messages.summarize, {
      threadId: threadId,
      firstMessage: firstMessage[0].message,
      settings:settings
    });
  }
};

export const getEntireChat = async(ctx:QueryCtx,id:Id<"threads">) =>{
  const allMessages = await ctx.db.query("messages").withIndex("threadId",q=> q.eq("threadId",id)).collect();
  return allMessages
}

// check if the previous created thread has messages, and 5 min has passed 
export const checkLastThreads = async (ctx:MutationCtx,userId:Id<"users">)=>{
  let hasNewThreads = false; 
  const fiveMinutesAgo = Date.now() - (5 * 60 * 1000);
  const lastTwoThreads = await ctx.db.query("threadsMembers").withIndex("userId",q=>q.eq("userId",userId)).order("asc").take(2)
  
  for (const thread of lastTwoThreads) {
    if (thread._creationTime >= fiveMinutesAgo) {
      hasNewThreads = true;
      break;
    }
  }
  
  return hasNewThreads
}
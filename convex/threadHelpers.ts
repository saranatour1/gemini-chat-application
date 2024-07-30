import { internal } from "./_generated/api";
import { Doc, Id } from "./_generated/dataModel";
import { MutationCtx, QueryCtx } from "./_generated/server";

// summarize thread through first messages
export const summarizeThread = async (ctx: MutationCtx, threadId: Id<"threads">, settings:Doc<"settings">) => {
  const firstMessage = await ctx.db
    .query("messages")
    .withIndex("threadId", (q) => q.eq("threadId", threadId))
    .collect();
  if (firstMessage.length === 1) {
    await ctx.scheduler.runAfter(0, internal.messages.summarize, {
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
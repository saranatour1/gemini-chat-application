import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { auth } from "./auth";

export const viewer = query({
  args: { chatId: v.id("chats") },
  handler: async (ctx, args)=> {
    try {
      if(!args.chatId){
        throw new ConvexError("please pick a valid chatId")
      }
      const chat = await ctx.db.query("messages")
      .withIndex('chatId',(q)=> q.eq('chatId', args.chatId))
      .order('desc')
      .collect()
      
      return Promise.all(
        chat.reverse().map(async (message) => {
          const { name, email, phone } = (await ctx.db.get(message.senderId))!;
          return { ...message, author: name ?? email ?? phone ?? "Anonymous" };
        }),
      );

    } catch (error) {
      throw new ConvexError("problem with viewing chat")
    }
  }
});

export const createMessage = mutation({
  args: { chatId: v.id("chats"), content: v.string()},
  handler: async (ctx, args) => {
    const user = await  auth.getUserId(ctx)
    const newMessageId = await ctx.db.insert('messages', { chatId: args.chatId, message: args.content, senderId:user! });
    return newMessageId;
  },
});

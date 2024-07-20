import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { auth } from "./auth";

export const viewer = query({
  args: {},
  handler: async (ctx) => {
    try {
      const userId = await auth.getUserId(ctx);
      const channelUsers = await ctx.db
        .query("channelUsers")
        .withIndex("userId", (q) => q.eq("userId", userId!))
        .order("desc")
        .collect();
      const channelIds = channelUsers.map((cu) => cu.channelId);
      // Todo: get the last message with author
      const channels = await Promise.all(channelIds.map((id) => ctx.db.get(id)));
      return channels.filter(i=> i!==null);
    } catch (e) {
      throw new ConvexError("something wrong happened while fetching messages");
    }
  },
});

// create a channel
export const createChat = mutation({
  args: { name: v.string(), users: v.optional(v.id("users"))},
  handler: async (ctx, args) => {
    const userId = await auth.getUserId(ctx);
    const createdChannel = await ctx.db.insert("channels", {
      name: args.name,
    });
   
    const data = await ctx.db.insert("channelUsers", { userId: userId!, channelId: createdChannel })
    return await ctx.db.get(createdChannel);
  },
});

export const deleteChat = mutation({
  args: { channelId: v.id("channels") },
  handler: async (ctx, args_0) => {
    const usersInChannel = await ctx.db.query('channelUsers')
    .withIndex("channelId", (q)=> q.eq('channelId', args_0.channelId))
    .collect();
    const deleteUsers = await Promise.all(usersInChannel.map((item)=> ctx.db.delete(item._id)))
    return await ctx.db.delete(args_0.channelId);
  },
});

export const updateChannelName = mutation({
  args: { channelId: v.id("channels"), newName: v.string() },
  handler: async (ctx, args_0) => {
    const updateName = await ctx.db.patch(args_0.channelId, { name: args_0.newName });
    return { message: "updated name" };
  },
});

// add users to channel
export const addUsersToChannel = mutation({
  args: { chanelId: v.id("channels"), userId: v.id("users") },
  handler: async (ctx, args) => {
    const updatedChannelUsers = await ctx.db.insert("channelUsers", { channelId: args.chanelId, userId: args.userId });
    return { message: "added user successfully" };
  },
});

// get chatInfotmation by Id 
export const getChatById = query({
  args:{chatId: v.id("channels")},
  handler:async(ctx, args)=> {
    const channelInformation = await ctx.db.get(args.chatId);
    return channelInformation;
  },
})
import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { auth } from "./auth";
import { Id } from "./_generated/dataModel";

export const viewer = query({
  args: {},
  handler: async (ctx) => {
    try {
      const userId = await auth.getUserId(ctx);
      const channelUsers = await ctx.db
        .query("channelUsers")
        .withIndex("userId", (q) => q.eq("userId", userId!))
        .collect();
      const channelIds = channelUsers.map((cu) => cu.channelId);
      const channels = await Promise.all(channelIds.map((id) => ctx.db.get(id)));
      return channels;
    } catch (e) {
      throw new ConvexError("something wrong happened while fetching messages");
    }
  },
});

// create a channel
export const createChat = mutation({
  args: { name: v.string(), users: v.id("users") },
  handler: async (ctx, args) => {
    const userId = await auth.getUserId(ctx);
    const createdChannel = await ctx.db.insert("channels", {
      name: args.name,
    });
    const allUsers = [args.users, userId].filter((i) => i !== null) as Id<"users">[];
    const data = await Promise.all(
      allUsers.map((id) => ctx.db.insert("channelUsers", { userId: id, channelId: createdChannel }))
    );
    return await ctx.db.get(createdChannel);
  },
});

export const deleteChat = mutation({
  args: { channelId: v.id("channels") },
  handler: async (ctx, args_0) => {
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

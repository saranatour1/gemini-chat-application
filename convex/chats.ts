import { ConvexError, v } from "convex/values";
import { query } from "./_generated/server";
import { auth } from "./auth";

export const viewer = query({
  args: {},
  handler: async (ctx) => {
    try {
      const userId = await auth.getUserId(ctx);
      // view an array of messages that the logged user has with people
      const chats = await ctx.db
        .query("chats")
        .collect()
        .then((chat) => chat.filter((c) => c.userIds.includes(userId!)));
      return chats;
    } catch (e) {
      throw new ConvexError("something wrong happened while fetching messages");
    }
  },
});


import { query } from "./_generated/server";
import { auth } from "./auth";

export const viewer = query({
  args: {},
  handler: async (ctx) => {
    const userId = await auth.getUserId(ctx);
    return userId !== null ? ctx.db.get(userId) : null;
  },
});

export const list = query({
  args: {},
  handler: async (ctx) => {
    const userDocs = await ctx.db.query("users").collect();
    return userDocs.map((doc) => ({
      _id: doc._id,
      name: doc.name,
      email: doc.email,
    }));
  },
});
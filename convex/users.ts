import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { auth } from "./auth";

export const viewer = query({
  args:{},
  handler:async(ctx, args_0)=> {
    const userId = await auth.getUserId(ctx);
    return ctx.db.get(userId!);
  },
})

export const updateName = mutation({
  args:{name:v.string()},
  handler:async(ctx, args_0)=> {
    const user = await auth.getUserId(ctx);
    await ctx.db.patch(user!,{
      name: args_0.name
    })
  },
})


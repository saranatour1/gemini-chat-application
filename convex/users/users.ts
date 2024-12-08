import { v } from "convex/values";
import { query } from "../_generated/server";
import { mutation } from "../functions";
import { getAuthUserId } from "@convex-dev/auth/server";

export const viewer = query({
  args:{},
  handler:async(ctx, args_0)=> {
    const userId = await getAuthUserId(ctx);
    return userId ? ctx.db.get(userId!):null;
  },
})

export const updateName = mutation({
  args:{name:v.string()},
  handler:async(ctx, args_0)=> {
    const user = await getAuthUserId(ctx);
    await ctx.db.patch(user!,{
      name: args_0.name
    })
  },
})

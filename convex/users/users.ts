import { v } from "convex/values";
import { query } from "../_generated/server";
import { mutation } from "../functions";
import { getCurrentUser } from "./userHelpers";

export const viewer = query({
  args:{},
  handler:async(ctx, args_0)=> {
  return await getCurrentUser(ctx)
  },
})

export const updateName = mutation({
  args:{name:v.string()},
  handler:async(ctx, args_0)=> {
    const user = await getCurrentUser(ctx)
    if(!user) return
    await ctx.db.patch(user._id,{
      name: args_0.name
    })
  },
})

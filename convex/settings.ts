import { query } from "./_generated/server";
import { auth } from "./auth";

export const viewer = query({
  args:{},
  handler:async(ctx, args_0)=>{
    const user = await auth.getUserId(ctx);
    const userSettings = await ctx.db.query("settings").withIndex("userId",q=>q.eq('userId',user!)).unique()
    return userSettings
  },
})
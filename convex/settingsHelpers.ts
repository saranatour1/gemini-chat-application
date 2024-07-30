import { QueryCtx } from "./_generated/server";
import { auth } from "./auth";
import { getCurrentUser } from "./userHelpers";

export const getUserSettings = async(
  ctx: QueryCtx,
)=>{
  const userId = await auth.getUserId(ctx);
  const settings = await ctx.db.query('settings')
    .withIndex('userId', q => q.eq('userId', userId!)).unique()
  return {settings , userId}
}
import { Id } from "./_generated/dataModel";
import { MutationCtx, QueryCtx } from "./_generated/server";
import { auth } from "./auth";
import { getCurrentUser } from "./userHelpers";

export const getUserSettings = async(
  ctx: QueryCtx|MutationCtx,
)=>{
  const userId = await auth.getUserId(ctx);
  const settings = await ctx.db.query('settings')
    .withIndex('userId', q => q.eq('userId', userId!)).unique()
  return {settings , userId}
}

export const updateUserSettings = async(ctx:MutationCtx)=>{
  const {settings,userId} = await getUserSettings(ctx)
  if(settings === null || settings === undefined){
    await ctx.db.insert('settings',{
      userId: userId as Id<"users">,
      responseType:"single-message",
      theme:"light",
      keepChat:(Date.now() + 604800), // 1 week
      languages:"en",
      model:"gemini-1.0-pro-latest",
      attachments:{
        audio:false,
        images:false
      }
    })
  }
} 
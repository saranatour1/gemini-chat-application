import { Id } from "@convex/_generated/dataModel";
import { MutationCtx, QueryCtx } from "@convex/_generated/server";
import { getCurrentUser } from "@convex/users/userHelpers";

export const getUserSettings = async(
  ctx: QueryCtx|MutationCtx,
)=>{
  const userId = await getCurrentUser(ctx)
  const settings = await ctx.db.query('settings')
    .withIndex('userId', q => q.eq('userId', userId?._id!)).unique()
  return {settings , userId}
}

export const updateUserSettings = async(ctx:MutationCtx)=>{
  const {settings,userId} = await getUserSettings(ctx)
  if(settings === null || settings === undefined){
    await ctx.db.insert('settings',{
      userId: userId?._id as Id<"users">,
      responseType:"single-message",
      keepChat:(Date.now() + 604800), // 1 week
      languages:"en",
      model:"gemini-1.0-pro",
      attachments:{
        audio:false,
        images:false
      }
    })
  }
} 
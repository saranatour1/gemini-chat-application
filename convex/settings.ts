import { v } from "convex/values";
import { Doc, Id } from "./_generated/dataModel";
import { mutation, query } from "./_generated/server";
import { auth } from "./auth";
import { getUserSettings } from "./settingsHelpers";
import { partial } from "convex-helpers/validators";
import schema, { settingsSchema } from "./schema";

export const viewer = query({
  args:{},
  handler:async(ctx, args_0)=>{
    const {settings} = await getUserSettings(ctx)
    return settings;
  },
})

export const createUserSettings = mutation({
  args:{},
  handler:async (ctx, args_0)=> {   
    const user = await auth.getUserId(ctx);
    const settings = await ctx.db.query("settings").withIndex("userId",q=>q.eq('userId',user!)).first()
    if(settings === null || settings === undefined){
      await ctx.db.insert('settings',{
        userId: user as Id<"users">,
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
  return null;
  },
})

export const update = mutation({
  args:{settingsId: v.id("settings"), body: v.object(partial(settingsSchema))},
  handler:async(ctx, args_0) => {
    await ctx.db.patch(args_0.settingsId, args_0.body)
  },
})
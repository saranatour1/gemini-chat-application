import { v } from "convex/values";
import { Doc, Id } from "./_generated/dataModel";
import { mutation, query } from "./_generated/server";
import { auth } from "./auth";
import { getUserSettings, updateUserSettings } from "./settingsHelpers";
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
    await updateUserSettings(ctx)
  return null;
  },
})

export const update = mutation({
  args:{settingsId: v.id("settings"), body: v.object(partial(settingsSchema))},
  handler:async(ctx, args_0) => {
    await ctx.db.patch(args_0.settingsId, args_0.body)
  },
})
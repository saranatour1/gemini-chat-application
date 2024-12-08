import { Migrations } from "@convex-dev/migrations";
import { components } from "./_generated/api.js";
import { DataModel } from "./_generated/dataModel.js";

export const migrations = new Migrations<DataModel>(components.migrations);
export const run = migrations.runner();

export const removeBoolean = migrations.define({
  table: "settings",
  migrateOne: async (ctx, setting) => {
    if ( setting.model !== undefined) {
      await ctx.db.patch(setting._id, { model: undefined });
    }
  },
});


export const defaultValue = migrations.define({
  table:"settings", 
  migrateOne:async (ctx,setting)=>{
    if(setting.model === undefined){
      await ctx.db.patch(setting._id, {model:"gemini-1.5-flash-001"})
    }
  }
})
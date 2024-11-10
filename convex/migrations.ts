import { Migrations } from "@convex-dev/migrations";
import { components } from "./_generated/api.js";
import { DataModel } from "./_generated/dataModel.js";

export const migrations = new Migrations<DataModel>(components.migrations);
export const run = migrations.runner();

export const removeTheme = migrations.define({
  table: "settings",
  migrateOne: async (ctx, settings) => {
    if (settings.theme !== undefined) {
      await ctx.db.patch(settings._id, { theme: undefined });
    }
  },
});



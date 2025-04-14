// convex/convex.config.ts
import { defineApp } from "convex/server";
import migrations from "@convex-dev/migrations/convex.config";
import agent from "@convex-dev/agent/convex.config";


const app = defineApp();
app.use(migrations);
app.use(agent)
export default app;
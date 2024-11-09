/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";
import type * as auth from "../auth.js";
import type * as functions from "../functions.js";
import type * as http from "../http.js";
import type * as messages from "../messages.js";
import type * as messagesHelpers from "../messagesHelpers.js";
import type * as model from "../model.js";
import type * as settings from "../settings.js";
import type * as settingsHelpers from "../settingsHelpers.js";
import type * as threadHelpers from "../threadHelpers.js";
import type * as threads from "../threads.js";
import type * as userHelpers from "../userHelpers.js";
import type * as users from "../users.js";

/**
 * A utility for referencing Convex functions in your app's API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
declare const fullApi: ApiFromModules<{
  auth: typeof auth;
  functions: typeof functions;
  http: typeof http;
  messages: typeof messages;
  messagesHelpers: typeof messagesHelpers;
  model: typeof model;
  settings: typeof settings;
  settingsHelpers: typeof settingsHelpers;
  threadHelpers: typeof threadHelpers;
  threads: typeof threads;
  userHelpers: typeof userHelpers;
  users: typeof users;
}>;
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;

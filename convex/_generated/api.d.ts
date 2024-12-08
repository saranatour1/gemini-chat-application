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
import type * as messages_messages from "../messages/messages.js";
import type * as messages_messagesHelpers from "../messages/messagesHelpers.js";
import type * as model from "../model.js";
import type * as settings_settings from "../settings/settings.js";
import type * as settings_settingsHelpers from "../settings/settingsHelpers.js";
import type * as threads_threadHelpers from "../threads/threadHelpers.js";
import type * as threads_threads from "../threads/threads.js";
import type * as users_userHelpers from "../users/userHelpers.js";
import type * as users_users from "../users/users.js";

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
  "messages/messages": typeof messages_messages;
  "messages/messagesHelpers": typeof messages_messagesHelpers;
  model: typeof model;
  "settings/settings": typeof settings_settings;
  "settings/settingsHelpers": typeof settings_settingsHelpers;
  "threads/threadHelpers": typeof threads_threadHelpers;
  "threads/threads": typeof threads_threads;
  "users/userHelpers": typeof users_userHelpers;
  "users/users": typeof users_users;
}>;
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;

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
import type * as codeExecutions from "../codeExecutions.js";
import type * as http from "../http.js";
import type * as snippets from "../snippets.js";
import type * as stripe from "../stripe.js";
import type * as users from "../users.js";
import type * as userSubscriptions from "../userSubscriptions.js";

/**
 * A utility for referencing Convex functions in your app's API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
declare const fullApi: ApiFromModules<{
  codeExecutions: typeof codeExecutions;
  http: typeof http;
  snippets: typeof snippets;
  stripe: typeof stripe;
  users: typeof users;
  userSubscriptions: typeof userSubscriptions;
}>;
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;

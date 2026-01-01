/**
 * An array of routes that are accessible to public
 * This routes don't require authentication
 * @type {string[]}
 */

export const publicRoutes = ["/"];

/**
 * An array of routes that are used for authentication
 * This routes will redirect the loggedin users to /settings
 * @type {string[]}
 */

export const authRoutes = ["/login", "/signup"];
/**
 * The prefix for api authentication routes
 * Routes that starts with this prefix are used for API authentication purposes
 * @type {string}
 */
export const apiAuthPrefix = "/api/auth";

/**
 * The default redirect path after logging in
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = "/settings";

/**
 * An array of routes that are accessible to public
 * This routes don't require authentication
 * @type {string[]}
 */

export const publicRoutes = ["/", "/new-verification"]; //this can be accessed by both loggedin and logout users

/**
 * An array of routes that are used for authentication
 * This routes will redirect the loggedin users to /settings
 * @type {string[]}
 */

export const authRoutes = [
  //this only accessed by logout users
  "/login",
  "/signup",
  "/error",
  "/reset",
  "/new-password",
];
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
export const DEFAULT_LOGIN_REDIRECT = "/";

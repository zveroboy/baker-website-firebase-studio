import { BetterAuth } from "better-auth";

// This will create the api routes for all the different operations
// e.g. /api/auth/login, /api/auth/logout etc.
// you can find all the default routes in the documentation
export const { GET, POST } = BetterAuth();

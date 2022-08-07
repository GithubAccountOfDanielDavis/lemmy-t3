// src/server/router/index.ts
import * as t from "./context";

import { exampleRouter } from "./example";
import { authRouter } from "./auth";
import { communityRouter } from "./community";

export const appRouter = t.router({
  example: exampleRouter,
  auth: authRouter,
  community: communityRouter
})

// export type definition of API
export type AppRouter = typeof appRouter;

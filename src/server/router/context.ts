// src/server/router/context.ts
import * as trpc from "@trpc/server"
import { initTRPC, TRPCError } from "@trpc/server"
import * as trpcNext from "@trpc/server/adapters/next"
import { unstable_getServerSession as getServerSession } from "next-auth"
import superjson from 'superjson'

import { authOptions as nextAuthOptions } from "../../pages/api/auth/[...nextauth]"
import { prisma } from "../db/client"

export const createContext = async (
  opts?: trpcNext.CreateNextContextOptions,
) => {
  const req = opts?.req
  const res = opts?.res

  const session =
    req && res && (await getServerSession(req, res, nextAuthOptions))

  return {
    req,
    res,
    session,
    prisma,
  }
}

type Context = trpc.inferAsyncReturnType<typeof createContext>;

export const {
  /** Builder object for creating procedures */
  procedure,

  /** Create reusable middlewares */
  middleware,
  
  /** Create a router */
  router,
  
  /** Merge multiple routers into one */
  mergeRouters

} = initTRPC<{
  ctx: Context
}>()({
  transformer: superjson
})

/** Builder object for creating procedures which require a session */
export const authedProcedure = procedure.use(
  middleware(({ next, ctx }) => {
    if (ctx.session == null) throw new TRPCError({ code: "UNAUTHORIZED" })
    return next({ctx: { user: ctx.session }})
  })
)

export const authedProcedureWithCreator = procedure.use(
  middleware(({ next, ctx }) => {
    const creatorId = ctx.session?.user?.id
    if (creatorId == null) throw new TRPCError({ code: "UNAUTHORIZED" })
    return next({ ctx: { user: ctx.session, creatorId } })
  })
)
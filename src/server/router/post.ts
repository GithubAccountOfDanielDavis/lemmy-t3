import * as t from "./context";
import { z } from "zod";

export const postRouter = t.router({
  getAll: t
    .procedure
    .query(async ({ ctx }) => {
      return await ctx.prisma.post.findMany()
    }),
  getOneById: t
    .procedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input, ctx }) => {
      return await ctx.prisma.post.findFirstOrThrow({ where: input })
    }),
  create: t
    .authedProcedureWithCreator
    .input(z.object({
      title: z.string(),
      body: z.string(),
    }))
    .mutation(async ({ input, ctx }) => {
      return await ctx.prisma.post.create({
        data: { ...input, creatorId: ctx.creatorId }
      })
    }),
})

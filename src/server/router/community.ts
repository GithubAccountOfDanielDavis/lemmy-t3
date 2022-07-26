import * as t from "./context";
import { z } from "zod";

export const communityRouter = t.router({
  getAll: t
    .procedure
    .query(async ({ ctx }) => {
      return await ctx.prisma.community.findMany()
    }),
  getOneByName: t
    .procedure
    .input(z.object({ name: z.string() }))
    .query(async ({ input, ctx }) => {
      return await ctx.prisma.community.findFirstOrThrow({ where: input })
    }),
  create: t
    .authedProcedureWithCreator
    .input(z.object({
      name: z.string(),
      title: z.string(),
      description: z.string(),
    }))
    .mutation(async ({ input, ctx }) => {
      return await ctx.prisma.community.create({
        data: { ...input, creatorId: ctx.creatorId }
      })
    }),
})

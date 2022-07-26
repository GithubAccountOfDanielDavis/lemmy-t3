import { createRouter } from "./context";
import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { prisma } from '../db/client'

export const communityRouter = createRouter()
  .middleware(async ({ ctx, next }) => {
    // Any queries or mutations after this middleware will
    // raise an error unless there is a current session
    
    return next();
  })
  .mutation("create", {
    input: z
      .object({
        name: z.string(),
        title: z.string(),
        description: z.string(),
      }),
    async resolve({ input, ctx }) {
      const creatorId = ctx.session?.user?.id
      if (!creatorId) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }
      return await ctx.prisma.community.create({
        data: { ...input, creatorId }
      })
    },
  })
  .query("getAll", {
    async resolve({ ctx }) {
      return await ctx.prisma.community.findMany();
    },
  })
  .query('getOneByName', {
    input: z.object({ name: z.string() }),
    async resolve({ input, ctx }) {
      return await ctx.prisma.community.findFirstOrThrow({where: input})
    }
  });

import * as t from './context'
import { z } from 'zod'

export const exampleRouter = t.router({
  hello: t
    .procedure
    .input(z
      .object({
        text: z.string().nullish()
      })
      .nullish()
    )
    .query(({ input }) => ({ greeting: `Hello ${input?.text ?? "world"}` })),
  getAll: t
    .procedure
    .query(async ({ ctx }) => {
      return await ctx.prisma.example.findMany()
    })
})

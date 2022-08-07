import * as t from "./context";

export const authRouter = t.router({
  getSession: t.procedure
    .query(({ ctx }) => ctx.session),
  getSecretMessage: t.authedProcedure
    .query(({ ctx }) => 'You are logged in and can see this secret message!')
})

import { Elysia } from "elysia";

import { auth } from "../modules/auth/auth";
import { AppError, AppErrorCode } from "../shared/http/errors";

export const betterAuthPlugin = new Elysia({ name: "better-auth" })
  .mount(auth.handler)
  .macro({
    auth: {
      async resolve({ request: { headers } }) {
        const session = await auth.api.getSession({ headers });

        if (!session) {
          throw new AppError({
            code: AppErrorCode.UNAUTHORIZED,
            status: 401,
            message: "Unauthorized",
          });
        }

        return {
          user: session.user,
          session: session.session,
        };
      },
    },
  });

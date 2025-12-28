import { Elysia } from "elysia";
import { rateLimit } from "elysia-rate-limit";
import { helmet } from "elysia-helmet";
import { env } from "../config/env";

export const securityPlugin = new Elysia({ name: "security" })
  .use(
    helmet({
      contentSecurityPolicy: env.NODE_ENV === "prod",
    })
  )
  .use(
    rateLimit({
      duration: 60000,
      max: 100,
      errorResponse: new Response(
        JSON.stringify({
          code: "TOO_MANY_REQUESTS",
          message: "Too many requests, please try again later.",
        }),
        {
          status: 429,
          headers: {
            "Content-Type": "application/json",
          },
        }
      ),
    })
  );

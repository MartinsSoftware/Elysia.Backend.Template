import { Elysia } from "elysia";

import { env } from "./config/env";
import { betterAuthPlugin } from "./plugins/auth.plugin";
import { healthRoutes } from "./modules/health/health.routes";
import { AppErrorCode, isAppError } from "./shared/http/errors";
import { logger } from "./shared/logging/logger";
import { openApiPlugin } from "./plugins/openapi.plugin";

const app = new Elysia()
  .use(betterAuthPlugin)
  .use(openApiPlugin)
  .group("/api", (api) => api.use(healthRoutes))
  .onError(({ code, error, set }) => {
    if (isAppError(error)) {
      set.status = error.status;
      return {
        code: error.code,
        message: error.message,
        details: error.details,
      };
    }

    if (code === "NOT_FOUND") {
      set.status = 404;
      return {
        code: AppErrorCode.NOT_FOUND,
        message: "Not Found",
      };
    }

    if (code === "VALIDATION") {
      set.status = 400;
      return {
        code: AppErrorCode.VALIDATION_ERROR,
        message: "Validation error",
        details: error,
      };
    }

    set.status = 500;
    return {
      code: AppErrorCode.INTERNAL_SERVER_ERROR,
      message: "Internal server error",
    };
  })
  .listen(env.PORT);

logger.info(
  `Server listening on http://${app.server?.hostname}:${app.server?.port}`
);

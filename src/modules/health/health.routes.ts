import { Elysia } from "elysia";

export const healthRoutes = new Elysia().get(
  "/health",
  () => {
    return {
      status: "ok",
    };
  },
  {
    detail: {
      description: "Health check",
    },
    tags: ["Health"],
  }
);

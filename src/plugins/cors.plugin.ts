import { cors } from "@elysiajs/cors";
import { Elysia } from "elysia";
import { env } from "@/config/env";

export const corsPlugin = new Elysia({ name: "CORS" }).use(
  cors({
    origin: env.CORS_ORIGIN.split(","),
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

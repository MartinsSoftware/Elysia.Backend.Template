import postgres from "postgres";

import { drizzle } from "drizzle-orm/postgres-js";
import type { PostgresJsDatabase } from "drizzle-orm/postgres-js";

import { env } from "../config/env";
import * as schema from "./schema";

let queryClient: postgres.Sql | undefined;
let db: PostgresJsDatabase<typeof schema> | undefined;

export function getDb() {
  if (db) return db;

  if (!env.DATABASE_URL) {
    throw new Error("DATABASE_URL is required to initialize the database");
  }

  queryClient = postgres(env.DATABASE_URL);
  db = drizzle(queryClient, {
    schema,
    logger: false,
  });

  return db;
}

export async function closeDb() {
  await queryClient?.end({ timeout: 5 });
}

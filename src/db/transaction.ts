import type { PostgresJsDatabase } from "drizzle-orm/postgres-js";

type Tx<TSchema extends Record<string, unknown>> = Parameters<
  PostgresJsDatabase<TSchema>["transaction"]
>[0] extends (tx: infer TTx) => Promise<unknown>
  ? TTx
  : never;

export async function withTx<TSchema extends Record<string, unknown>, TResult>(
  db: PostgresJsDatabase<TSchema>,
  fn: (tx: Tx<TSchema>) => Promise<TResult>
): Promise<TResult> {
  return db.transaction(async (tx) => fn(tx));
}

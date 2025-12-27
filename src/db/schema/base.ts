import { timestamp, uuid } from "drizzle-orm/pg-core";

export const baseColumns = {
  id: uuid("id").defaultRandom().primaryKey(),
  createdAt: timestamp("createdAt", { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updatedAt", { withTimezone: true })
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
};

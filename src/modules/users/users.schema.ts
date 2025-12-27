import { pgTable, text } from "drizzle-orm/pg-core";
import { boolean } from "drizzle-orm/pg-core";

import { baseColumns } from "../../db/schema/base";

export const users = pgTable("users", {
  ...baseColumns,
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("emailVerified").notNull().default(false),
  image: text("image"),
  firstName: text("firstName").notNull(),
  lastName: text("lastName").notNull(),
});

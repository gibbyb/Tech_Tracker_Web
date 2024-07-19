// https://orm.drizzle.team/docs/sql-schema-declaration
import { sql } from "drizzle-orm";
import {
  bigint,
  mysqlTableCreator,
  timestamp,
  varchar,
} from "drizzle-orm/mysql-core";

export const createTable = mysqlTableCreator((name) => `${name}`);

export const users = createTable(
  "users",
  {
    id: bigint("id", {mode: "number"}).primaryKey().autoincrement(),
    name: varchar("name", { length: 256 }).notNull(),
    status: varchar("status", { length: 256 }).notNull(),
    updatedAt: timestamp("updated_at")
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
  },
);

export const history = createTable(
  "history",
  {
    id: bigint("id", {mode: "number"}).primaryKey().autoincrement(),
    user_id: bigint("user_id", {mode: "number"}).references(() => users.id),
    status: varchar("status", { length: 256 }).notNull(),
    updatedAt: timestamp("updated_at").notNull(),
  },
);

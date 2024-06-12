import {
  sqliteTable,
  text,
  uniqueIndex,
  integer
} from "drizzle-orm/sqlite-core";
import { createId } from '@paralleldrive/cuid2';
import { sql } from "drizzle-orm";

//  tables
export const users = sqliteTable(
  "users",
  {
    id: text("id").primaryKey().$defaultFn(() => createId()),
    displayName: text("displayName"),
    email: text("email"),
    provider: text("provider"),
    created: text("created").default(sql`(CURRENT_TIMESTAMP)`),
  },
  (users) => ({
    emailIndex: uniqueIndex("emailIndex").on(users.email),
  })
);

export const projects = sqliteTable(
  "projects",
  {
    id: text("id").primaryKey().$defaultFn(() => createId()),
    name: text("name"),
    owner_id: text("owner_id").references(() => users.id, { onDelete: 'cascade' }).notNull(),
    created: text("created").default(sql`(CURRENT_TIMESTAMP)`),
  },
);

export const environments = sqliteTable(
  "environments",
  {
    id: text("id").primaryKey().$defaultFn(() => createId()),
    name: text("name"),
    color: text("color"),
    project_id: text("project_id").references(() => projects.id, { onDelete: 'cascade' }).notNull(),
    owner_id: text("owner_id").references(() => users.id, { onDelete: 'cascade' }).notNull(),
    updated: text("updated").default(sql`(CURRENT_TIMESTAMP)`),
  },
);

export const flags = sqliteTable(
  "flags",
  {
    id: text("id").primaryKey().$defaultFn(() => createId()),
    name: text("name"),
    key: text("key"),
    project_id: text("project_id").references(() => projects.id, { onDelete: 'cascade' }).notNull(),
    owner_id: text("owner_id").references(() => users.id, { onDelete: 'cascade' }).notNull(),
    created: text("created").default(sql`(CURRENT_TIMESTAMP)`),
  }
);

export const flags_columns = sqliteTable(
  "flags_columns",
  {
    id: text("id").primaryKey().$defaultFn(() => createId()),
    flag_id: text("flag_id").references(() => flags.id, { onDelete: 'cascade' }).notNull(),
    environment_id: text("environment_id").references(() => environments.id, { onDelete: 'cascade' }).notNull(),
    owner_id: text("owner_id").references(() => users.id, { onDelete: 'cascade' }).notNull(),
    is_active: integer('is_active', { mode: 'boolean' }),
    updated: text("updated").default(sql`(CURRENT_TIMESTAMP)`),
  }
)

export const apikeys = sqliteTable(
  "apikeys",
  {
    id: text("id").primaryKey().$defaultFn(() => createId()),
    api_key: text("api_key"),
    project_id: text("project_id").references(() => projects.id, { onDelete: 'cascade' }).notNull(),
    owner_id: text("owner_id").references(() => users.id, { onDelete: 'cascade' }).notNull(),
    created: text("created").default(sql`(CURRENT_TIMESTAMP)`),
  }
);
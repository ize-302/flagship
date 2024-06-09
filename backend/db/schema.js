import {
  sqliteTable,
  text,
  uniqueIndex,
} from "drizzle-orm/sqlite-core";
import { createId } from '@paralleldrive/cuid2';

//  tables
export const users = sqliteTable(
  "users",
  {
    id: text("id").primaryKey().$defaultFn(() => createId()),
    username: text("username"),
    password: text("password"),
  },
  (users) => ({
    usernameIndex: uniqueIndex("usernameIndex").on(users.username),
  })
);

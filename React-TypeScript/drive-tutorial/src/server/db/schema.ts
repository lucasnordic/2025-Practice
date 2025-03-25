import 'server-only'

import { sql } from 'drizzle-orm'
import {
  int,
  index,
  singlestoreTableCreator,
  timestamp,
  varchar,
  bigint,
} from 'drizzle-orm/singlestore-core'

/**
 * database instance for multiple projects
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = singlestoreTableCreator(
  (name) => `drive-tutorial_${name}`
)

const files = createTable(
  'files_table',
  {
    id: bigint('id', { mode: 'number', unsigned: true })
      .primaryKey()
      .autoincrement(),
    name: varchar('name', { length: 255 }).notNull(),
    parentId: bigint('parentId', { mode: 'number', unsigned: true }),
    createdAt: timestamp('created_at')
      .notNull()
      .default(sql`CURRENT_TIMESTAMP`),
    updatedAt: timestamp('updated_at').onUpdateNow(),
    size: int('size').notNull().default(0),
    url: varchar('url', { length: 255 }).notNull(),
  },
  (t) => [index('parent_index').on(t.parentId)]
)

const folders = createTable(
  'folders_table',
  {
    id: bigint('id', { mode: 'number', unsigned: true })
      .primaryKey()
      .autoincrement(),
    name: varchar('name', { length: 255 }).notNull(),
    parentId: bigint('parentId', { mode: 'number', unsigned: true }),
    createdAt: timestamp('created_at')
      .notNull()
      .default(sql`CURRENT_TIMESTAMP`),
    updatedAt: timestamp('updated_at').onUpdateNow(),
    size: int('size').notNull().default(0),
  },
  (t) => [index('parent_index').on(t.parentId)]
)

export { files, folders }

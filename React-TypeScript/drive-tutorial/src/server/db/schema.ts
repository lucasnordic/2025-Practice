import { int, singlestoreTable, text } from 'drizzle-orm/singlestore-core'

// single store table is not actually deprecated.
// the third parameter is now an array instead of an object
export const users = singlestoreTable('users_table', {
  id: int('id').primaryKey().autoincrement(),
  name: text('name').notNull(),
  age: int('age').notNull().default(18),
})

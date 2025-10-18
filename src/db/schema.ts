import { sql } from 'drizzle-orm';
import { int, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const notesTable = sqliteTable('notes', {
  id: int().primaryKey({ autoIncrement: true }),
  title: text().notNull(),
  message: text().notNull(),
  isArchived: int({ mode: 'boolean' }).default(false),
  createdAt: text('created_at')
    .notNull()
    .default(sql`(current_timestamp)`),
  updatedAt: int('updated_at', { mode: 'number' })
    .notNull()
    .default(sql`(unixepoch())`),
});

export type SelectNote = typeof notesTable.$inferSelect;
export type InsertNote = typeof notesTable.$inferInsert;

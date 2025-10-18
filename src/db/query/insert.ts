import { db } from '@/db';
import { notesTable, type InsertNote } from '@/db/schema';

export async function addNewNote(formValues: InsertNote) {
  await db.insert(notesTable).values(formValues);
}

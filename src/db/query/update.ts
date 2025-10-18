import { eq } from 'drizzle-orm';
import { db } from '@/db';
import { notesTable, type InsertNote } from '@/db/schema';

export async function updatewNote(formValues: InsertNote, targetId: number) {
  await db.update(notesTable).set(formValues).where(eq(notesTable.id, targetId));
}

export async function archiveNote(targetId: number) {
  await db.update(notesTable).set({ isArchived: true }).where(eq(notesTable.id, targetId));
}

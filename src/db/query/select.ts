import { db } from '@/db';
import { notesTable, type SelectNote } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function getNotes(): Promise<SelectNote[]> {
  return await db.select().from(notesTable).where(eq(notesTable.isArchived, false));
}

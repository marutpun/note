import type { Route } from './+types/_index';
import * as z from 'zod';
import { addNewNote } from '@/db/query/insert';
import { NoteForm, NoteList } from '@/components/';
import { editNoteSchema, noteSchema } from '@/schema/noteFormSchema';
import { type InsertNote } from '@/db/schema';
import { getNotes } from '@/db/query/select';
import { Separator } from '@/components/ui/separator';
import { updatewNote, archiveNote } from '@/db/query/update';
import { sql } from 'drizzle-orm';

export function meta({}: Route.MetaArgs) {
  return [{ title: 'Home - Greentea' }];
}

export async function loader() {
  const notes = await getNotes();
  return { notes };
}

export default function IndexPage({}: Route.ComponentProps) {
  return (
    <div className="container my-8 space-y-4 w-full max-w-160">
      <NoteForm />
      <Separator />
      <NoteList />
    </div>
  );
}

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const formValues = Object.fromEntries(formData);

  if (formValues._action === 'create') {
    const validatedForm = noteSchema.safeParse(formValues);

    if (!validatedForm.success) {
      return { success: false, error: z.flattenError(validatedForm.error) };
    }
    const note: InsertNote = { title: validatedForm.data.title, message: validatedForm.data.message };

    try {
      await addNewNote(note);
      return { success: true };
    } catch (error) {
      console.error('Failed to add note:', error);
      return { success: false, error: 'Failed to save note. Please try again.' };
    }
  }

  if (formValues._action === 'edit') {
    const validatedForm = editNoteSchema.safeParse(formValues);

    if (!validatedForm.success) {
      return { success: false, error: z.flattenError(validatedForm.error) };
    }

    const note: InsertNote = {
      title: validatedForm.data.title,
      message: validatedForm.data.message,
      updatedAt: sql`(unixepoch())`,
    };

    try {
      await updatewNote(note, Number(validatedForm.data.id));

      return { success: true };
    } catch (error) {
      console.error('Failed to add note:', error);
      return { success: false, error: 'Failed to edit note. Please try again.' };
    }
  }

  if (formValues._action === 'delete') {
    try {
      await archiveNote(Number(formValues.id));

      return { success: true };
    } catch (error) {
      console.error('Failed to add note:', error);
      return { success: false, error: 'Failed to archive note. Please try again.' };
    }
  }
}

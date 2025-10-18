import * as z from 'zod';

export const noteSchema = z.object({
  title: z.string().min(1, { message: 'Title is required' }),
  message: z.string().min(1, { message: 'Message is required' }),
  _action: z.enum(['create', 'edit']),
});

export const editNoteSchema = noteSchema.extend({
  id: z.union([z.string(), z.number()]),
});

export type NoteSchemaType = z.infer<typeof noteSchema>;
export type EditNoteSchemaType = z.infer<typeof editNoteSchema>;

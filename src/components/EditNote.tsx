import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Spinner } from '@/components/ui/spinner';
import type { SelectNote } from '@/db/schema';
import { editNoteSchema, type EditNoteSchemaType } from '@/schema/noteFormSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Pencil } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Controller, useForm, type SubmitHandler } from 'react-hook-form';

import { useFetcher, useRouteLoaderData } from 'react-router';
import { timeAgo } from '@/utils';

export default function EditNote({ noteId }: { noteId: number }) {
  const routeLoaderData = useRouteLoaderData('app');
  const note: SelectNote = routeLoaderData?.notes.find((note: SelectNote) => note.id === noteId);
  const [openDialog, setOpenDialog] = useState(false);

  const fetcher = useFetcher();
  const isSubmitting = fetcher.state === 'submitting';
  const prevStateRef = useRef(fetcher.state);

  const form = useForm<EditNoteSchemaType>({
    resolver: zodResolver(editNoteSchema),
    defaultValues: {
      title: note.title,
      message: note.message,
      _action: 'edit',
      id: note.id,
    },
  });

  const _handleSubmitForm: SubmitHandler<EditNoteSchemaType> = (formValues) => {
    fetcher.submit(formValues, {
      method: 'POST',
    });
  };

  useEffect(() => {
    if (prevStateRef.current !== 'idle' && fetcher.state === 'idle') {
      setOpenDialog(false);
      form.reset();
    }

    prevStateRef.current = fetcher.state;
  }, [fetcher.state, form]);
  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogTrigger asChild>
        <Button size="icon" variant="outline" aria-label="Edit">
          <Pencil className="size-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit note</DialogTitle>
          <DialogDescription>This action cannot be undone.</DialogDescription>
          <DialogDescription>Last updated: {timeAgo(note.updatedAt)}</DialogDescription>
        </DialogHeader>
        <fetcher.Form onSubmit={form.handleSubmit(_handleSubmitForm)} method="POST" className="space-y-4">
          <FieldGroup>
            <Controller
              name="title"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className="gap-2">
                  <FieldLabel htmlFor={field.name}>Title</FieldLabel>
                  <Input {...field} id={field.name} aria-invalid={fieldState.invalid} autoComplete="off" />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
            <Controller
              name="message"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className="gap-2">
                  <FieldLabel htmlFor={field.name}>Message</FieldLabel>
                  <Textarea {...field} id={field.name} aria-invalid={fieldState.invalid} rows={10} />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
            <input type="hidden" {...form.register('_action')} />
            <input type="hidden" {...form.register('id')} />
          </FieldGroup>

          <DialogFooter>
            <Field orientation="horizontal">
              <Button type="submit" disabled={isSubmitting} name="_action" value="update">
                {isSubmitting && <Spinner />}
                {isSubmitting ? 'Saving...' : 'Save'}
              </Button>
              <DialogClose asChild>
                <Button type="reset" variant="outline">
                  Cancel
                </Button>
              </DialogClose>
            </Field>
          </DialogFooter>
        </fetcher.Form>
      </DialogContent>
    </Dialog>
  );
}

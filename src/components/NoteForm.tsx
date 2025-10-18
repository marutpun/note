import { useFetcher } from 'react-router';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm, type SubmitHandler } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Spinner } from '@/components/ui/spinner';
import { noteSchema, type NoteSchemaType } from '@/schema/noteFormSchema';
import { useEffect, useRef } from 'react';

export default function NoteForm() {
  const fetcher = useFetcher();
  const isSubmitting = fetcher.state === 'submitting';
  const prevStateRef = useRef(fetcher.state);

  const form = useForm<NoteSchemaType>({
    resolver: zodResolver(noteSchema),
    defaultValues: {
      title: '',
      message: '',
      _action: 'create',
    },
  });

  const _handleSubmitForm: SubmitHandler<NoteSchemaType> = (formValues) => {
    fetcher.submit(formValues, {
      method: 'POST',
    });
  };

  useEffect(() => {
    if (prevStateRef.current !== 'idle' && fetcher.state === 'idle') {
      form.reset();
    }

    prevStateRef.current = fetcher.state;
  }, [fetcher.state, form]);

  return (
    <div className="grid mx-auto">
      <fetcher.Form onSubmit={form.handleSubmit(_handleSubmitForm)} method="POST">
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
          <Button type="submit" disabled={isSubmitting} name="_action" value="create">
            {isSubmitting && <Spinner />}
            {isSubmitting ? 'Processing' : 'Add'}
          </Button>
        </FieldGroup>
      </fetcher.Form>
    </div>
  );
}

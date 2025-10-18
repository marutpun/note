import { useLoaderData } from 'react-router';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { EditNote, DeleteNote } from '@/components/';
import type { SelectNote } from '@/db/schema';

export default function NoteList() {
  const loaderData = useLoaderData();

  if (loaderData.notes.length == 0) {
    return (
      <div className="grid w-full max-w-160 mx-auto">
        <p>No data</p>
      </div>
    );
  }

  return (
    <div className="grid  mx-auto">
      <Accordion type="single" collapsible className="w-full">
        {loaderData.notes.map((note: SelectNote) => (
          <AccordionItem value={String(note.id)} key={note.id}>
            <AccordionTrigger className="text-base font-bold">{note.title}</AccordionTrigger>
            <AccordionContent className="text-base flex justify-between items-center gap-2">
              <p className="whitespace-pre-wrap">{note.message}</p>
              <div className="flex gap-2">
                <EditNote noteId={note.id} />
                <DeleteNote noteId={note.id} />
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Trash } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useFetcher } from 'react-router';

export default function DeleteNote({ noteId }: { noteId: number }) {
  const fetcher = useFetcher();
  const [openDialog, setOpenDialog] = useState(false);
  const prevStateRef = useRef(fetcher.state);

  useEffect(() => {
    if (prevStateRef.current !== 'idle' && fetcher.state === 'idle') {
      setOpenDialog(false);
    }

    prevStateRef.current = fetcher.state;
  }, [fetcher.state]);

  return (
    <AlertDialog open={openDialog} onOpenChange={setOpenDialog}>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" size="icon">
          <Trash />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your note and remove from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <fetcher.Form method="POST">
            <input type="hidden" name="id" value={noteId} />
            <AlertDialogAction asChild>
              <Button type="submit" variant="destructive" size="sm" name="_action" value="delete">
                Delete
              </Button>
            </AlertDialogAction>
          </fetcher.Form>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

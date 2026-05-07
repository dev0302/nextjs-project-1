'use client';

import { useState } from 'react';
import { Loader2, Trash2 } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { toast } from 'sonner';

interface DeleteMessageButtonProps {
  messageId: string;
  onDelete: (messageId: string) => void; // 👈 callback from MessageGrid
}

export default function DeleteMessageButton({
  messageId,
  onDelete,
}: DeleteMessageButtonProps) {

  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    try {
      setLoading(true);

      const response = await fetch(
        `/api/delete-message?messageId=${messageId}`,
        { method: 'PATCH' }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to delete message');
      }

      toast.success("Message deleted successfully.");
      onDelete(messageId); // 👈 triggers smooth animation in MessageGrid

    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to delete message");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-red-500/10 transition cursor-pointer group">
          <Trash2 className="w-4 h-4 text-muted-foreground group-hover:text-red-500" />
        </button>
      </AlertDialogTrigger>

      <AlertDialogContent size="sm" className="fixed">
        <AlertDialogHeader>
          <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20">
            {loading ? <Loader2 className="animate-spin" /> : <Trash2 />}
          </AlertDialogMedia>
          <AlertDialogTitle>Delete message?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This message will be permanently deleted.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel variant="outline">Cancel</AlertDialogCancel>
          <AlertDialogAction
            variant="destructive"
            onClick={handleDelete}
            disabled={loading}
          >
            {loading ? 'Deleting...' : 'Delete'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
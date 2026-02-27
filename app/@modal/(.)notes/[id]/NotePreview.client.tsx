'use client';

import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation'; 
import { fetchNoteById } from '@/lib/api'; 
import css from './NotePreview.module.css';

interface NotePreviewProps {
  id: string;
}

export default function NotePreview({ id }: NotePreviewProps) {
  const router = useRouter();

  const { data: note, isLoading } = useQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false, 
  });

 
  const handleClose = () => {
    router.back(); 
  };

  if (isLoading) return <div>Loading...</div>;
  if (!note) return null;

  return (
    <div className={css.container}>
      <div className={css.header}>
        <h2>{note.title}</h2>
        <button className={css.backBtn} onClick={handleClose}>
          Close
        </button>
      </div>

      <div className={css.item}>
        <span className={css.tag}>{note.tag}</span>
        <div className={css.content}>{note.content}</div>
        <p className={css.date}>
          Created at: {new Date(note.createdAt).toLocaleDateString()}
        </p>
      </div>
    </div>
);
}
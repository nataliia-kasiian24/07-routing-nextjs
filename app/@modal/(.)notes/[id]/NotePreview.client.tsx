'use client'

import { useQuery } from '@tanstack/react-query'; 
import { fetchNoteById } from '@/lib/api';
import css from './NotePreview.module.css';

export default function NotePreview({ id }: { id: string }) {
  
  const { data: note, isLoading } = useQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
  });

  if (isLoading) return <p>Завантаження...</p>;
  if (!note) return <p>Нотатку не знайдено</p>;

  return (
    <div className={css.container}>
      <h2 className={css.title}>{note.title}</h2>
      <p className={css.text}>{note.content}</p>
      {note.tag && (
        <div className={css.tags}>
          <span className={css.tag}>#{note.tag}</span>
        </div>
      )}
    </div>
  );
}
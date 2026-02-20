import { fetchNoteById } from '@/lib/api'; 
import css from './NotePreview.module.css';

interface NotePreviewProps {
  id: string;
}

export default async function NotePreview({ id }: { id: string }) {
  
  const note = await fetchNoteById(id); 

  if (!note) return <p>Loading...</p>;

  return (
    <div className={css.container}>
      <h2 className={css.title}>{note.title}</h2>
      <p className={css.text}>{note.text}</p>
      
      {note.tags && (
        <div className={css.tags}>
          {note.tags.map((tag: string) => (
            <span key={tag} className={css.tag}>#{tag}</span>
          ))}
        </div>
      )}
    </div>
  );
}
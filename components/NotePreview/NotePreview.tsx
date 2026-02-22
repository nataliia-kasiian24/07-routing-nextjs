import { fetchNoteById } from '@/lib/api';
import css from './NotePreview.module.css';
import {Modal} from '@/components/Modal/Modal';

export default async function NotePreview({ id }: { id: string }) {
const note = await fetchNoteById(id);

if (!note) return null;

return (
<Modal>
<div className={css.container}>
<h2 className={css.title}>{note.title}</h2>
<p className={css.text}>{note.content}</p>
{note.tag && (
<div className={css.tags}>
<span className={css.tag}>#{note.tag}</span>
</div>
)}
</div>
</Modal>
);
}
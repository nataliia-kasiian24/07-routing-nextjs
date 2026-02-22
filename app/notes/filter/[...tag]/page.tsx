import { fetchNotes } from '@/lib/api';
import { NoteList } from '@/components/NoteList/NoteList';
import { NoteTag } from '@/types/note';

export default async function FilteredNotesPage({ params }: { params: Promise<{ tag?: string[] }> }) {
const { tag } = await params;

const currentTag = tag && tag[0] !== 'all' ? (tag[0] as NoteTag) : undefined;

const notesResponse = await fetchNotes({ tag: currentTag });

const notes = notesResponse.notes;

return (
<section>
<NoteList notes={notes} />
</section>
);
}
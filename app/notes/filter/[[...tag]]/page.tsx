import { fetchNoteById } from '@/lib/api'; 
import { NoteList } from '@/components/NoteList/NoteList';

export default async function FilteredNotesPage({
  params,
}: {
  params: Promise<{ tag?: string[] }>;
}) {
  const { tag } = await params;

  
  const currentTag = tag && tag[0] !== 'all' ? tag[0] : undefined;

  const notesResponse = await fetchNoteById(currentTag ? { tag: currentTag } : {});
const notes = notesResponse.notes;

  return (
    <section>
      <NoteList notes={notes} />
    </section>
  );
}
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";
import NotesClient from "./Notes.client";
import { NoteTag } from "@/types/note";

export default async function FilteredNotesPage({ params }: { params: Promise<{ tag?: string[] }> }) {
  
  const { tag: tagArray } = await params;

  
  const rawTag = tagArray && tagArray[0] !== "all" ? tagArray[0] : undefined;
  const currentTag = rawTag ? (rawTag.toLowerCase() as NoteTag) : undefined;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["notes", currentTag, 1, ""],
    queryFn: () => fetchNotes({ page: 1, tag: currentTag, search: "" }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <section>
        <NotesClient activeTag={currentTag} />
      </section>
    </HydrationBoundary>
  );
}
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";
import NotesClient from "./Notes.client";
import { NoteTag } from "@/types/note";

interface PageProps {
  params: {
    tag?: string[];
  };
}

export default async function FilteredNotesPage({ params }: PageProps) {
  const tagArray = params.tag;

  const currentTag =
    tagArray && tagArray[0] !== "all"
      ? (tagArray[0] as NoteTag)
      : undefined;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["notes", currentTag],
    queryFn: () => fetchNotes({ tag: currentTag }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <section>
        <NotesClient activeTag={currentTag} />
      </section>
    </HydrationBoundary>
  );
}

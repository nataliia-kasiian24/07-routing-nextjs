import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";
import NotesClient from "./Notes.client";
import { NoteTag } from "@/types/note";

interface PageProps {
  params: Promise<{ slug?: string[] }>;
}

export default async function FilteredNotesPage({ params }: PageProps) {
 
  const { slug: tagArray } = await params;

  const rawTag = tagArray && tagArray[0] !== "all" ? tagArray[0] : undefined;
  const currentTag = rawTag 
  ? (rawTag.charAt(0).toUpperCase() + rawTag.slice(1).toLowerCase() as NoteTag) 
    : undefined;
  
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
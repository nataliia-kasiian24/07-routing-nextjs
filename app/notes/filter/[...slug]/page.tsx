import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { notFound } from "next/navigation";
import { fetchNotes } from "@/lib/api";
import NotesClient from "./Notes.client";
import { NoteTag } from "@/types/note";

interface PageProps {
  params: Promise<{  slug: string[] }>;
}

export default async function FilteredNotesPage({ params }: PageProps) {
  const { slug } = await params;

  const rawTag = Array.isArray(slug) ? slug[0] : slug;

  const allowedTags: string[] = ["Work", "Personal", "Meeting", "Shopping", "Todo"];

  let currentTag: NoteTag | undefined = undefined;

  if (rawTag && rawTag !== "all") {
    
    const formattedTag = rawTag.charAt(0).toUpperCase() + rawTag.slice(1).toLowerCase();

    if (!allowedTags.includes(formattedTag)) {
      return notFound(); 
    }

    currentTag = formattedTag as NoteTag;
  }

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
'use client';

import { useState } from "react";
import {useQuery, keepPreviousData} from "@tanstack/react-query";
import { useDebouncedCallback } from "use-debounce";
import { fetchNotes } from "@/lib/api";

import { NoteList } from "@/components/NoteList/NoteList";
import { Modal } from "@/components/Modal/Modal";
import { NoteForm } from "@/components/NoteForm/NoteForm";
import { Pagination } from "@/components/Pagination/Pagination";
import { SearchBox } from "@/components/SearchBox/SearchBox";

import css from "./NotesPage.module.css";

export default function App() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data, isLoading, isError } = useQuery({
  queryKey: ["notes", page, search],
  queryFn: () => fetchNotes({ page, perPage: 12, search }),
  placeholderData: keepPreviousData, 
});


  const handleSearch = useDebouncedCallback((value: string) => {
    setSearch(value);
    setPage(1); 
  }, 500);

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        {}
        <SearchBox onChange={handleSearch} />
        
        {data && data.totalPages > 1 && (
          <Pagination 
            totalPages={data.totalPages} 
            currentPage={page} 
            onPageChange={(newPage) => setPage(newPage)} 
          />
        )}

        <button className={css.button} onClick={() => setIsModalOpen(true)}>
          Create note +
        </button>
      </header>

      <main>
        {isLoading && <p>Завантаження нотаток...</p>}
        {isError && <p>Сталася помилка при завантаженні. Спробуйте пізніше.</p>}

        {data && data.notes.length > 0 ? (
          <NoteList 
            notes={data.notes} 
          />
        ) : (
          !isLoading && <p>Нотаток не знайдено</p>
        )}
      </main>

      {isModalOpen && (
  <Modal onClose={() => setIsModalOpen(false)}>
    <NoteForm onCancel={() => setIsModalOpen(false)} />
  </Modal>
)}
    </div>
  );
}
import axios from "axios";
import type { Note, NoteTag } from "../types/note";

const instance = axios.create({
  baseURL: "https://notehub-public.goit.study/api",
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
  },
});


interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

interface FetchNotesParams {
  page?: number;
  perPage?: number;
  search?: string;
  tag?: NoteTag;
  sortBy?: "created" | "updated";
}

export const fetchNoteById = async (id: string): Promise<Note> => {
  const { data } = await instance.get<Note>(`/notes/${id}`);
  return data;
};

export const fetchNotes = async (params: FetchNotesParams): Promise<FetchNotesResponse> => {
  const { data } = await instance.get<FetchNotesResponse>("/notes", {
    params, 
  });
  return data;
};

export const createNote = async (
  note: Pick<Note, "title" | "content" | "tag">
): Promise<Note> => {
  const { data } = await instance.post<Note>("/notes", note);
  return data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const { data } = await instance.delete<Note>(`/notes/${id}`);
  return data;
};
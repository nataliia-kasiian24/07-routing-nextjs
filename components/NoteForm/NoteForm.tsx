'use client';


import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNote } from "@/lib/api";
import type { Note, NoteTag } from "@/types/note";
import css from "./NoteForm.module.css";

interface NoteFormProps {
  onCancel: () => void;
}

type NoteFormValues = Omit<Note, "id" | "createdAt" | "updatedAt">;

const NoteSchema = Yup.object().shape({
  title: Yup.string()
    .min(3, "Too short!")
    .max(50, "Too long!")
    .required("Required field"),
  content: Yup.string().max(500, "Maximum 500 characters"),
  tag: Yup.string()
    .oneOf(["Todo", "Work", "Personal", "Meeting", "Shopping"])
    .required("Choose a tag"),
});

export const NoteForm = ({ onCancel }: NoteFormProps) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (newNote: NoteFormValues) => createNote(newNote),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      onCancel(); 
    },
    onError: (error) => {
      console.error("Помилка при створенні нотатки:", error);
      alert("Не вдалося створити нотатку. Спробуйте ще раз.");
    },
  });

  const initialValues: NoteFormValues = {
    title: "",
    content: "",
    tag: "Todo" as NoteTag,
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={NoteSchema}
      onSubmit={(values) => mutation.mutate(values)}
    >
      {({ isSubmitting }) => (
        <Form className={css.form}>
          <div className={css.formGroup}>
            <label htmlFor="title">Title</label>
            <Field id="title" name="title" className={css.input} />
            <ErrorMessage name="title" component="span" className={css.error} />
          </div>

          <div className={css.formGroup}>
            <label htmlFor="content">Content</label>
            <Field as="textarea" id="content" name="content" rows={8} className={css.textarea} />
            <ErrorMessage name="content" component="span" className={css.error} />
          </div>

          <div className={css.formGroup}>
            <label htmlFor="tag">Tag</label>
            <Field as="select" id="tag" name="tag" className={css.select}>
              <option value="Todo">Todo</option>
              <option value="Work">Work</option>
              <option value="Personal">Personal</option>
              <option value="Meeting">Meeting</option>
              <option value="Shopping">Shopping</option>
            </Field>
            <ErrorMessage name="tag" component="span" className={css.error} />
          </div>

          <div className={css.actions}>
            <button type="button" onClick={onCancel} className={css.cancelButton}>
              Cancel
            </button>
            <button 
              type="submit" 
              disabled={isSubmitting || mutation.isPending} 
              className={css.submitButton}
            >
              {mutation.isPending ? "Creating..." : "Create note"}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};
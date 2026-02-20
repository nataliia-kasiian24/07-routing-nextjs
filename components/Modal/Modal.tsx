'use client';

import { useEffect, useSyncExternalStore, type ReactNode } from "react";
import { createPortal } from "react-dom";
import css from "./Modal.module.css";

interface ModalProps {
  children: ReactNode;
  onClose: () => void;
}

const subscribe = () => () => {};
const getSnapshot = () => true;
const getServerSnapshot = () => false;

export const Modal = ({ children, onClose }: ModalProps) => {
  const isMounted = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  useEffect(() => {
    if (!isMounted) return;

    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalStyle;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isMounted, onClose]);

  if (!isMounted) return null;

  const modalRoot = document.getElementById('modal-root');
  if (!modalRoot) return null;

  return createPortal(
    <div className={css.backdrop} onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className={css.modal}>
        {children}
      </div>
    </div>,
    modalRoot
  );
};
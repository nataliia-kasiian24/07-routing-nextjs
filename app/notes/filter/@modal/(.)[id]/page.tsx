'use client'; 

import { useRouter } from 'next/navigation';
import { Modal } from '@/components/Modal/Modal';
import NotePreview from '@/components/NotePreview/NotePreview';
import { use } from 'react';

export default function NoteInterceptPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params); 
  const router = useRouter();

  
  const handleClose = () => {
    router.back(); 
  };

  return (
    <Modal onClose={handleClose}>
      <NotePreview id={id} />
    </Modal>
  );
}
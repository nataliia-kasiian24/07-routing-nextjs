import { Modal } from '@/components/Modal/Modal';
import NotePreview from './NotePreview';

export default async function NoteInterceptPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <Modal>
      <NotePreview id={id} />
    </Modal>
  );
}
import { useRecoilState } from 'recoil';
import { toastAtom, ToastItem } from '@/recoil/toast';
import { v4 as uuidv4 } from 'uuid';

export default function useToast() {
  const [toasts, setToasts] = useRecoilState(toastAtom);

  const addToast = ({ message, type }: { message: string; type: ToastItem['type'] }) => {
    if (toasts.length >= 3) {
      return;
    }

    setToasts((prev) => [...prev, { id: uuidv4(), message, type }]);
  };

  return { addToast };
}

import { atom, selectorFamily } from 'recoil';
import { v4 as uuidv4 } from 'uuid';

export interface ToastAtom {
  isVisible: boolean;
  message: string;
  type: 'info' | 'success' | 'error' | 'warning';
}

export interface ToastItem {
  id: string;
  message: string;
  type: 'info' | 'success' | 'error' | 'warning';
}

export const toastAtom = atom<ToastItem[]>({
  key: 'toastAtom',
  default: [],
});

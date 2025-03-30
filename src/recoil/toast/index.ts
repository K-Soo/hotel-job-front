import { atom } from 'recoil';

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

import { atom } from 'recoil';

interface DaumPostAtom {
  isOpen: boolean;
}

export const daumPostAtom = atom<DaumPostAtom>({
  key: 'daumPostAtom',
  default: {
    isOpen: false,
  },
});

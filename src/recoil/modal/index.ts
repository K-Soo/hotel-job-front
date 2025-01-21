import { atom } from 'recoil';

interface ModalAtom {
  isOpen: boolean;
}

export const modalAtom = atom<ModalAtom>({
  key: 'modalAtom',
  default: {
    isOpen: false,
  },
});

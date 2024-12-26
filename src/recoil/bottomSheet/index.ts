import { atom } from 'recoil';

interface BottomSheetAtom {
  isOpen: boolean;
}

export const bottomSheetAtom = atom<BottomSheetAtom>({
  key: 'bottomSheetAtom',
  default: {
    isOpen: false,
  },
});

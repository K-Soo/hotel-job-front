import { atom } from 'recoil';

interface HamburgerNavigationAtom {
  isOpen: boolean;
}

export const hamburgerNavigationAtom = atom<HamburgerNavigationAtom>({
  key: 'hamburgerNavigationAtom',
  default: {
    isOpen: false,
  },
});

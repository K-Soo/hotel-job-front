import { atom } from 'recoil';

export interface CertificationModalAtom {
  isOpen: boolean;
}

export const certificationModalAtom = atom<CertificationModalAtom>({
  key: 'certificationModalAtom',
  default: {
    isOpen: false,
  },
});

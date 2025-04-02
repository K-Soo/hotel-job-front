import { atom } from 'recoil';

export interface LoadingAtom {
  isLoading: boolean;
  message?: string;
}

export const loadingAtom = atom<LoadingAtom>({
  key: 'loadingAtom',
  default: {
    isLoading: false,
    message: '',
  },
});

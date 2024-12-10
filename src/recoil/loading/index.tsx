import { atom } from "recoil";

export interface LoadingAtom {
  isLoading: boolean;
}

export const loadingAtom = atom<LoadingAtom>({
  key: "loadingAtom",
  default: {
    isLoading: false,
  },
});

import { atom, selector } from "recoil";

export interface AuthAtom {
  provider: string | null;
  nickname: string | null;
  isLoading: boolean;
}

export const authAtom = atom<AuthAtom>({
  key: "authAtom",
  default: {
    provider: null,
    nickname: null,
    isLoading: true,
  },
});

export const authSelector = selector({
  key: "authSelector",
  get: ({ get }) => {
    const authState = get(authAtom);

    const isLogin = !!authState.provider;
    const isLoading = authState.isLoading;

    return { isLogin, isLoading };
  },
});

import { atom, selector } from "recoil";

export interface AuthAtom {
  provider: string | null;
  nickname: string | null;
}

export const authAtom = atom<AuthAtom>({
  key: "authAtom",
  default: {
    provider: null,
    nickname: null,
  },
});

export const authSelector = selector({
  key: "authSelector",
  get: ({ get }) => {
    const authState = get(authAtom);

    const isLogin = !!authState.provider;

    return { isLogin };
  },
});

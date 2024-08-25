import { atom, selector } from "recoil";

export interface AuthAtom {
  provider: string | null;
  nickname: string | null;
  status: "AUTHENTICATED" | "UNAUTHENTICATED" | "IDLE";
}

export const authAtom = atom<AuthAtom>({
  key: "authAtom",
  default: {
    provider: null,
    nickname: null,
    status: "IDLE",
  },
});

export const authSelector = selector({
  key: "authSelector",
  get: ({ get }) => {
    const authState = get(authAtom);

    const isLogin = authState.status === "AUTHENTICATED";
    const status = authState.status;

    return { isLogin, status };
  },
});

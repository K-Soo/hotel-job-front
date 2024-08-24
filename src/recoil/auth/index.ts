import { atom } from "recoil";

export interface AuthAtom {
  accessToken: string | null;
  provider: string | null;
  nickname: string | null;
}

export const authAtom = atom<AuthAtom>({
  key: "authAtom",
  default: {
    accessToken: null,
    provider: null,
    nickname: null,
  },
});

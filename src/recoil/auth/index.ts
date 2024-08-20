import { atom } from "recoil";

export interface AuthAtom {
  accessToken: string | null;
  email: string | null;
  provider: string | null;
}

export const authAtom = atom<AuthAtom>({
  key: "authAtom",
  default: {
    accessToken: null,
    email: null,
    provider: null,
  },
});

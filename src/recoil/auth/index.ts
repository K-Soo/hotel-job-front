import { atom, selector } from "recoil";
import { ProviderType, RoleType } from "@/types";
export interface AuthAtom {
  provider?: ProviderType;
  role?: RoleType;
  status: "AUTHENTICATED" | "UNAUTHENTICATED" | "IDLE";
}

export const authAtom = atom<AuthAtom>({
  key: "authAtom",
  default: {
    role: undefined,
    provider: undefined,
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

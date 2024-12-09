import React from "react";
import { Internal, Post } from "@/apis";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { authAtom, authSelector } from "@/recoil/auth";
import { useRouter } from "next/router";
import { EXCLUDED_PATHS } from "@/constants/path";

export default function AuthenticationComponent() {
  const authSelectorValue = useRecoilValue(authSelector);
  const setAuthAtom = useSetRecoilState(authAtom);
  const router = useRouter();

  React.useEffect(() => {
    if (EXCLUDED_PATHS.includes(router.pathname)) {
      return;
    }
    if (authSelectorValue.isLogin) {
      return;
    }
    (async () => {
      try {
        const cookieExist = await Internal.checkRefreshCookie();
        if (!cookieExist) return;

        const response = await Post.getUserInfo({});
        console.log("GLOBAL 유저정보 API : ", response);
        if (!response.success) {
          throw new Error();
        }
        setAuthAtom({
          provider: response.result.provider,
          role: response.result.role,
          status: "AUTHENTICATED",
        });
      } catch (error) {
        console.log("auth error: ", error);
      }
    })();
  }, [authSelectorValue.isLogin, router.pathname]);

  return null;
}

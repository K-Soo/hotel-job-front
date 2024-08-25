import React from "react";
import { Internal, Post } from "@/apis";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { authAtom, authSelector } from "@/recoil/auth";

export default function AuthenticationComponent() {
  const authSelectorValue = useRecoilValue(authSelector);
  const setAuthAtom = useSetRecoilState(authAtom);

  React.useEffect(() => {
    if (authSelectorValue.isLogin) {
      return;
    }
    (async () => {
      try {
        const cookieExist = await Internal.checkRefreshCookie();
        if (!cookieExist) return;

        const response = await Post.getUserInfo({});
        console.log("유저정보 API : ", response);
        if (response.status !== 200) {
          throw new Error();
        }
        setAuthAtom({
          nickname: response.result.nickname,
          provider: response.result.provider,
          isLoading: false,
        });
      } catch (error) {
        console.log("auth error: ", error);
      }
    })();
  }, [authSelectorValue.isLogin, setAuthAtom]);

  return null;
}

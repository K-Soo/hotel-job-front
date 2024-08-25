import React from "react";
import { useRouter } from "next/router";
import { OAuth, Get, Post, instance } from "@/apis";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { authAtom, authSelector } from "@/recoil/auth";
import path from "@/constants/path";
import useAppRouter from "@/hooks/useAppRouter";

// TODO - 로딩 처리
export default function CallbackPage() {
  const router = useRouter();
  const setAuthAtom = useSetRecoilState(authAtom);
  const { replace } = useAppRouter();

  React.useEffect(() => {
    if (router.isReady) {
      const { access_token } = router.query;

      if (!access_token) {
        return;
      }

      instance.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;
      (async () => {
        try {
          const response = await Post.getUserInfo({});
          console.log("카카오 유저정보 API : ", response);
          if (response.status !== 200) {
            throw new Error();
          }
          setAuthAtom({
            nickname: response.result.nickname,
            provider: response.result.provider,
            isLoading: false,
          });
          replace(path.HOME);
        } catch (error) {
          alert("로그인 실패");
          window.location.href = "/";
        }
      })();
      console.log("access_token: ", access_token);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.isReady]);

  return <div></div>;
}

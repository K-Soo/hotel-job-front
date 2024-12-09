import React from "react";
import { useRouter } from "next/router";
import { OAuth, Get, Post, instance } from "@/apis";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { authAtom, authSelector } from "@/recoil/auth";
import path from "@/constants/path";
import useAppRouter from "@/hooks/useAppRouter";
import axios from "axios";
import Consent from "@/components/common/Consent";

// TODO - 로딩 처리
export default function CallbackPage() {
  const [isInitialRequest, setIsInitialRequest] = React.useState(true);
  const [isNewUser, setIsNewUser] = React.useState(false);

  const [signInForm, setSignInForm] = React.useState({
    allAgree: false,
    personalInfoAgree: false,
    serviceTermsAgree: false,
    marketingAgree: false,
  });

  const router = useRouter();
  const setAuthAtom = useSetRecoilState(authAtom);
  const { replace } = useAppRouter();

  React.useEffect(() => {
    if (router.isReady) {
      if (!router.query.code) {
        alert("로그인 실패");
      }

      (async () => {
        try {
          const response = await OAuth.kakaoSignIn({ code: router.query.code as string, isInitialRequest });
          console.log("카카오 로그인 API : ", response);
          if (!response.success) {
            throw new Error();
          }
          setAuthAtom({
            provider: response.result.provider,
            role: response.result.role,
            status: "AUTHENTICATED",
          });
          replace(path.HOME);
        } catch (error) {
          if (axios.isAxiosError(error)) {
            const isNotFoundUserError = error.response?.data.error.code === "ERR-2002";
            if (isNotFoundUserError) {
              return setIsNewUser(true);
            }
          }
          alert("로그인 실패");
          // window.location.href = "/";
        }
      })();
    }
  }, [router.isReady]);

  if (isNewUser) {
    return <Consent />;
  }

  return <div></div>;
}

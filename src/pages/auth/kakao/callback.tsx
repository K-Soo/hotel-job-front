import React from "react";
import { useRouter } from "next/router";
import { OAuth, Get, Post, instance } from "@/apis";

export default function CallbackPage() {
  const router = useRouter();

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
          console.log("유저정보 API : ", response);
        } catch (error) {
          alert("로그인 실패");
          window.location.href = "/";
        }
      })();
      console.log("access_token: ", access_token);
    }
  }, [router.isReady, router.query]);

  return <div></div>;
}

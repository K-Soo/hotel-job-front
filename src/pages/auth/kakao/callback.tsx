import React from "react";
import { useRouter } from "next/router";
import { OAuth } from "@/apis";

export default function CallbackPage() {
  const router = useRouter();

  React.useEffect(() => {
    if (router.isReady) {
      const { code } = router.query;

      (async () => {
        try {
          const response = await OAuth.kakaoSignIn({ code: code as string });
          console.log("response: ", response);
        } catch (error) {
          console.log("error: ", error);
        }
      })();
    }
  }, [router.isReady, router.query]);

  return <div></div>;
}

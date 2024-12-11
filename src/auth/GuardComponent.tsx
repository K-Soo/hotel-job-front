import React from "react";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { authAtom, authSelector } from "@/recoil/auth";
import { useRouter } from "next/router";
import path from "@/constants/path";
import { Internal } from "@/apis";
import useAuth from "@/hooks/useAuth";
interface GuardComponentProps {
  children: React.ReactNode;
}

export default function GuardComponent({ children }: GuardComponentProps) {
  const [showLoading, setShowLoading] = React.useState(false);
  const authSelectorValue = useRecoilValue(authSelector);
  const router = useRouter();
  const { isAuthFailure, isAuthIdle, isAuthenticated } = useAuth();

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoading(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  React.useEffect(() => {
    if (isAuthenticated) {
      return;
    }
    (async () => {
      try {
        const cookieExist = await Internal.checkRefreshCookie();
        if (!cookieExist) {
          router.replace(path.HOME);
        }
      } catch (error) {
        console.log("auth error: ", error);
      }
    })();
  }, [authSelectorValue.status, router]);

  React.useEffect(() => {
    if (isAuthFailure) {
      router.replace(path.SIGN_IN);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authSelectorValue.status]);

  if (isAuthIdle && showLoading) {
    return <div>Loading...</div>;
  }

  if (isAuthenticated) {
    return <React.Fragment>{children}</React.Fragment>;
  }
}

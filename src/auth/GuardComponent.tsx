import React from "react";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { authAtom, authSelector } from "@/recoil/auth";
import { useRouter } from "next/router";
import path from "@/constants/path";
interface GuardComponentProps {
  children: React.ReactNode;
}

export default function GuardComponent({ children }: GuardComponentProps) {
  const [showLoading, setShowLoading] = React.useState(false);
  const authSelectorValue = useRecoilValue(authSelector);
  const router = useRouter();

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoading(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  React.useEffect(() => {
    if (!authSelectorValue.isLogin && !authSelectorValue.isLoading) {
      router.replace(path.SIGN_IN);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authSelectorValue.isLoading, authSelectorValue.isLogin]);

  if (authSelectorValue.isLoading && showLoading) {
    return <div>Loading...</div>;
  }

  if (authSelectorValue.isLogin) {
    return <React.Fragment>{children}</React.Fragment>;
  }
}

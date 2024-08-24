// import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Theme from "@/styles/Theme";
import Layout from "@/components/layout";
import { AppPropsWithLayout } from "@/types/app";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { RecoilRoot } from "recoil";
import { Get, Post } from "@/apis";
import React from "react";
import { Internal } from "@/apis";
const commonLayout = (page: React.ReactElement) => <Layout>{page}</Layout>;

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? commonLayout;

  React.useEffect(() => {
    (async () => {
      try {
        const cookie = await Internal.checkRefreshCookie();
        if (cookie) {
          const response = await Post.getUserInfo({});
          console.log("유저정보 API : ", response);
        }
      } catch (error) {
        console.log("error: ", error);
      }
    })();
  }, []);

  return (
    <Theme>
      <RecoilRoot>
        <QueryClientProvider client={queryClient}>
          {!Component.authentication && getLayout(<Component {...pageProps} />)}
          {Component.authentication && getLayout(<Component {...pageProps} />)}
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </RecoilRoot>
    </Theme>
  );
}

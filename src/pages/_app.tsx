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
import { setUserState } from "@/rxjs/state";
import { BehaviorSubject, Subject } from "rxjs";
import { userData$ } from "@/apis";

const commonLayout = (page: React.ReactElement) => <Layout>{page}</Layout>;

const queryClient = new QueryClient();

const subject = new Subject<number>();

subject.subscribe((value) => console.log(`Subscriber A: ${value}`));

subject.next(1); // Subscriber A는 1을 수신
subject.next(2); // Subscriber A는 2를 수신

subject.subscribe((value) => console.log(`Subscriber B: ${value}`)); // 구독 후 바로 값 수신하지 않음

subject.next(3); // Subscriber A와 B는 둘 다 3을 수신

const user$ = new BehaviorSubject<any>(null);

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? commonLayout;

  React.useEffect(() => {
    (async () => {
      try {
        const cookie = await Internal.checkRefreshCookie();
        if (cookie) {
          const response = await Post.getUserInfo({});
          console.log("유저정보 API : ", response);

          // setUserState(response.result);
        }
      } catch (error) {
        console.log("error: ", error);
      }
    })();
  }, []);

  React.useEffect(() => {
    const test = user$.subscribe((newValue) => {
      console.log("newValue: ", newValue);
    });
  }, []);

  const handle = () => {
    (async () => {
      try {
        const cookie = await Internal.checkRefreshCookie();
        if (cookie) {
          const response = await Post.getUserInfo({});
          console.log("유저정보 API : ", response);
          user$.next(response.result);
        }
      } catch (error) {
        console.log("error: ", error);
      }
    })();
  };

  return (
    <Theme>
      <RecoilRoot>
        <button onClick={() => handle()}>정보</button>
        <QueryClientProvider client={queryClient}>
          {!Component.authentication && getLayout(<Component {...pageProps} />)}
          {Component.authentication && getLayout(<Component {...pageProps} />)}
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </RecoilRoot>
    </Theme>
  );
}

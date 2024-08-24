// import "@/styles/globals.css";
import Theme from "@/styles/Theme";
import Layout from "@/components/layout";
import { AppPropsWithLayout } from "@/types/app";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { RecoilRoot } from "recoil";
import React from "react";
import { setUserState } from "@/rxjs/state";
import { BehaviorSubject, Subject } from "rxjs";
import { userData$ } from "@/apis";
import GuardComponent from "@/auth/GuardComponent";
import AuthenticationComponent from "@/auth/AuthenticationComponent";

const commonLayout = (page: React.ReactElement) => <Layout>{page}</Layout>;

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? commonLayout;

  return (
    <Theme>
      <RecoilRoot>
        <AuthenticationComponent />
        <QueryClientProvider client={queryClient}>
          {!Component.authentication && getLayout(<Component {...pageProps} />)}
          {Component.authentication &&
            getLayout(
              <GuardComponent>
                <Component {...pageProps} />
              </GuardComponent>
            )}
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </RecoilRoot>
    </Theme>
  );
}

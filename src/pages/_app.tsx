import AppThemeProvider from '@/styles/AppThemeProvider';
import Layout from '@/components/layout';
import { AppPropsWithLayout } from '@/types/app';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { RecoilRoot } from 'recoil';
import React from 'react';
import GuardComponent from '@/auth/GuardComponent';
import EmployerGuardComponent from '@/auth/EmployerGuardComponent';
import AuthenticationComponent from '@/auth/AuthenticationComponent';
import environment from '@/environment';
// import Maintenance from '@/components/common/Maintenance';
import { SpeedInsights } from '@vercel/speed-insights/next';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import '@/recoil';

const DynamicNoSSRAppComponent = dynamic(() => import('@/auth/AppComponent'), { ssr: false });

const commonLayout = (page: React.ReactElement) => <Layout>{page}</Layout>;

const queryClientDefaultOption = {
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
      gcTime: 60 * 1000 * 5,
      throwOnError: false,
      retry: 0,
      suspense: false,
    },
  },
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? commonLayout;

  const [queryClient] = React.useState(() => new QueryClient(queryClientDefaultOption));

  return (
    <>
      <Head>
        <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport" />
        <meta name="format-detection" content="telephone=no" />
      </Head>
      <SpeedInsights />
      <AppThemeProvider>
        <RecoilRoot>
          <QueryClientProvider client={queryClient}>
            <AuthenticationComponent />
            <DynamicNoSSRAppComponent />
            {!Component.authentication && getLayout(<Component {...pageProps} />)}

            {Component.authentication &&
              getLayout(
                <GuardComponent allowedRoles={Component.allowedRoles}>
                  <Component {...pageProps} />
                </GuardComponent>,
              )}
            {/* <ReactQueryDevtools initialIsOpen={false} /> */}
          </QueryClientProvider>
        </RecoilRoot>
      </AppThemeProvider>
    </>
  );
}

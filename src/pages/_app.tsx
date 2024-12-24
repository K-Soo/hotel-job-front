import AppThemeProvider from '@/styles/AppThemeProvider';
import Layout from '@/components/layout';
import { AppPropsWithLayout } from '@/types/app';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { RecoilRoot } from 'recoil';
import React from 'react';
import GuardComponent from '@/auth/GuardComponent';
import AuthenticationComponent from '@/auth/AuthenticationComponent';

const commonLayout = (page: React.ReactElement) => <Layout>{page}</Layout>;

const queryClientDefaultOption = {
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
      gcTime: 60 * 1000 * 5,
      throwOnError: false,
      retry: 0,
    },
  },
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? commonLayout;

  const [queryClient] = React.useState(() => new QueryClient(queryClientDefaultOption));

  return (
    <AppThemeProvider>
      <RecoilRoot>
        <AuthenticationComponent />
        <QueryClientProvider client={queryClient}>
          {!Component.authentication && getLayout(<Component {...pageProps} />)}
          {Component.authentication &&
            getLayout(
              <GuardComponent>
                <Component {...pageProps} />
              </GuardComponent>,
            )}
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </RecoilRoot>
    </AppThemeProvider>
  );
}

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
import Maintenance from '@/components/common/Maintenance';
import { Footer } from '@/components/layout';
import { useRouter } from 'next/router';
import path from '@/constants/path';

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
  const router = useRouter();

  const [queryClient] = React.useState(() => new QueryClient(queryClientDefaultOption));

  return (
    <AppThemeProvider>
      <RecoilRoot>
        <QueryClientProvider client={queryClient}>
          <AuthenticationComponent />
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
  );
}

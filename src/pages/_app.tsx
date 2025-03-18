import AppThemeProvider from '@/styles/AppThemeProvider';
import Layout from '@/components/layout';
import { AppPropsWithLayout } from '@/types/app';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { RecoilRoot } from 'recoil';
import React from 'react';
import GuardComponent from '@/auth/GuardComponent';
import AuthenticationComponent from '@/auth/AuthenticationComponent';
import NotificationProvider from '@/context/NotificationProvider';
import { SpeedInsights } from '@vercel/speed-insights/next';
import dynamic from 'next/dynamic';
import DEFAULT_SEO from '@/next-seo.config';
import useNotification from '@/hooks/useNotification';
import { DefaultSeo } from 'next-seo';
import { queryClientDefaultOption } from '@/constants/queryClientDefaultOption';
import AppComponent from '@/auth/AppComponent';
import '@/recoil';

const DynamicNoSSRAppComponent = dynamic(() => import('@/auth/AppComponent'), { ssr: false });

const commonLayout = (pageComponent: React.ReactElement) => <Layout>{pageComponent}</Layout>;

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? commonLayout;
  const [queryClient] = React.useState(() => new QueryClient(queryClientDefaultOption));

  return (
    <>
      <DefaultSeo {...DEFAULT_SEO} />
      <SpeedInsights />
      <AppThemeProvider>
        <RecoilRoot>
          <QueryClientProvider client={queryClient}>
            <AuthenticationComponent />
            <DynamicNoSSRAppComponent />
            <NotificationProvider>
              {!Component.authentication && getLayout(<Component {...pageProps} />)}

              {Component.authentication &&
                getLayout(
                  <GuardComponent allowedRoles={Component.allowedRoles}>
                    <Component {...pageProps} />
                  </GuardComponent>,
                )}
            </NotificationProvider>
            <ReactQueryDevtools initialIsOpen={false} />
          </QueryClientProvider>
        </RecoilRoot>
      </AppThemeProvider>
    </>
  );
}

// function NotificationInitializer() {
//   useNotification();
//   return null;
// }

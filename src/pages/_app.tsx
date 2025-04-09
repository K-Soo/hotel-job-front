import React from 'react';
import AppThemeProvider from '@/styles/AppThemeProvider';
import Layout from '@/components/layout';
import { AppPropsWithLayout } from '@/types/app';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { RecoilRoot } from 'recoil';
import GuardComponent from '@/auth/GuardComponent';
import AuthenticationComponent from '@/auth/AuthenticationComponent';
import NotificationProvider from '@/context/NotificationProvider';
import { SpeedInsights } from '@vercel/speed-insights/next';
import dynamic from 'next/dynamic';
import DEFAULT_SEO from '@/next-seo.config';
import { DefaultSeo } from 'next-seo';
import { queryClientDefaultOption } from '@/constants/queryClientDefaultOption';
import GoogleTagManager from '@/lib/GoogleTagManager';
import NaverAnalytics from '@/lib/NaverAnalytics';
import useApp from '@/hooks/useApp';
import '@/styles/globals.css';
import '@/recoil';

const DynamicNoSSRAppComponent = dynamic(() => import('@/auth/AppComponent'), { ssr: false });

const commonLayout = (pageComponent: React.ReactElement) => <Layout>{pageComponent}</Layout>;

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? commonLayout;
  const [queryClient] = React.useState(() => new QueryClient(queryClientDefaultOption));

  useApp();

  React.useEffect(() => {
    const channel = new BroadcastChannel('auth');

    channel.onmessage = (event) => {
      if (event.data?.type === 'logout') {
        window.location.href = '/';
      }
    };

    return () => channel.close();
  }, []);

  return (
    <>
      <GoogleTagManager />
      <NaverAnalytics />
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

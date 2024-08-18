// import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Theme from "@/styles/Theme";
import Layout from "@/components/layout";
import { AppPropsWithLayout } from "@/types/app";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const commonLayout = (page: React.ReactElement) => <Layout>{page}</Layout>;

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? commonLayout;

  return (
    <Theme>
      <QueryClientProvider client={queryClient}>
        {!Component.authentication && getLayout(<Component {...pageProps} />)}
        {Component.authentication && getLayout(<Component {...pageProps} />)}

        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </Theme>
  );
}

import { AppProps } from "next/app";
import { NextPage } from "next";
import { DehydratedState } from "@tanstack/react-query";

type NextPageWithLayout = NextPage & {
  authentication?: boolean;
  getLayout?: (page: React.ReactElement) => React.ReactNode;
};

export interface AppPropsWithLayout extends AppProps {
  Component: NextPageWithLayout;
  dehydratedState?: DehydratedState;
}

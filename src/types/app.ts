import { AppProps } from 'next/app';
import { NextPage } from 'next';
import { DehydratedState } from '@tanstack/react-query';
import { RoleType } from '@/types';

type NextPageWithLayout = NextPage & {
  authentication?: boolean;
  allowedRoles?: RoleType[];
  getLayout?: (page: React.ReactElement) => React.ReactNode;
};

export interface AppPropsWithLayout extends AppProps {
  Component: NextPageWithLayout;
  dehydratedState?: DehydratedState;
}

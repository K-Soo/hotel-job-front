import React from 'react';
import User from '@/components/user';
import UserAsideMenu from '@/components/common/user/UserAsideMenu';
import { useRouter } from 'next/router';
import path from '@/constants/path';
import UserTemplate from '@/components/common/user/UserTemplate';
import { ErrorBoundary } from '@/error';
import HistoryStatusContainer from '@/containers/userApplicationHistoryContainer/HistoryStatusContainer';
import UserTitle from '@/components/common/user/UserTitle';
import UserApplicationHistoryContainer from '@/containers/userContainer/UserApplicationHistoryContainer';

export default function UserContainer() {
  const router = useRouter();

  return (
    <User>
      <UserTemplate>
        <ErrorBoundary fallback={null}>
          <UserApplicationHistoryContainer />
        </ErrorBoundary>
      </UserTemplate>
    </User>
  );
}

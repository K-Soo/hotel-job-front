import React from 'react';
import User from '@/components/user';
import UserTemplate from '@/components/common/user/UserTemplate';
import { ErrorBoundary } from '@/error';
import UserApplicationHistoryContainer from '@/containers/userContainer/UserApplicationHistoryContainer';

export default function UserContainer() {
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

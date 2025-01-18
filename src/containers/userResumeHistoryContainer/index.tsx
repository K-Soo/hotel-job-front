import React from 'react';
import UserResumeHistory from '@/components/userResumeHistory';
import UserTemplate from '@/components/common/user/UserTemplate';
import UserTitle from '@/components/common/user/UserTitle';

export default function UserResumeHistoryContainer() {
  return (
    <UserResumeHistory>
      <UserTemplate>
        <UserTitle title="지연현황" />
      </UserTemplate>
    </UserResumeHistory>
  );
}

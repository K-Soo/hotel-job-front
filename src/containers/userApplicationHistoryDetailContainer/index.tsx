import React from 'react';
import UserTemplate from '@/components/common/user/UserTemplate';
import UserApplicationHistoryDetail from '@/components/userApplicationHistoryDetail';
import UserTitle from '@/components/common/user/UserTitle';

export default function userApplicationHistoryDetailContainer() {
  return (
    <UserApplicationHistoryDetail>
      <UserTemplate>
        <UserTitle title="지원 상세현황" />
      </UserTemplate>
    </UserApplicationHistoryDetail>
  );
}

import React from 'react';
import UserResume from '@/components/userResume';
import UserTemplate from '@/components/common/user/UserTemplate';
import UserTitle from '@/components/common/user/UserTitle';

export default function UserResumeContainer() {
  return (
    <UserResume>
      <UserTemplate>
        <UserTitle title="이력서 목록" />
      </UserTemplate>
    </UserResume>
  );
}

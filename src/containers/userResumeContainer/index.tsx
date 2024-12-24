import React from 'react';
import UserResume from '@/components/userResume';
import UserAsideMenu from '@/components/common/UserAsideMenu';

export default function UserResumeContainer() {
  return (
    <UserResume>
      <UserAsideMenu />
    </UserResume>
  );
}

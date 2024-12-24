import React from 'react';
import User from '@/components/user';
import UserAsideMenu from '@/components/common/user/UserAsideMenu';

export default function UserContainer() {
  return (
    <User>
      <UserAsideMenu />
    </User>
  );
}

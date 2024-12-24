import React from 'react';
import User from '@/components/user';
import UserAsideMenu from '@/components/common/UserAsideMenu';

export default function UserContainer() {
  return (
    <User>
      <UserAsideMenu />
    </User>
  );
}

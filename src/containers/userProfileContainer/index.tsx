import React from 'react';
import UserAsideMenu from '@/components/common/user/UserAsideMenu';
import UserProfile from '@/components/userProfile';
import UserTitle from '@/components/common/user/UserTitle';
import UserTemplate from '@/components/common/user/UserTemplate';

export default function UserProfileContainer() {
  return (
    <UserProfile>
      <UserTemplate>
        <UserTitle title="프로필 정보" />
      </UserTemplate>
    </UserProfile>
  );
}

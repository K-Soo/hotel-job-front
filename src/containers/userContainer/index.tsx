import React from 'react';
import User from '@/components/user';
import UserAsideMenu from '@/components/common/user/UserAsideMenu';
import { useRouter } from 'next/router';
import path from '@/constants/path';

export default function UserContainer() {
  const router = useRouter();

  return (
    <User>
      <UserAsideMenu />
      <div>
        <button onClick={() => router.push(path.USER_RESUME)}>이력서 페이지 </button>
        <div>
          <button onClick={() => router.push(path.USER_PROFILE)}>프로필 페이지</button>
        </div>
      </div>
    </User>
  );
}

import React from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import useAuth from '@/hooks/useAuth';
import Button from '@/components/common/style/Button';
import path from '@/constants/path';
import Icon from '@/icons/Icon';
import SkeletonUI from '@/components/common/SkeletonUI';
import IconHover from '@/components/common/IconHover';
import { motion } from 'framer-motion';

export default function User() {
  const router = useRouter();
  const { isAuthenticated, isAuthLoading, role, isUnAuthenticated } = useAuth();

  const handleClickUserIcon = () => {
    if (role === 'JOB_SEEKER') {
      router.push(path.USER);
    }
    if (role === 'EMPLOYER') {
      router.push(path.EMPLOYER);
    }
  };

  if (isUnAuthenticated) {
    return (
      <S.User>
        <Button label="로그인" variant="tertiary" height="40px" onClick={() => router.push(path.SIGN_IN)} fontSize="15px" width="80px" />
      </S.User>
    );
  }

  if (isAuthLoading) {
    return <SkeletonUI.Icon />;
  }

  if (isAuthenticated) {
    return (
      <S.User initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0 }}>
        <IconHover onClick={handleClickUserIcon} width="40px" height="40px">
          <Icon name="User" />
        </IconHover>
      </S.User>
    );
  }
}

const S = {
  User: styled(motion.div)`
    display: flex;
    align-items: center;
    font-size: 0;
  `,
};

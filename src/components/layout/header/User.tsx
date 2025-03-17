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
  const [isVisible, setIsVisible] = React.useState(false);

  const router = useRouter();
  const { isAuthenticated, isAuthLoading, role } = useAuth();

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      setIsVisible(true);
    }, 300);

    return () => clearTimeout(timeout);
  }, []);

  const handleClickUserIcon = () => {
    if (role === 'JOB_SEEKER') {
      router.push(path.USER);
    }
    if (role === 'EMPLOYER') {
      router.push(path.EMPLOYER);
    }
  };

  if (isAuthLoading) {
    return <SkeletonUI.Icon />;
  }

  if (isAuthenticated) {
    return (
      <S.User initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2 }}>
        <IconHover onClick={handleClickUserIcon} width="40px" height="40px">
          <Icon name="User" />
        </IconHover>
      </S.User>
    );
  }

  if (!isAuthLoading && !isAuthenticated && isVisible) {
    return (
      <S.User>
        <Button
          margin="0 20px 0 0"
          label="기업회원/채용광고(무료 체험 제공)"
          variant="secondary100"
          height="40px"
          onClick={() => router.push(path.LANDING_EMPLOYER)}
          fontSize="15px"
          width="230px"
        />
        <Button label="로그인" variant="tertiary" height="40px" onClick={() => router.push(path.SIGN_IN)} fontSize="15px" width="80px" />
      </S.User>
    );
  }
}

const S = {
  User: styled(motion.div)`
    /* border: 1px solid red; */
    display: flex;
    align-items: center;
    font-size: 0;
    .user-icon {
      border: 1px solid red;
    }
  `,
};

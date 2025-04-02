import React from 'react';
import { useRouter } from 'next/router';
import LoadingOverlay from '@/components/common/LoadingOverlay';
import { Post } from '@/apis';

export default function EmailVerifyPage() {
  const router = useRouter();
  const { token } = router.query;

  const fetchEmailVerify = async (token: string) => {
    try {
      const response = await Post.emailVerify({ token });
      console.log('이메일 검증 API : ', response);
      const redirectUrl = `${response.result.redirect}?token=${response.result.token}`;

      router.push(redirectUrl);
    } catch (error) {
      console.log('error: ', error);
      alert('이메일 인증에 실패했습니다. 다시 시도해주세요.');
      window.location.href = '/';
    }
  };
  React.useEffect(() => {
    if (router.isReady) {
      if (!token) {
        alert('잘못된 접근입니다.');
        window.location.href = '/';
        return;
      }

      fetchEmailVerify(token as string);
    }
  }, [router.isReady, token]);

  return <LoadingOverlay message="인중 중입니다. 잠시만 기다려주세요." />;
}

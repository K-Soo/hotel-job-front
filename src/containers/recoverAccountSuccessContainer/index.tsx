import { Post } from '@/apis';
import LoadingOverlay from '@/components/common/LoadingOverlay';
import { useRouter } from 'next/router';
import React from 'react';
import { getErrorCode, errorMessages } from '@/error';
import RecoverAccountSuccess from '@/components/recoverAccountSuccess';
import useLoading from '@/hooks/useLoading';

export default function RecoverAccountSuccessContainer() {
  const [userId, setUserId] = React.useState<string>('');
  const [loading, setLoading] = React.useState<boolean>(false);
  const router = useRouter();
  const hasFetchedRef = React.useRef(false);
  const { token } = router.query;

  const fetchEmailVerify = async (token: string) => {
    setLoading(true);
    try {
      const response = await Post.emailVerifyAccount({ token });
      console.log('아이디 요청 API : ', response);

      if (response.result.status !== 'success') {
        throw new Error('Email verification failed');
      }
      setUserId(response.result.userId);
      setLoading(false);
    } catch (error) {
      console.error('검증 오류: ', error);
      const customErrorCode = getErrorCode(error);
      const errorMessage = customErrorCode && errorMessages[customErrorCode];

      alert(errorMessage || '이메일 인증에 실패했습니다. 다시 시도해주세요.');
      router.replace('/');
    }
  };

  React.useEffect(() => {
    if (!router.isReady) {
      return;
    }

    if (!token) {
      alert('잘못된 접근입니다.');
      router.replace('/');
      return;
    }

    if (hasFetchedRef.current) {
      return;
    }

    hasFetchedRef.current = true;
    fetchEmailVerify(token as string);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.isReady, token]);

  if (loading || !userId) {
    return <LoadingOverlay />;
  }

  return <RecoverAccountSuccess userId={userId} />;
}

import React from 'react';
import { useRouter } from 'next/router';
import LoadingOverlay from '@/components/common/LoadingOverlay';
import { Post } from '@/apis';
import { errorMessages, getErrorCode } from '@/error';
import useAlertWithConfirm from '@/hooks/useAlertWithConfirm';

export default function EmailVerifyPage() {
  const router = useRouter();
  const { token } = router.query;

  const hasFetchedRef = React.useRef(false);

  const { setAlertWithConfirmAtom } = useAlertWithConfirm();

  const fetchEmailVerify = async (token: string) => {
    hasFetchedRef.current = true;

    try {
      const response = await Post.emailVerify({ token });
      console.log('이메일 검증 API : ', response);

      if (response.result.status !== 'success') {
        throw new Error('Email verification failed');
      }

      // XXX - 모바일대응?
      // router.replace(`${response.result.redirect}?token=${token}`);

      const channel = new BroadcastChannel('email-verify');
      channel.postMessage({ type: 'email-verify', message: { redirect: `${response.result.redirect}?token=${token}` } });
      alert('이메일 인증이 완료되었습니다! 기존 페이지에서 계속 진행해 주세요.');
    } catch (error) {
      console.error('검증 오류: ', error);
      const customErrorCode = getErrorCode(error);
      const errorMessage = customErrorCode && errorMessages[customErrorCode];
      alert(errorMessage || '이메일 인증에 실패했습니다. 다시 시도해주세요.');
    } finally {
      window.close();
    }
  };

  React.useEffect(() => {
    if (!router.isReady) {
      return;
    }

    if (hasFetchedRef.current) {
      alert('이미 인증 요청을 보냈습니다.');
      window.location.href = '/';
      return;
    }

    fetchEmailVerify(token as string);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.isReady, token]);

  return <LoadingOverlay message="인중 중입니다. 잠시만 기다려주세요." />;
}

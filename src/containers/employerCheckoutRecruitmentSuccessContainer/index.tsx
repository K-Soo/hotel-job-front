import React from 'react';
import EmployerCheckoutRecruitmentSuccess from '@/components/employerCheckoutRecruitmentSuccess';
import { ParsedUrlQuery } from 'querystring';
import { useRouter } from 'next/router';
import { queryKeyChecker } from '@/utils';
import { Post } from '@/apis';
import { errorMessages } from '@/error';
import { PaymentRecruitmentConfirmData } from '@/types';
import SkeletonUI from '@/components/common/SkeletonUI';
import LoadingOverlay from '@/components/common/LoadingOverlay';
import useAuth from '@/hooks/useAuth';
import queryKeys from '@/constants/queryKeys';
import { useQueryClient } from '@tanstack/react-query';

interface Query extends ParsedUrlQuery {
  paymentType?: 'NORMAL';
  orderId?: string;
  paymentKey?: string;
  amount?: string;
}

export default function EmployerCheckoutRecruitmentSuccessContainer() {
  const [isLoading, setIsLoading] = React.useState(true);
  const [confirmForm, setConfirmForm] = React.useState<PaymentRecruitmentConfirmData | null>(null);
  const [hasFetched, setHasFetched] = React.useState(false);

  const { isAuthenticated } = useAuth();
  const queryClient = useQueryClient();

  const router = useRouter();

  const { paymentType, orderId, paymentKey, amount } = router.query as Query;

  // API - 결제 승인요청
  const fetchPaymentConfirm = async (orderId: string, paymentKey: string, amount: string) => {
    try {
      const response = await Post.paymentRecruitmentConfirm({ orderId, paymentKey, amount });
      console.log('결제 승인요청 API : ', response);
      if (!response.result) {
        throw new Error();
      }
      setConfirmForm(response.result);
      await queryClient.invalidateQueries({ queryKey: [queryKeys.COUPON_LIST], refetchType: 'all' });
    } catch (error: any) {
      const customErrorcode = error.response?.data?.error?.code;
      const errorMessage = errorMessages[customErrorcode];

      // 파악한 에러 코드가 있을경우
      if (errorMessage) {
        alert(errorMessage);
        window.location.href = '/employer/recruitment';
        return;
      }
      alert('결제 승인에 실패했습니다. 다시 시도해주세요.');
      window.location.href = '/employer/recruitment';
      return;
    } finally {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    if (!router.isReady) return;
    if (!isAuthenticated) return;
    if (hasFetched) return;

    const isValidQuery = queryKeyChecker({ query: router.query, allow: ['paymentType', 'orderId', 'paymentKey', 'amount'] });

    const isReadyForApi = [orderId, paymentKey, amount, paymentType].every(Boolean);

    if (!isValidQuery || paymentType !== 'NORMAL' || !isReadyForApi) {
      router.replace('/404');
      return;
    }

    setHasFetched(true);
    fetchPaymentConfirm(orderId!, paymentKey!, amount!);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.isReady, isAuthenticated, orderId, paymentKey, amount, paymentType, hasFetched]);

  if (isLoading && !confirmForm) {
    return (
      <>
        <div style={{ width: '400px', margin: '50px auto' }}>
          <LoadingOverlay message="결제 진행중입니다. 잠시만 기다려주세요." />
          <SkeletonUI.Line style={{ margin: '15px 0', height: '600px' }} />
        </div>
      </>
    );
  }

  if (confirmForm) {
    return <EmployerCheckoutRecruitmentSuccess confirmForm={confirmForm} />;
  }

  return null;
}

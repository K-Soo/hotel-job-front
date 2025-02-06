import React from 'react';
import EmployerCheckoutRecruitmentSuccess from '@/components/employerCheckoutRecruitmentSuccess';
import { ParsedUrlQuery } from 'querystring';
import { useRouter } from 'next/router';
import { queryKeyChecker } from '@/utils';
import { Post } from '@/apis';
import axios from 'axios';
import { errorMessages } from '@/error';

interface Query extends ParsedUrlQuery {
  paymentType?: 'NORMAL';
  orderId?: string;
  paymentKey?: string;
  amount?: string;
}

export default function EmployerCheckoutRecruitmentSuccessContainer() {
  const [isLoading, setIsLoading] = React.useState(true);

  const router = useRouter();

  const { paymentType, orderId, paymentKey, amount } = router.query as Query;

  // API - 결제 승인요청
  const fetchPaymentConfirm = async (orderId: string, paymentKey: string, amount: string) => {
    try {
      const response = await Post.paymentRecruitmentConfirm({ orderId, paymentKey, amount });
      console.log('결제 승인요청 API : ', response);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const customErrorcode = error.response?.data?.error?.code;
        const errorMessage = errorMessages[customErrorcode];
        if (errorMessage) {
          alert(errorMessage);
          // window.location.href = '/employer/checkout/recruitment';
          return;
        }
      }
      alert('결제 승인에 실패했습니다. 다시 시도해주세요.');
      // window.location.href = '/employer/checkout/recruitment';
      return;
    } finally {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    if (!router.isReady) return;
    const isValidQuery = queryKeyChecker({ query: router.query, allow: ['paymentType', 'orderId', 'paymentKey', 'amount'] });

    const isReadyForApi = [orderId, paymentKey, amount, paymentType].every(Boolean);

    try {
      if (!isValidQuery || paymentType !== 'NORMAL' || !isReadyForApi) {
        throw new Error('Invalid query parameters');
      }
      fetchPaymentConfirm(orderId!, paymentKey!, amount!);
    } catch (error) {
      router.replace('/404');
    }
  }, [amount, orderId, paymentKey, paymentType, router]);

  return <EmployerCheckoutRecruitmentSuccess isLoading={isLoading} />;
}

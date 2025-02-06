import React from 'react';
import EmployerCheckoutRecruitment from '@/components/employerCheckoutRecruitment';
import { loadTossPayments, TossPaymentsWidgets } from '@tosspayments/tosspayments-sdk';
import useFetchQuery from '@/hooks/useFetchQuery';
import { Get } from '@/apis';
import queryKeys from '@/constants/queryKeys';
import { useRouter } from 'next/router';
import Button from '@/components/common/style/Button';
import { errorCode } from '@/error';
import path from '@/constants/path';
import AmountInfo from '@/components/employerCheckoutRecruitment/AmountInfo';
import environment from '@/environment';
import ProductInfo from '@/components/employerCheckoutRecruitment/ProductInfo';
import RecruitmentInfo from '@/components/employerCheckoutRecruitment/RecruitmentInfo';
import TossPaymentInfo from '@/components/employerCheckoutRecruitment/TossPaymentInfo';
import DiscountInfo from '@/components/employerCheckoutRecruitment/DiscountInfo';
import { v4 as uuidv4 } from 'uuid';
import useAuth from '@/hooks/useAuth';

export default function EmployerCheckoutRecruitmentContainer() {
  const [widgets, setWidgets] = React.useState<TossPaymentsWidgets | null>(null);
  const [ready, setReady] = React.useState(false);
  const { authAtomState } = useAuth();
  const router = useRouter();
  const { query } = router;
  const [amount, setAmount] = React.useState({
    currency: 'KRW',
    value: 50_000,
  });

  const { data, isLoading, isSuccess, isError, error } = useFetchQuery({
    queryKey: [queryKeys.PAYMENT_RECRUITMENT_DETAIL, { orderId: query.slug }],
    queryFn: Get.getPaymentRecruitmentDetail,
    options: {
      enabled: !!query.slug,
      staleTime: 0,
      gcTime: 0,
    },
    requestQuery: {
      orderId: query.slug as string,
    },
  });

  console.log('주문 상세정보 API  : ', data);

  React.useEffect(() => {
    if (error) {
      const responseErrorCode = error.response?.data?.error?.code;
      if (!responseErrorCode) {
        alert('알 수 없는 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
        router.push(path.EMPLOYER);
      }
      if (responseErrorCode === errorCode.PAYMENT_EXPIRED_ORDER) {
        alert('주문 시간이 만료되었습니다. 새로운 주문을 생성해주세요.');
        router.replace(path.EMPLOYER_PRODUCT_RECRUITMENT);
      }
      if (responseErrorCode === errorCode.PAYMENT_NOT_FOUND_ORDER) {
        alert('주문을 찾을 수 없습니다. 새로운 주문을 생성해주세요.');
        router.replace(path.EMPLOYER_PRODUCT_RECRUITMENT);
      }
      if (responseErrorCode === errorCode.PAYMENT_INVALID_STATUS) {
        alert('주문 상태가 유효하지 않습니다. 새로운 주문을 생성해주세요.');
        router.replace(path.EMPLOYER_PRODUCT_RECRUITMENT);
      }
      if (responseErrorCode === errorCode.PAYMENT_INVALID_TOTAL_AMOUNT) {
        alert('주문 금액 정보가 유효하지 않습니다. 새로운 주문을 생성해주세요.');
        router.replace(path.EMPLOYER_PRODUCT_RECRUITMENT);
      }
      if (responseErrorCode === errorCode.PAYMENT_EMPTY_ORDER_ITEMS) {
        alert('상품 정보를 찾을 수 없습니다. 새로운 주문을 생성해주세요.');
        router.replace(path.EMPLOYER_PRODUCT_RECRUITMENT);
      }
      if (responseErrorCode === errorCode.PAYMENT_NOT_CERT_USER) {
        alert('본인인증 정보가 없습니다. 계정관리 페이지로 이동합니다.');
        router.replace(path.EMPLOYER_ACCOUNT);
      }
    }
  }, [error]);

  React.useEffect(() => {
    async function fetchPaymentWidgets() {
      // ------  결제위젯 초기화 ------
      const tossPayments = await loadTossPayments(environment.tossClientKey);
      // 회원 결제
      const widgets = tossPayments.widgets({
        customerKey: uuidv4(),
      });

      setWidgets(widgets);
    }

    if (widgets !== null) {
      return;
    }
    if (!data) {
      return;
    }
    fetchPaymentWidgets();
  }, [data]);

  React.useEffect(() => {
    async function renderPaymentWidgets() {
      if (widgets === null) {
        return;
      }

      await widgets.setAmount(amount);

      await Promise.all([
        widgets.renderPaymentMethods({
          selector: '#payment-method',
          variantKey: 'default',
        }),
        widgets.renderAgreement({
          selector: '#agreement',
          variantKey: 'AGREEMENT',
        }),
      ]);
      setReady(true);
    }
    if (data && !ready) {
      renderPaymentWidgets();
    }
  }, [widgets, data, ready]);

  const handlePayment = async () => {
    if (widgets == null) {
      return;
    }
    if (!data) {
      return;
    }
    try {
      // ------ 결제 요청 ------
      await widgets.requestPayment({
        orderId: data.result.orderId,
        orderName: '토스 티셔츠 외 2건',
        successUrl: window.location.origin + '/success',
        failUrl: window.location.origin + '/fail',
        customerEmail: 'kanabun102@gmail.com',
        customerName: '김영배',
        customerMobilePhone: '01002040102',
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <EmployerCheckoutRecruitment>
      <ProductInfo productInfo={data?.result.productInfo} isLoading={isLoading} />
      <RecruitmentInfo recruitmentInfo={data?.result.recruitmentInfo} isLoading={isLoading} />
      <DiscountInfo finalTotalAmount={data?.result.amountInfo.finalTotalAmount} isLoading={isLoading} />
      <TossPaymentInfo />
      <AmountInfo amountInfo={data?.result.amountInfo} isLoading={isLoading} isSuccess={isSuccess}>
        <Button label="결제" variant="primary" onClick={handlePayment} isLoading={isLoading} />
      </AmountInfo>
    </EmployerCheckoutRecruitment>
  );
}

import React from 'react';
import EmployerCheckoutRecruitment from '@/components/employerCheckoutRecruitment';
import { loadTossPayments, TossPaymentsWidgets } from '@tosspayments/tosspayments-sdk';
import useFetchQuery from '@/hooks/useFetchQuery';
import { Get } from '@/apis';
import queryKeys from '@/constants/queryKeys';
import { useRouter } from 'next/router';
import Button from '@/components/common/style/Button';
import { errorCode, errorMessages } from '@/error';
import path from '@/constants/path';
import AmountInfo from '@/components/employerCheckoutRecruitment/AmountInfo';
import environment from '@/environment';
import ProductInfo from '@/components/employerCheckoutRecruitment/ProductInfo';
import RecruitmentInfo from '@/components/employerCheckoutRecruitment/RecruitmentInfo';
import TossPaymentInfo from '@/components/employerCheckoutRecruitment/TossPaymentInfo';
import DiscountInfo from '@/components/employerCheckoutRecruitment/DiscountInfo';
import { v4 as uuidv4 } from 'uuid';
import { RECRUITMENT_PRODUCT_NAME, RECRUITMENT_PRODUCT_TYPE } from '@/constants/product';

export default function EmployerCheckoutRecruitmentContainer() {
  const [widgets, setWidgets] = React.useState<TossPaymentsWidgets | null>(null);
  const [ready, setReady] = React.useState(false);
  const router = useRouter();
  const { query } = router;
  const [amount, setAmount] = React.useState({
    currency: 'KRW',
    value: 0,
  });

  const { data, isLoading, error } = useFetchQuery({
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
    if (data) {
      setAmount({
        currency: 'KRW',
        value: data.result.amountInfo.finalTotalAmount,
      });
    }
  }, [data]);
  const test = errorMessages['ERR-80018'];
  console.log('test: ', test);

  React.useEffect(() => {
    if (error) {
      const responseErrorCode = error.response?.data?.error?.code ?? null;

      if (!responseErrorCode) {
        router.push(path.EMPLOYER);
        alert('알 수 없는 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
        return;
      }

      if (responseErrorCode === errorCode.PAYMENT_NOT_CERT_USER) {
        alert(errorMessages[responseErrorCode]);
        router.replace(path.EMPLOYER_ACCOUNT);
        return;
      }

      if (errorMessages[responseErrorCode]) {
        alert(errorMessages[responseErrorCode]);
        router.replace(path.EMPLOYER_PRODUCT_RECRUITMENT);
        return;
      }

      router.push(path.EMPLOYER);
      alert('알 수 없는 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
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

      if (!data) {
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
      if (data.result.amountInfo.finalTotalAmount === 0) {
        throw new Error('결제 금액이 0원입니다.');
      }

      const productName = data.result.productInfo.name;
      const type = data.result.productInfo.type;
      const optionCount = data.result.productInfo.options.length;

      await widgets.requestPayment({
        orderId: data.result.orderId,
        orderName: `${RECRUITMENT_PRODUCT_TYPE[type]}-${RECRUITMENT_PRODUCT_NAME[productName]} ${
          optionCount > 0 ? `외 옵션 ${optionCount}건` : ''
        }`,
        successUrl: window.location.origin + '/employer/checkout/recruitment/success',
        failUrl: window.location.origin + '/employer/checkout/recruitment/fail',
        customerEmail: data.result.certificationInfo?.managerEmail || 'unknown',
        customerName: data.result.certificationInfo?.userName || 'unknown',
        // customerMobilePhone: data.result.certificationInfo?.phone || 'unknown', // 가상계좌 안내, 퀵계좌이체
      });
    } catch (error: any) {
      console.log('error: ', error.message);
      if (error.message === '취소되었습니다.') {
        return;
      }
      alert(error.message || '결제에 실패했습니다. 잠시 후 다시 시도해주세요.');
    }
  };

  return (
    <EmployerCheckoutRecruitment>
      <ProductInfo productInfo={data?.result.productInfo} isLoading={isLoading} />
      <RecruitmentInfo recruitmentInfo={data?.result.recruitmentInfo} isLoading={isLoading} />
      <DiscountInfo finalTotalAmount={data?.result.amountInfo.finalTotalAmount} isLoading={isLoading} />
      <TossPaymentInfo />
      <AmountInfo amountInfo={data?.result.amountInfo} isLoading={isLoading}>
        <Button label="결제" variant="primary" onClick={handlePayment} isLoading={isLoading || !widgets} />
      </AmountInfo>
    </EmployerCheckoutRecruitment>
  );
}

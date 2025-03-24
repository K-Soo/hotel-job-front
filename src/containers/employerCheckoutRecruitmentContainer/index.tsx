import React from 'react';
import EmployerCheckoutRecruitment from '@/components/employerCheckoutRecruitment';
import { loadTossPayments, TossPaymentsWidgets } from '@tosspayments/tosspayments-sdk';
import useFetchQuery from '@/hooks/useFetchQuery';
import { Get, Post } from '@/apis';
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
import { RECRUITMENT_PRODUCT_NAME, RECRUITMENT_PRODUCT_TYPE } from '@/constants/product';
import useAlertWithConfirm from '@/hooks/useAlertWithConfirm';
import { useQueryClient } from '@tanstack/react-query';
import { v4 as uuidv4 } from 'uuid';

export default function EmployerCheckoutRecruitmentContainer() {
  const [widgets, setWidgets] = React.useState<TossPaymentsWidgets | null>(null);
  const [ready, setReady] = React.useState(false);
  const [amount, setAmount] = React.useState({ currency: 'KRW', value: 0 });

  const { setAlertWithConfirmAtom } = useAlertWithConfirm();
  const queryClient = useQueryClient();

  const router = useRouter();
  const { query } = router;

  const { data, isLoading, error, refetch, isSuccess, isRefetching } = useFetchQuery({
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
        value: data.result.amountInfo.TotalAmount,
      });
    }
  }, [data, isRefetching]);

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

  // ------  결제위젯 초기화 ------
  React.useEffect(() => {
    async function fetchPaymentWidgets() {
      const tossPayments = await loadTossPayments(environment.tossClientKey);

      const widgets = tossPayments.widgets({ customerKey: uuidv4() });

      setWidgets(widgets);
    }

    if (widgets !== null) return;
    if (!data) return;

    fetchPaymentWidgets();
  }, [data, widgets]);

  React.useEffect(() => {
    async function renderPaymentWidgets() {
      if (widgets === null) return;
      if (!data) return;

      await widgets.setAmount(amount);

      await Promise.all([
        widgets.renderPaymentMethods({ selector: '#payment-method', variantKey: 'default' }),
        widgets.renderAgreement({ selector: '#agreement', variantKey: 'AGREEMENT' }),
      ]);

      setReady(true);
    }

    if (isSuccess && data && !ready) {
      renderPaymentWidgets();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [widgets, data, ready, isSuccess]);

  React.useEffect(() => {
    async function renderPaymentWidgets() {
      if (widgets === null) return;
      if (!data) return;
    }

    if (data && !ready) {
      renderPaymentWidgets();
    }
  }, [widgets, data, ready]);

  const fetchConfirmPayment = async () => {
    if (widgets == null) return;
    if (!data) return;

    try {
      if (data.result.amountInfo.TotalAmount === 0 && data.result.appliedCouponId === null) {
        throw new Error('결제 금액이 0원입니다.');
      }

      const productName = data.result.productInfo.name;
      const type = data.result.productInfo.type;
      const optionCount = data.result.productInfo.options.length;
      const orderName = `${RECRUITMENT_PRODUCT_TYPE[type]} ${RECRUITMENT_PRODUCT_NAME[productName]}`;
      const orderOptionName = optionCount > 0 ? ` 외 옵션 ${optionCount}건` : '';

      await widgets.setAmount(amount);

      await widgets.requestPayment({
        orderId: data.result.orderId,
        orderName: `${orderName}${orderOptionName}`,
        successUrl: window.location.origin + '/employer/checkout/recruitment/success',
        failUrl: window.location.origin + '/employer/checkout/recruitment/fail',
        customerEmail: data.result.certificationInfo?.managerEmail || 'unknown',
        customerName: data.result.certificationInfo?.userName || 'unknown',
      });
    } catch (error: any) {
      console.log('error: ', error.message);
      if (error.message === '취소되었습니다.') {
        return;
      }
      alert(error.message || '결제에 실패했습니다. 잠시 후 다시 시도해주세요.');
    }
  };

  const fetchConfirmFreePayment = async () => {
    if (widgets == null) return;
    if (!data) return;

    try {
      if (data.result.amountInfo.TotalAmount === 0 && data.result.appliedCouponId === null) {
        throw new Error('결제 금액이 0원입니다.');
      }
      const response = await Post.paymentFreeRecruitmentConfirm({ orderId: data.result.orderId, amount: amount.value });
      console.log('결제 승인 API : ', response);
      await queryClient.invalidateQueries({ queryKey: [queryKeys.COUPON_LIST], refetchType: 'all' });
      await queryClient.invalidateQueries({ queryKey: [queryKeys.RECRUITMENT_LIST], refetchType: 'all' });

      setAlertWithConfirmAtom((prev) => ({
        ...prev,
        type: 'CONFIRM',
        title: 'TITLE_9',
        subTitle: 'DESC_10',
        confirmLabel: '확인',
        onClickConfirm: () => router.push(`${path.EMPLOYER_RECRUITMENT}?status=progress`),
      }));
    } catch (error: any) {
      console.log('error: ', error.message);
      if (error.message === '취소되었습니다.') {
        return;
      }
      alert(error.message || '결제에 실패했습니다. 잠시 후 다시 시도해주세요.');
    }
  };

  const handleClickConfirmFreePayment = () => {
    setAlertWithConfirmAtom((prev) => ({
      ...prev,
      type: 'CONFIRM',
      title: 'TITLE_21',
      confirmLabel: '진행하기',
      cancelLabel: '취소',
      onClickConfirm: async () => await fetchConfirmFreePayment(),
    }));
  };

  return (
    <EmployerCheckoutRecruitment>
      <RecruitmentInfo recruitmentInfo={data?.result.recruitmentInfo} isLoading={isLoading} />
      <ProductInfo productInfo={data?.result.productInfo} isLoading={isLoading} />
      <DiscountInfo
        TotalAmount={data?.result.amountInfo.TotalAmount}
        orderId={data?.result.orderId}
        refetch={refetch}
        appliedCouponId={data?.result?.appliedCouponId ?? null}
      />
      <TossPaymentInfo />

      <AmountInfo amountInfo={data?.result.amountInfo} isLoading={isLoading}>
        {amount.value !== 0 && (
          <Button label="결제하기" variant="primary" onClick={fetchConfirmPayment} isLoading={!ready} fontSize="18px" />
        )}
        {amount.value === 0 && (
          <Button label="무료등록" variant="primary" onClick={handleClickConfirmFreePayment} isLoading={!ready} fontSize="18px" />
        )}
      </AmountInfo>
    </EmployerCheckoutRecruitment>
  );
}

import React from 'react';
import EmployerCheckout from '@/components/employerCheckout';
import environment from '@/environment';
import { loadTossPayments, ANONYMOUS, TossPaymentsWidgets } from '@tosspayments/tosspayments-sdk';
// import uuid from 'uuid';
import Button from '@/components/common/style/Button';

export default function EmployerCheckoutContainer() {
  const [widgets, setWidgets] = React.useState<TossPaymentsWidgets | null>(null);
  const [amount, setAmount] = React.useState({
    currency: 'KRW',
    value: 50_000,
  });

  React.useEffect(() => {
    async function fetchPaymentWidgets() {
      // ------  결제위젯 초기화 ------
      const tossPayments = await loadTossPayments('test_gck_docs_Ovk5rk1EwkEbP0W43n07xlzm');
      console.log('tossPayments: ', tossPayments);
      // 회원 결제
      const widgets = tossPayments.widgets({
        customerKey: 'asd',
      });

      setWidgets(widgets);
    }

    fetchPaymentWidgets();
  }, []);

  React.useEffect(() => {
    async function renderPaymentWidgets() {
      if (widgets == null) {
        return;
      }
      // ------ 주문의 결제 금액 설정 ------
      await widgets.setAmount(amount);

      await Promise.all([
        // ------  결제 UI 렌더링 ------
        widgets.renderPaymentMethods({
          selector: '#payment-method',
          variantKey: 'DEFAULT',
        }),
        // ------  이용약관 UI 렌더링 ------
        widgets.renderAgreement({
          selector: '#agreement',
          variantKey: 'AGREEMENT',
        }),
      ]);
      // setReady(true);
    }
    renderPaymentWidgets();
  }, [widgets]);

  const handlePayment = async () => {
    if (widgets == null) {
      return;
    }
    try {
      // ------ 결제 요청 ------
      await widgets.requestPayment({
        orderId: '1FkqW9OmF8EmfvyqlMv-b',
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
    <>
      <EmployerCheckout>
        <Button label="결제" variant="primary" onClick={handlePayment} />
      </EmployerCheckout>
    </>
  );
}

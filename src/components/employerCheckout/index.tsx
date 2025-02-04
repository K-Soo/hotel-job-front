import styled from 'styled-components';

interface EmployerCheckoutProps {
  children: React.ReactNode;
}

export default function EmployerCheckout({ children }: EmployerCheckoutProps) {
  return (
    <S.EmployerCheckout>
      <div className="widget-container">
        <div id="payment-method" />
        {/* 이용약관 UI */}
        <div id="agreement" />
      </div>
      <S.PaymentContainer>
        <p className="payment-info">
          <span>결제금액 : 70,400원</span>
        </p>
        {children}
      </S.PaymentContainer>
    </S.EmployerCheckout>
  );
}

const S = {
  EmployerCheckout: styled.section`
    display: flex;
    width: 100%;
    .widget-container {
      flex: 1;
    }
  `,
  PaymentContainer: styled.div`
    flex-basis: 400px;
    .payment-info {
      /* height: 200px; */
      display: flex;
      /* align-items: center; */
      /* justify-content: center; */
      border: 1px solid #e8f3ff;
      padding: 20px;
      margin-bottom: 30px;
      font-size: 20px;
    }
  `,
};

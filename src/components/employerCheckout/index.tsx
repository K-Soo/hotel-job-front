import styled from 'styled-components';

interface EmployerCheckoutProps {}

export default function EmployerCheckout({}: EmployerCheckoutProps) {
  return (
    <S.EmployerCheckout>
      <div id="payment-method" />
      {/* 이용약관 UI */}
      <div id="agreement" />
    </S.EmployerCheckout>
  );
}

const S = {
  EmployerCheckout: styled.section``,
};

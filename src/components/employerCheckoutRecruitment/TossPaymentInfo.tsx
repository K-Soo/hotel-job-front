import styled from 'styled-components';

interface TossPaymentInfoProps {}

export default function TossPaymentInfo({}: TossPaymentInfoProps) {
  return (
    <S.TossPaymentInfo>
      <div id="payment-method" />
      <div id="agreement" />
    </S.TossPaymentInfo>
  );
}

const S = {
  TossPaymentInfo: styled.div``,
};

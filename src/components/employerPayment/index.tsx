import styled from 'styled-components';

interface EmployerPaymentProps {
  children: React.ReactNode;
}

export default function EmployerPayment({ children }: EmployerPaymentProps) {
  return <S.EmployerPayment>{children}</S.EmployerPayment>;
}

const S = {
  EmployerPayment: styled.section``,
};

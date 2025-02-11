import styled from 'styled-components';

interface EmployerCouponProps {
  children: React.ReactNode;
}

export default function EmployerCoupon({ children }: EmployerCouponProps) {
  return (
    <S.EmployerCoupon>
      <div className="container">{children}</div>
    </S.EmployerCoupon>
  );
}

const S = {
  EmployerCoupon: styled.section`
    .container {
      max-width: 1024px;
      width: 100%;
    }
  `,
};

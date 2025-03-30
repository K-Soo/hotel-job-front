import React from 'react';
import styled from 'styled-components';

interface EmployerCheckoutRecruitmentProps {
  children: React.ReactNode;
}

export default function EmployerCheckoutRecruitment({ children }: EmployerCheckoutRecruitmentProps) {
  const childrenArray = React.Children.toArray(children);

  return (
    <S.EmployerCheckoutRecruitment>
      <S.PaymentContainer>
        {childrenArray[0]}
        {childrenArray[1]}
        {childrenArray[2]}
        {childrenArray[3]}
      </S.PaymentContainer>
      <div className="amount-container">{childrenArray[4]}</div>
    </S.EmployerCheckoutRecruitment>
  );
}

const S = {
  EmployerCheckoutRecruitment: styled.section`
    display: flex;
    white-space: nowrap;
    min-height: 1100px;
    .amount-container {
      flex-basis: 300px;
      margin-left: 30px;
    }
  `,
  PaymentContainer: styled.div`
    border-right: 1px solid ${(props) => props.theme.colors.gray300};
    flex: 1;
  `,
};

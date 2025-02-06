import React from 'react';
import styled from 'styled-components';
import ProductInfo from '@/components/employerCheckoutRecruitment/ProductInfo';

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
      </S.PaymentContainer>
      <div className="amount-container">{childrenArray[3]}</div>
    </S.EmployerCheckoutRecruitment>
  );
}

const S = {
  EmployerCheckoutRecruitment: styled.section`
    display: flex;
    .amount-container {
      flex-basis: 330px;
      margin-left: 30px;
    }
  `,
  PaymentContainer: styled.div`
    border-right: 1px solid ${(props) => props.theme.colors.gray300};
    /* border: 1px solid red; */
    flex: 1;
  `,
};

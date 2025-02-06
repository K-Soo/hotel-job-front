import styled from 'styled-components';
import SkeletonUI from '@/components/common/SkeletonUI';
import path from '@/constants/path';

interface EmployerCheckoutRecruitmentSuccessProps {
  isLoading: boolean;
}

export default function EmployerCheckoutRecruitmentSuccess({ isLoading }: EmployerCheckoutRecruitmentSuccessProps) {
  return (
    <S.EmployerCheckoutRecruitmentSuccess>
      <div className="success-container">{isLoading && <SkeletonUI.Line />}</div>
    </S.EmployerCheckoutRecruitmentSuccess>
  );
}

const S = {
  EmployerCheckoutRecruitmentSuccess: styled.section`
    .success-container {
      border: 1px solid red;
      margin: 0 auto;
      height: 100%;
      max-width: 500px;
    }
  `,
};

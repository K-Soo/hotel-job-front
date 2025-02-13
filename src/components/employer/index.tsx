import styled from 'styled-components';
import RecentlyRecruitment from '@/components/employer/RecentlyRecruitment';
import SupportInfo from '@/components/employer/SupportInfo';
import RecruitmentCount from '@/components/employer/RecruitmentCount';
import BenefitInfo from '@/components/employer/BenefitInfo';
import { EmployerAccountInfo } from '@/types';
import SkeletonUI from '@/components/common/SkeletonUI';
import CompanyInfo from '@/components/employer/CompanyInfo';
import CompanyInfoContainer from '@/containers/employerContainer/CompanyInfoContainer';
interface EmployerProps {
  isLoading: boolean;
  data: EmployerAccountInfo | undefined;
  children: React.ReactNode;
}

export default function Employer({ isLoading, data }: EmployerProps) {
  return (
    <S.Employer>
      <S.TopDashboard>
        <RecruitmentCount certificationStatus={data?.certificationStatus} />

        <CompanyInfoContainer certificationStatus={data?.certificationStatus} />
      </S.TopDashboard>

      <S.MiddleDashboard>
        {isLoading && (
          <>
            <SkeletonUI.Line style={{ height: '180px', flex: '1', borderRadius: '10px' }} />
            <SkeletonUI.Line style={{ height: '180px', flexBasis: '500px', borderRadius: '10px' }} />
          </>
        )}
        {!isLoading && data && (
          <>
            <SupportInfo data={data} />
            <BenefitInfo />
          </>
        )}
      </S.MiddleDashboard>
    </S.Employer>
  );
}

const S = {
  Employer: styled.section``,
  TopDashboard: styled.section`
    display: flex;
    gap: 30px;
    margin-bottom: 30px;
  `,
  MiddleDashboard: styled.section`
    display: flex;
    gap: 30px;
    margin-bottom: 30px;
  `,
};

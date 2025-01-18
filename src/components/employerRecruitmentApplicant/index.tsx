import styled from 'styled-components';
import SectionTitle from '@/components/common/employer/SectionTitle';

interface EmployerRecruitmentApplicantProps {
  children: React.ReactNode;
}

export default function EmployerRecruitmentApplicant({ children }: EmployerRecruitmentApplicantProps) {
  return (
    <S.EmployerRecruitmentApplicant>
      <SectionTitle title="공고 지원자 관리" />
      {children}
    </S.EmployerRecruitmentApplicant>
  );
}

const S = {
  EmployerRecruitmentApplicant: styled.section``,
};

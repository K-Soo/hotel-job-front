import styled from 'styled-components';
import SectionTitle from '@/components/common/employer/SectionTitle';

interface EmployerRecruitmentDetailApplicantProps {
  children: React.ReactNode;
}

export default function EmployerRecruitmentDetailApplicant({ children }: EmployerRecruitmentDetailApplicantProps) {
  return (
    <S.EmployerRecruitmentDetailApplicant>
      <SectionTitle title="공고 지원자 관리" />
      {children}
    </S.EmployerRecruitmentDetailApplicant>
  );
}

const S = {
  EmployerRecruitmentDetailApplicant: styled.section``,
};

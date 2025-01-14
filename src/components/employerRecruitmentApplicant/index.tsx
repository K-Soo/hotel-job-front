import styled from 'styled-components';
import SectionTitle from '@/components/common/employer/SectionTitle';
import ApplicantStatusPanel from '@/components/employerRecruitmentApplicant/ApplicantStatusPanel';
import ApplicantTab from '@/components/employerRecruitmentApplicant/ApplicantTab';
import ApplicantTable from '@/components/employerRecruitmentApplicant/ApplicantTable';

interface EmployerRecruitmentApplicantProps {}

export default function EmployerRecruitmentApplicant({}: EmployerRecruitmentApplicantProps) {
  return (
    <S.EmployerRecruitmentApplicant>
      <SectionTitle title="공고 지원자 관리" />

      <ApplicantStatusPanel />

      <ApplicantTab />

      <ApplicantTable>
        <ApplicantTable.Header />
        <ApplicantTable.Body />
      </ApplicantTable>
    </S.EmployerRecruitmentApplicant>
  );
}

const S = {
  EmployerRecruitmentApplicant: styled.section``,
};

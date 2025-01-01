import React from 'react';
import EmployerRecruitment from '@/components/employerRecruitment';
import RecruitmentStatusBar from '@/components/employerRecruitment/RecruitmentStatusBar';
import RecruitmentTable from '@/components/employerRecruitment/RecruitmentTable';
import { useRouter } from 'next/router';
import Select from '@/components/common/style/Select';
import { productUseDateOptions } from '@/constants/options';
import EmployerTemplateForm from '@/components/common/employer/EmployerTemplateForm';
import RecruitmentFilterButton from '@/components/employerRecruitment/RecruitmentFilterButton';

export default function EmployerRecruitmentContainer() {
  const router = useRouter();

  const handleClickRecruitmentItem = (value: number) => {
    router.push(`/employer/recruitment/${value}`);
  };

  return (
    <EmployerRecruitment>
      <RecruitmentStatusBar />
      <div style={{ display: 'flex', justifyContent: 'flex-end', margin: '20px 0' }}>
        <RecruitmentFilterButton label="삭제" margin="0 15px 0 0" />
        <RecruitmentFilterButton label="삭제" margin="0 15px 0 0" />
        <RecruitmentFilterButton label="삭제" />
      </div>

      <RecruitmentTable>
        <RecruitmentTable.Header />
        <RecruitmentTable.Body handleClickRecruitmentItem={handleClickRecruitmentItem} />
      </RecruitmentTable>

      <div>page</div>
    </EmployerRecruitment>
  );
}

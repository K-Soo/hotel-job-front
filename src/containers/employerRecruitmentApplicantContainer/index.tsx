import React from 'react';
import EmployerRecruitmentApplicant from '@/components/employerRecruitmentApplicant';
import SectionTitle from '@/components/common/employer/SectionTitle';
import ApplicantStatusPanel from '@/components/employerRecruitmentApplicant/ApplicantStatusPanel';
import ApplicantTab from '@/components/employerRecruitmentApplicant/ApplicantTab';
import ApplicantTable from '@/components/employerRecruitmentApplicant/ApplicantTable';
import useFetchQuery from '@/hooks/useFetchQuery';
import { Get } from '@/apis';
import queryKeys from '@/constants/queryKeys';
import { keepPreviousData } from '@tanstack/react-query';
import { useRouter } from 'next/router';

export default function EmployerRecruitmentApplicantContainer() {
  const router = useRouter();
  const { slug } = router.query;

  const { data, isLoading, isSuccess } = useFetchQuery({
    queryKey: [queryKeys.RECRUITMENT_LIST],
    queryFn: Get.getRecruitmentDetailApplicantList,
    options: {
      enabled: !!slug,
      throwOnError: true,
      staleTime: 60 * 1000 * 5,
      gcTime: 60 * 1000 * 10,
      placeholderData: keepPreviousData,
    },
    requestQuery: {
      recruitmentId: slug as string,
    },
  });

  console.log('data: ', data);

  return (
    <EmployerRecruitmentApplicant>
      <ApplicantStatusPanel />

      <ApplicantTab />

      <ApplicantTable>
        <ApplicantTable.Header />
        <ApplicantTable.Body />
      </ApplicantTable>
    </EmployerRecruitmentApplicant>
  );
}

import React from 'react';
import EmployerRecruitmentDetailApplicant from '@/components/EmployerRecruitmentDetailApplicant';
import SectionTitle from '@/components/common/employer/SectionTitle';
import ApplicantStatusPanel from '@/components/EmployerRecruitmentDetailApplicant/ApplicantStatusPanel';
import ApplicantTab from '@/components/EmployerRecruitmentDetailApplicant/ApplicantTab';
import ApplicantTable from '@/components/EmployerRecruitmentDetailApplicant/ApplicantTable';
import useFetchQuery from '@/hooks/useFetchQuery';
import { Get } from '@/apis';
import queryKeys from '@/constants/queryKeys';
import { keepPreviousData } from '@tanstack/react-query';
import { useRouter } from 'next/router';

// TODO
export default function EmployerRecruitmentDetailApplicantContainer() {
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

  console.log('지원자 목록 API : ', data);

  return (
    <EmployerRecruitmentDetailApplicant>
      <ApplicantStatusPanel />

      <ApplicantTab />

      <ApplicantTable>
        <ApplicantTable.Header />
        <ApplicantTable.Body data={data?.result} isLoading={isLoading} isSuccess={isSuccess} />
      </ApplicantTable>
    </EmployerRecruitmentDetailApplicant>
  );
}

import React from 'react';
import EmployerRecruitmentDetailApplicant from '@/components/EmployerRecruitmentDetailApplicant';
import SectionTitle from '@/components/common/employer/SectionTitle';
import ApplicantStatusPanel from '@/components/EmployerRecruitmentDetailApplicant/ApplicantStatusPanel';
import ApplicantTab from '@/components/EmployerRecruitmentDetailApplicant/ApplicantTab';
import ApplicantTable from '@/components/EmployerRecruitmentDetailApplicant/ApplicantTable';
import useFetchQuery from '@/hooks/useFetchQuery';
import { Get, Patch } from '@/apis';
import queryKeys from '@/constants/queryKeys';
import { keepPreviousData } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { ParsedUrlQuery } from 'querystring';
import { RecruitmentApplicantQueryStep } from '@/types/API';
import EmptyComponent from '@/components/common/EmptyComponent';
import { EMPLOYER_REVIEW_STAGE_STATUS } from '@/constants/application';
import { EmployerReviewStageStatusKey, ResumeDetail } from '@/types';
import useToast from '@/hooks/useToast';
import { useQueryClient } from '@tanstack/react-query';
import ResumePreview from '@/components/common/resume/ResumePreview';
import { ErrorBoundary, ErrorComponent } from '@/error';

interface Query extends ParsedUrlQuery {
  step?: RecruitmentApplicantQueryStep;
}

// TODO
export default function EmployerRecruitmentDetailApplicantContainer() {
  const [resumePreviewData, setResumePreviewData] = React.useState<ResumeDetail | null>(null);
  const { addToast } = useToast();
  const router = useRouter();
  const { slug, step } = router.query as Query;
  const queryClient = useQueryClient();

  const { data, isLoading, isSuccess } = useFetchQuery({
    queryKey: [queryKeys.RECRUITMENT_LIST, { slug, step }].filter(Boolean),
    queryFn: Get.getRecruitmentDetailApplicantList,
    options: {
      enabled: !!slug,
      throwOnError: true,
      staleTime: 60 * 1000 * 1,
      gcTime: 60 * 1000 * 2,
      placeholderData: keepPreviousData,
    },
    requestQuery: {
      recruitmentId: slug as string,
      step: step ? (step.toLocaleUpperCase() as RecruitmentApplicantQueryStep) : undefined,
    },
  });

  console.log('지원자 목록 API : ', data);

  const handleClickResumePreview = (applicationId: number, isView: boolean, data: ResumeDetail) => {
    setResumePreviewData((prev) => (prev ? null : data));

    if (isView) return;
    fetchApplicationResumeView(applicationId);
  };

  //API - 채용공고 지원자 전형 변경
  const fetchUpdateEmployerReviewStageStatus = React.useCallback(async (id: number, stage: EmployerReviewStageStatusKey) => {
    try {
      const response = await Patch.updateEmployerReviewStageStatus({
        applicationId: id,
        stage,
      });
      console.log('지원자 전형 변경 API : ', response);
      if (response.result.status !== 'success') {
        throw new Error();
      }
      await queryClient.invalidateQueries({ queryKey: [queryKeys.RECRUITMENT_LIST], refetchType: 'all' });
      await queryClient.invalidateQueries({ queryKey: [queryKeys.APPLICATION_RECRUITMENT_STATUS_COUNT], refetchType: 'all' });
      addToast({ type: 'success', message: '전형 상태가 변경되었습니다.\n 전형 변경은 지원자에게 공개되지않습니다.' });
    } catch (error) {
      addToast({ type: 'error', message: '에러가 발생했습니다.' });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //API - 지원자 이력서 열람처리
  const fetchApplicationResumeView = React.useCallback(async (id: number) => {
    try {
      const response = await Patch.updateApplicationResumeView({
        applicationId: id,
      });
      console.log('열람처리 API : ', response);
      if (response.result.status !== 'success') {
        throw new Error();
      }
      await queryClient.invalidateQueries({ queryKey: [queryKeys.RECRUITMENT_LIST], refetchType: 'all' });
    } catch (error) {
      console.log('error: ', error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {resumePreviewData && <ResumePreview resumePreviewData={resumePreviewData} closeResume={() => setResumePreviewData(null)} />}
      <EmployerRecruitmentDetailApplicant>
        <ApplicantStatusPanel />

        <ApplicantTab />

        <ApplicantTable>
          <ApplicantTable.Header />
          {data?.result.length === 0 && <EmptyComponent message="해당 전형에 데이터가 없어요." />}
          <ApplicantTable.Body
            data={data?.result}
            isLoading={isLoading}
            isSuccess={isSuccess}
            fetchUpdateEmployerReviewStageStatus={fetchUpdateEmployerReviewStageStatus}
            handleClickResumePreview={handleClickResumePreview}
          />
        </ApplicantTable>
      </EmployerRecruitmentDetailApplicant>
    </>
  );
}

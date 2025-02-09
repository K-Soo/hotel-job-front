import React from 'react';
import ApplicantTable from '@/components/EmployerRecruitmentDetailApplicant/ApplicantTable';
import useFetchQuery from '@/hooks/useFetchQuery';
import { Get, Patch } from '@/apis';
import queryKeys from '@/constants/queryKeys';
import { keepPreviousData } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { ParsedUrlQuery } from 'querystring';
import { RecruitmentApplicantQueryStep } from '@/types/API';
import EmptyComponent from '@/components/common/EmptyComponent';
import { EmployerReviewStageStatusKey, ResumeDetail } from '@/types';
import useToast from '@/hooks/useToast';
import { useQueryClient } from '@tanstack/react-query';

interface Query extends ParsedUrlQuery {
  step?: RecruitmentApplicantQueryStep;
}

interface ApplicantListContainerProps {
  handleClickResumePreview: (applicationId: number, isView: boolean, data: ResumeDetail) => void;
}

export default function ApplicantListContainer({ handleClickResumePreview }: ApplicantListContainerProps) {
  const [isOpenNoticeForm, setIsOpenNoticeForm] = React.useState(false);
  const [checkedApplicantIds, setCheckedApplicantIds] = React.useState<number[]>([]);

  const router = useRouter();
  const { slug, step } = router.query as Query;

  const queryClient = useQueryClient();
  const { addToast } = useToast();

  const { data, isLoading, isSuccess } = useFetchQuery({
    queryKey: [queryKeys.RECRUITMENT_APPLICANT_LIST, { slug, step }].filter(Boolean),
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
      addToast({ type: 'success', message: '전형변경 완료' });
    } catch (error) {
      addToast({ type: 'error', message: '에러가 발생했습니다.' });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {/* <ApplicantNoticeFormContainer /> */}
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
    </>
  );
}

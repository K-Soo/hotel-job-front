import React from 'react';
import ApplicantTable from '@/components/EmployerRecruitmentDetailApplicant/applicantTable';
import useFetchQuery from '@/hooks/useFetchQuery';
import { Get, Patch } from '@/apis';
import queryKeys from '@/constants/queryKeys';
import { keepPreviousData } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { ParsedUrlQuery } from 'querystring';
import { RecruitmentApplicantQueryStep } from '@/types/API';
import EmptyComponent from '@/components/common/EmptyComponent';
import { EmployerReviewStageStatusKey, RecruitmentDetailApplicantListItem, ResumeDetail } from '@/types';
import useToast from '@/hooks/useToast';
import { useQueryClient } from '@tanstack/react-query';
import { ErrorComponent } from '@/error';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import ApplicantNoticeFormContainer from '@/containers/employerRecruitmentDetailApplicantContainer/ApplicantNoticeFormContainer';

interface Query extends ParsedUrlQuery {
  step?: RecruitmentApplicantQueryStep;
}

interface ApplicantListContainerProps {
  handleClickResumePreview: (item: RecruitmentDetailApplicantListItem) => void;
}

export default function ApplicantListContainer({ handleClickResumePreview }: ApplicantListContainerProps) {
  const [isOpenNoticeForm, setIsOpenNoticeForm] = React.useState(false);
  const [checkedApplicants, setCheckedApplicants] = React.useState<RecruitmentDetailApplicantListItem[]>([]);

  const router = useRouter();
  const { slug, step } = router.query as Query;

  const queryClient = useQueryClient();
  const { addToast } = useToast();

  const { data, isLoading, isSuccess, isError } = useFetchQuery({
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

  React.useEffect(() => {
    setCheckedApplicants([]);
  }, [step]);

  const handleChangeCheckApplicant = React.useCallback(
    (resumeSnapshot: RecruitmentDetailApplicantListItem) => {
      const exist = checkedApplicants.find((item) => item.id === resumeSnapshot.id);

      if (exist) {
        return setCheckedApplicants(checkedApplicants.filter((item) => item.id !== resumeSnapshot.id));
      }

      setCheckedApplicants([...checkedApplicants, resumeSnapshot]);
    },
    [checkedApplicants],
  );

  // 전형 버튼 클릭
  const handleClickNotifyOneApplicant = React.useCallback(
    (resumeSnapshot: RecruitmentDetailApplicantListItem) => {
      const exist = checkedApplicants.find((item) => item.id === resumeSnapshot.id);

      if (exist) {
        return setIsOpenNoticeForm(true);
      }

      setCheckedApplicants([...checkedApplicants, resumeSnapshot]);
      setIsOpenNoticeForm(true);
    },
    [checkedApplicants],
  );

  //API - 채용공고 지원자 전형 변경
  const fetchUpdateEmployerReviewStageStatus = React.useCallback(async (id: number, stage: EmployerReviewStageStatusKey) => {
    try {
      const response = await Patch.updateEmployerReviewStageStatus({ applicationId: id, stage });
      console.log('지원자 전형 변경 API : ', response);
      if (response.result.status !== 'success') {
        throw new Error();
      }
      await queryClient.invalidateQueries({ queryKey: [queryKeys.RECRUITMENT_LIST], refetchType: 'all' });
      await queryClient.invalidateQueries({ queryKey: [queryKeys.APPLICATION_RECRUITMENT_STATUS_COUNT], refetchType: 'all' });
      await queryClient.invalidateQueries({ queryKey: [queryKeys.RECRUITMENT_APPLICANT_LIST], refetchType: 'all' });
      addToast({ type: 'success', message: '전형변경 완료' });
      setCheckedApplicants([]);
    } catch (error) {
      addToast({ type: 'error', message: '에러가 발생했습니다.' });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCloseNoticeForm = React.useCallback(() => setIsOpenNoticeForm(false), []);

  if (isLoading) {
    return (
      <ApplicantTable>
        <ApplicantTable.Header />
        {isLoading && <LoadingSpinner height="250px" />}
      </ApplicantTable>
    );
  }

  if (isError) {
    return (
      <ApplicantTable>
        <ApplicantTable.Header />
        <ErrorComponent visibleBackButton={false} />;
      </ApplicantTable>
    );
  }

  if (isSuccess && data) {
    return (
      <>
        {isOpenNoticeForm && (
          <ApplicantNoticeFormContainer
            handleCloseNoticeForm={handleCloseNoticeForm}
            checkedApplicants={checkedApplicants}
            setCheckedApplicants={setCheckedApplicants}
            recruitmentId={slug as string | undefined}
          />
        )}

        <ApplicantTable>
          <ApplicantTable.Header />
          {data.result.length === 0 && <EmptyComponent message="해당 전형에 데이터가 없어요." />}
          <ApplicantTable.Body
            data={data.result}
            fetchUpdateEmployerReviewStageStatus={fetchUpdateEmployerReviewStageStatus}
            handleClickResumePreview={handleClickResumePreview}
            handleChangeCheckApplicant={handleChangeCheckApplicant}
            checkedApplicants={checkedApplicants}
            handleClickNotifyOneApplicant={handleClickNotifyOneApplicant}
          />
        </ApplicantTable>
      </>
    );
  }
}

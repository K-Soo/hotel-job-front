import React from 'react';
import EmployerRecruitmentDetailApplicant from '@/components/EmployerRecruitmentDetailApplicant';
import ApplicantTab from '@/components/EmployerRecruitmentDetailApplicant/ApplicantTab';
import ApplicantController from '@/components/EmployerRecruitmentDetailApplicant/ApplicantController';
import { RecruitmentDetailApplicantListItem, ResumeDetail } from '@/types';
import ResumePreview from '@/components/common/resume/resumePreview';
import ApplicantListContainer from '@/containers/employerRecruitmentDetailApplicantContainer/ApplicantListContainer';
import ApplicationCountContainer from '@/containers/employerRecruitmentDetailApplicantContainer/ApplicationCountContainer';
import { ErrorBoundary, ErrorComponent } from '@/error';
import { Patch } from '@/apis';
import queryKeys from '@/constants/queryKeys';
import { useQueryClient } from '@tanstack/react-query';
import useToast from '@/hooks/useToast';

export default function EmployerRecruitmentDetailApplicantContainer() {
  const [resumePreviewData, setResumePreviewData] = React.useState<ResumeDetail | null>(null);

  const queryClient = useQueryClient();
  const { addToast } = useToast();

  const handleClickResumePreview = (item: RecruitmentDetailApplicantListItem) => {
    if (item.cancelAt) {
      return addToast({ message: '지원이 취소된 지원자입니다.', type: 'info' });
    }

    setResumePreviewData((prev) => (prev ? null : item.resumeSnapshot));

    // 열람된 경우 API 미 호출
    if (item.isView) return;

    fetchApplicationResumeView(item.id);
  };

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
      await queryClient.invalidateQueries({ queryKey: [queryKeys.RECRUITMENT_APPLICANT_COUNT], refetchType: 'all' });
      await queryClient.invalidateQueries({ queryKey: [queryKeys.RECRUITMENT_APPLICANT_LIST], refetchType: 'all' });
    } catch (error) {
      console.log('error: ', error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {resumePreviewData && <ResumePreview resumePreviewData={resumePreviewData} closeResume={() => setResumePreviewData(null)} />}

      <EmployerRecruitmentDetailApplicant>
        <ApplicationCountContainer />

        <ApplicantTab />

        <ApplicantController />

        <ErrorBoundary fallback={<ErrorComponent visibleBackButton={false} message="지원자 정보를 가져올 수 없습니다." />}>
          <ApplicantListContainer handleClickResumePreview={handleClickResumePreview} />
        </ErrorBoundary>
      </EmployerRecruitmentDetailApplicant>
    </>
  );
}

import React from 'react';
import EmployerRecruitmentDetailApplicant from '@/components/EmployerRecruitmentDetailApplicant';
import ApplicantTab from '@/components/EmployerRecruitmentDetailApplicant/ApplicantTab';
import ApplicantController from '@/components/EmployerRecruitmentDetailApplicant/ApplicantController';
import { ParsedUrlQuery } from 'querystring';
import { RecruitmentApplicantQueryStep } from '@/types/API';
import { ResumeDetail } from '@/types';
import ResumePreview from '@/components/common/resume/resumePreview';
import ApplicantNoticeForm from '@/components/EmployerRecruitmentDetailApplicant/ApplicantNoticeForm';
import ApplicantListContainer from '@/containers/employerRecruitmentDetailApplicantContainer/ApplicantListContainer';
import ApplicationCountContainer from '@/containers/employerRecruitmentDetailApplicantContainer/ApplicationCountContainer';
import { ErrorBoundary, ErrorComponent } from '@/error';
import { Patch } from '@/apis';
import queryKeys from '@/constants/queryKeys';
import { useQueryClient } from '@tanstack/react-query';

interface Query extends ParsedUrlQuery {
  step?: RecruitmentApplicantQueryStep;
}

// TODO
export default function EmployerRecruitmentDetailApplicantContainer() {
  const [resumePreviewData, setResumePreviewData] = React.useState<ResumeDetail | null>(null);

  const queryClient = useQueryClient();

  const handleClickResumePreview = (applicationId: number, isView: boolean, data: ResumeDetail) => {
    setResumePreviewData((prev) => (prev ? null : data));

    if (isView) return;
    fetchApplicationResumeView(applicationId);
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

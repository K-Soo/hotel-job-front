import React from 'react';
import ApplicantNoticeForm from '@/components/EmployerRecruitmentDetailApplicant/ApplicantNoticeForm';

interface ApplicantNoticeFormContainerProps {
  handleCloseNoticeForm: () => void;
}

export default function ApplicantNoticeFormContainer({ handleCloseNoticeForm }: ApplicantNoticeFormContainerProps) {
  return <ApplicantNoticeForm handleCloseNoticeForm={handleCloseNoticeForm} />;
}

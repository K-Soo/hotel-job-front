import React from 'react';
import ApplicantNoticeForm from '@/components/EmployerRecruitmentDetailApplicant/ApplicantNoticeForm';
import { CreateApplicationsAnnouncementForm, RecruitmentDetailApplicantListItem } from '@/types';
import { Post } from '@/apis';
import useLoading from '@/hooks/useLoading';
import useToast from '@/hooks/useToast';
import { ANNOUNCEMENT_MESSAGE } from '@/constants/announcement';
import useAlertWithConfirm from '@/hooks/useAlertWithConfirm';
import { useQueryClient } from '@tanstack/react-query';
import queryKeys from '@/constants/queryKeys';

interface ApplicantNoticeFormContainerProps {
  handleCloseNoticeForm: () => void;
  checkedApplicants: RecruitmentDetailApplicantListItem[];
  setCheckedApplicants: React.Dispatch<React.SetStateAction<RecruitmentDetailApplicantListItem[]>>;
  recruitmentId: string | undefined;
}

export default function ApplicantNoticeFormContainer({
  handleCloseNoticeForm,
  setCheckedApplicants,
  checkedApplicants,
  recruitmentId,
}: ApplicantNoticeFormContainerProps) {
  const [announcementForm, setAnnouncementForm] = React.useState<CreateApplicationsAnnouncementForm>({
    announcementType: 'ACCEPT',
    message: '',
    recipientApplicationIds: [],
    recruitmentId: '',
    reviewStage: 'DOCUMENT',
    title: '',
  });

  const { setLoadingAtomStatue } = useLoading();
  const { addToast } = useToast();
  const { setAlertWithConfirmAtom } = useAlertWithConfirm();
  const queryClient = useQueryClient();

  React.useEffect(() => {
    setAnnouncementForm((prev) => {
      const newMessage = ANNOUNCEMENT_MESSAGE[prev.announcementType][prev.reviewStage];
      return {
        ...prev,
        message: newMessage,
      };
    });
  }, [announcementForm.announcementType, announcementForm.reviewStage]);

  React.useEffect(() => {
    if (checkedApplicants) {
      setAnnouncementForm((prev) => ({
        ...prev,
        recipientApplicationIds: checkedApplicants.map((item) => item.id),
      }));
    }
  }, [checkedApplicants]);

  // API - 지원자 발표
  const fetchApplicationsAnnouncement = async () => {
    if (announcementForm.title.trim().length <= 5) {
      addToast({ message: '발표명을 입력해주세요.(5자 이상)', type: 'error' });
      return;
    }
    setLoadingAtomStatue({ isLoading: true });
    // 발표가 완료되었습니다. 인원에 대한 전형 이동을 진행하시겠습니까?
    try {
      const response = await Post.createApplicationsAnnouncement({
        ...announcementForm,
        recruitmentId: recruitmentId as string,
      });
      console.log('response: ', response);
      await queryClient.invalidateQueries({ queryKey: [queryKeys.RECRUITMENT_LIST], refetchType: 'all' });
      await queryClient.invalidateQueries({ queryKey: [queryKeys.APPLICATION_RECRUITMENT_STATUS_COUNT], refetchType: 'all' });
      await queryClient.invalidateQueries({ queryKey: [queryKeys.RECRUITMENT_APPLICANT_LIST], refetchType: 'all' });
      addToast({ message: '발표가 성공적으로 전달되었습니다.', type: 'success' });
      handleCloseNoticeForm();
    } catch (error) {
      addToast({ message: '오류가 발생했습니다.', type: 'error' });
    } finally {
      setLoadingAtomStatue({ isLoading: false });
      setCheckedApplicants([]);
    }
  };

  const handleChangeAnnouncementForm = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const { name, value } = event.target;
      setAnnouncementForm((prev) => ({ ...prev, [name]: value }));
    },
    [],
  );

  const handleClickAnnouncementType = React.useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    const { name, value } = event.currentTarget;

    setAnnouncementForm((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleClickApplicationAnnouncement = React.useCallback(() => {
    setAlertWithConfirmAtom((prev) => ({
      ...prev,
      type: 'CONFIRM',
      title: 'TITLE_10',
      subTitle: 'DESC_11',
      cancelLabel: '취소',
      confirmLabel: '확인',
      onClickConfirm: () => fetchApplicationsAnnouncement(),
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchApplicationsAnnouncement]);

  return (
    <ApplicantNoticeForm
      announcementForm={announcementForm}
      checkedApplicants={checkedApplicants}
      handleCloseNoticeForm={handleCloseNoticeForm}
      handleChangeAnnouncementForm={handleChangeAnnouncementForm}
      handleClickAnnouncementType={handleClickAnnouncementType}
      fetchApplicationsAnnouncement={fetchApplicationsAnnouncement}
      handleClickApplicationAnnouncement={handleClickApplicationAnnouncement}
    />
  );
}

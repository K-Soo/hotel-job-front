import React from 'react';
import EmployerAccountWithdraw from '@/components/employerAccountWithdraw';
import Button from '@/components/common/style/Button';
import useAlertWithConfirm from '@/hooks/useAlertWithConfirm';
import useLoading from '@/hooks/useLoading';
import { Get } from '@/apis';
import CertificationVerifyModal from '@/components/common/certification/CertificationVerifyModal';

export type ConsentFormType = {
  rejoinRestriction: boolean;
  dataDeletion: boolean;
  accountRecovery: boolean;
};

const INITIAL_CONSENT_FORM = {
  rejoinRestriction: false,
  dataDeletion: false,
  accountRecovery: false,
};

export default function EmployerAccountWithdrawContainer() {
  const [progressRecruitmentCount, setProgressRecruitmentCount] = React.useState<number | null>(null);
  const [consentForm, setConsentForm] = React.useState<ConsentFormType>(INITIAL_CONSENT_FORM);
  const [isOpenCertificationWithdrawModal, setIsOpenCertificationWithdrawModal] = React.useState(false);
  const [isSuccessAuth, setIsSuccessAuth] = React.useState(false);

  const { setLoadingAtomStatue } = useLoading();
  const { setAlertWithConfirmAtom } = useAlertWithConfirm();

  const isDisabled = React.useMemo(() => {
    return Object.values(consentForm).some((value) => !value);
  }, [consentForm]);

  const {} = useAlertWithConfirm();

  React.useEffect(() => {
    const fetchRecruitmentStatusCount = async () => {
      try {
        const response = await Get.recruitmentStatusCount();
        setProgressRecruitmentCount(response.result.PROGRESS);
      } catch (error) {
        console.log('error: ', error);
      }
    };

    fetchRecruitmentStatusCount();
  }, []);

  const handleChangeConsent = React.useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const { name } = event.target;

    setConsentForm((prev) => ({ ...prev, [name]: !prev[name as keyof ConsentFormType] }));
  }, []);

  const handleClickEmployerWithdraw = () => {
    if (progressRecruitmentCount === null) {
      return alert('채용공고 정보를 불러올수 없습니다. 잠시 후 다시 시도해주세요.');
    }

    if (progressRecruitmentCount !== 0) {
      // return alert('진행중인 채용공고가 있습니다. 채용공고를 모두 마감 후 진행 해주세요.');
    }

    setAlertWithConfirmAtom((prev) => ({
      ...prev,
      type: 'CONFIRM',
      title: 'TITLE_19',
      subTitle: 'DESC_14',
      confirmLabel: '본인인증',
      cancelLabel: '취소',
      onClickConfirm: () => setIsOpenCertificationWithdrawModal(true),
    }));
  };

  const fetchEmployerWithdraw = async () => {
    try {
      alert('탈퇴되었습니다.');
    } catch (error) {}
  };

  const onCertificationSuccess = () => {
    setIsSuccessAuth(true);
    setAlertWithConfirmAtom((prev) => ({
      ...prev,
      type: 'CONFIRM',
      confirmVariant: 'delete',
      title: 'TITLE_20',
      confirmLabel: '탈퇴',
      cancelLabel: '취소',
      onClickConfirm: async () => await fetchEmployerWithdraw(),
    }));
  };

  return (
    <>
      {isOpenCertificationWithdrawModal && (
        <CertificationVerifyModal
          handleCloseModal={() => setIsOpenCertificationWithdrawModal(false)}
          onCertificationSuccess={onCertificationSuccess}
        />
      )}

      <EmployerAccountWithdraw consentForm={consentForm} handleChangeConsent={handleChangeConsent}>
        <Button
          label="회원 탈퇴"
          variant="primary"
          margin="0 0 20px 0"
          maxWidth="300px"
          onClick={() => handleClickEmployerWithdraw()}
          disabled={isDisabled}
          isLoading={false}
        />
      </EmployerAccountWithdraw>
    </>
  );
}

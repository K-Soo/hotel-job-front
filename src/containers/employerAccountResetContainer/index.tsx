import React from 'react';
import EmployerAccountReset from '@/components/employerAccountReset';
import ChoiceCertificationForm from '@/components/employerAccountReset/ChoiceCertificationForm';
import ChangePasswordForm from '@/components/employerAccountReset/ChangePasswordForm';
import SectionTitle from '@/components/common/employer/SectionTitle';
import dynamic from 'next/dynamic';
import { useForm, FormProvider, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { schema } from '@/utils';
import { Post, Patch } from '@/apis';
import { EmployerAccountResetForm } from '@/types';
import useLoading from '@/hooks/useLoading';
import useAlertWithConfirm from '@/hooks/useAlertWithConfirm';

const DynamicNoSSRCertificationVerifyModal = dynamic(() => import('@/components/common/certification/CertificationVerifyModal'), {
  ssr: false,
});

export default function EmployerAccountResetContainer() {
  const [step, setStep] = React.useState('START');
  const [isOpenResetPasswordModal, setIsOpenResetPasswordModal] = React.useState(false);
  const { setLoadingAtomStatue } = useLoading();
  const { setAlertWithConfirmAtom } = useAlertWithConfirm();

  const methods = useForm<EmployerAccountResetForm>({
    resolver: yupResolver(schema.accountResetSchema),
    disabled: false,
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      newPasswordConfirm: '',
    },
  });

  const handleOpenResetPasswordModal = () => setIsOpenResetPasswordModal(true);

  const handleCloseModal = () => setIsOpenResetPasswordModal(false);

  const onCertificationSuccess = () => {
    setStep('CHANGE_PASSWORD');
    handleCloseModal();
  };

  const onSubmit: SubmitHandler<EmployerAccountResetForm> = async (data) => {
    setLoadingAtomStatue({ isLoading: true });

    try {
      const response = await Patch.employerAccountReset({
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
      });

      console.log('비밀번호 변경 API : ', response);

      if (response.result.status === 'failure') {
        alert('현재 비밀번호가 일치하지 않습니다.');
        return;
      }

      if (response.result.status !== 'success') {
        throw new Error();
      }

      setAlertWithConfirmAtom((prev) => ({
        ...prev,
        type: 'ALERT',
        onClickConfirm: () => {
          setStep('START');
          methods.reset();
        },
        confirmLabel: '확인',
        title: 'TITLE_13',
      }));
    } catch (error) {
      alert('비밀번호 변경에 실패했습니다.');
    } finally {
      setLoadingAtomStatue({ isLoading: false });
    }
  };

  return (
    <EmployerAccountReset>
      {isOpenResetPasswordModal && (
        <DynamicNoSSRCertificationVerifyModal handleCloseModal={handleCloseModal} onCertificationSuccess={onCertificationSuccess} />
      )}

      {step === 'START' && <ChoiceCertificationForm handleOpenResetPasswordModal={handleOpenResetPasswordModal} />}

      {step === 'CHANGE_PASSWORD' && (
        <FormProvider {...methods}>
          <ChangePasswordForm onSubmit={onSubmit} />
        </FormProvider>
      )}
    </EmployerAccountReset>
  );
}

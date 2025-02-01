import React from 'react';
import EmployerSetupCompany from '@/components/employerSetupCompany';
import { useForm, FormProvider, SubmitHandler } from 'react-hook-form';
import { schema } from '@/utils';
import { yupResolver } from '@hookform/resolvers/yup';
import { SetupCompanyForm } from '@/types';
import FormDevTools from '@/components/common/FormDevTools';
import ManagerInfoForm from '@/components/employerSetupCompany/ManagerInfoForm';
import BusinessInfoForm from '@/components/employerSetupCompany/BusinessInfoForm';
import BusinessNumberForm from '@/components/employerSetupCompany/BusinessNumberForm';
import Button from '@/components/common/style/Button';
import { daumPostAtom } from '@/recoil/daumPost';
import dynamic from 'next/dynamic';
import { useRecoilValue } from 'recoil';
import { Post } from '@/apis';
import useAlertWithConfirm from '@/hooks/useAlertWithConfirm';
import path from '@/constants/path';
import { useQueryClient } from '@tanstack/react-query';
import queryKeys from '@/constants/queryKeys';
import CertificationModal from '@/components/common/CertificationModal';
import { useRecoilState } from 'recoil';
import { certificationModalAtom } from '@/recoil/certification';

const DynamicDaumPost = dynamic(() => import('@/components/common/DaumPost'), { ssr: false });

export default function EmployerSetupCompanyContainer() {
  const [step, setStep] = React.useState<'step1' | 'step2' | 'step3'>('step1');
  const [submitCount, setSubmitCount] = React.useState<number>(0);
  const [isSuccessVerified, setIsSuccessVerified] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState<boolean>(false);

  const [certificationModalAtomState, setCertificationModalAtomState] = useRecoilState(certificationModalAtom);

  const queryClient = useQueryClient();
  const daumPostAtomValue = useRecoilValue(daumPostAtom);
  const { setAlertWithConfirmAtom } = useAlertWithConfirm();

  const methods = useForm<SetupCompanyForm>({
    resolver: yupResolver(schema.setupCompanyForm),
    mode: 'onSubmit',
    reValidateMode: 'onChange',

    defaultValues: {
      businessRegistrationNumber: '',
      companyName: '',
      businessOwner: '',

      address: '',
      addressDetail: '',

      managerEmail: '',
      managerName: '',
      managerNumber: '',
    },
  });

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      if (step === 'step1') {
        handleClickBusinessNumberForm();
      }
      if (step === 'step2') {
        handleClickBusinessInfoForm();
      }
    }
  };

  // step 1
  const handleClickBusinessNumberForm = async () => {
    // 사업자 번호 인증 완료
    if (isSuccessVerified) {
      setSubmitCount(0);
      return setStep('step2');
    }

    // 요청 횟수 증가 및 제한 검사

    if (submitCount >= 3) {
      alert('사업자 번호 인증 요청 횟수 많습니다. 새로고침 후 다시 시도해주세요.');
      return;
    }

    // 사용자 입력 필드 검증
    const valid = await methods.trigger(['businessRegistrationNumber', 'companyName']);
    if (!valid) {
      const firstErrorField = Object.keys(methods.formState.errors)[0];
      methods.setFocus(firstErrorField as keyof SetupCompanyForm);
      return;
    }

    try {
      setLoading(true);

      const requestData = {
        b_no: methods.getValues('businessRegistrationNumber'),
      };
      const response = await Post.businessNumberCheck(requestData);
      console.log('사업자 인증 AP : ', response);

      if (response.result.status === 'duplicate') {
        throw new Error('이미 등록된 사업자 번호입니다.');
      }

      if (response.result.status === 'failure') {
        throw new Error('등록되지 않은 사업자 번호입니다.');
      }
      setIsSuccessVerified(true);
      setSubmitCount(0);
      setStep('step2');
    } catch (error) {
      setSubmitCount((prev) => prev + 1);
      if (error instanceof Error) {
        return methods.setError('businessRegistrationNumber', { message: error.message });
      }
      alert('서버에서 문제가 발생했습니다. 잠시 후 다시 시도해주세요.');
    } finally {
      setLoading(false);
    }
  };

  // step 2
  const handleClickBusinessInfoForm = async () => {
    try {
      const valid = await methods.trigger(['businessOwner', 'address', 'addressDetail']);
      if (!valid) return;

      setStep('step3');
    } catch (error) {
      console.log('error: ', error);
    }
  };

  const onSubmit: SubmitHandler<SetupCompanyForm> = async (data) => {
    try {
      const response = await Post.setupCompany(data);
      console.log('회사정보 등록 API : ', response);
      if (!response.success) {
        throw new Error();
      }
      if (response.result.status === 'duplicate') {
        alert('이미 등록된 회사정보입니다.');
        window.location.reload();
        return;
      }
      await queryClient.invalidateQueries({ queryKey: [queryKeys.AUTH_ME] });

      await queryClient.invalidateQueries({ queryKey: [queryKeys.REFRESH_COOKIE] });

      // 데이터 강제 요청 및 대기
      // await queryClient.ensureQueryData({ queryKey: [queryKeys.AUTH_ME] });

      setAlertWithConfirmAtom((prev) => ({
        ...prev,
        type: 'ALERT',
        title: 'TITLE_2',
        subTitle: 'DESC_2',
        confirmLabel: '확인',
        onClickConfirm: () => window.location.replace(path.EMPLOYER),
      }));
    } catch (error) {
      alert('회사정보 등록에 실패했습니다.');
      window.location.reload();
    }
  };

  return (
    <FormProvider {...methods}>
      {daumPostAtomValue.isOpen && <DynamicDaumPost />}
      {/* {certificationModalAtomState.isOpen && <CertificationModal />} */}
      {/* <button onClick={() => setCertificationModalAtomState({ isOpen: true })}>인증</button> */}
      <EmployerSetupCompany onSubmit={onSubmit} handleKeyDown={handleKeyDown}>
        {step === 'step1' && (
          <BusinessNumberForm>
            <Button
              label="다음"
              variant="primary"
              width="100px"
              height="40px"
              onClick={handleClickBusinessNumberForm}
              isLoading={loading}
            />
          </BusinessNumberForm>
        )}

        {step === 'step2' && (
          <BusinessInfoForm>
            <Button label="다음" variant="primary" width="100px" height="40px" onClick={handleClickBusinessInfoForm} />
          </BusinessInfoForm>
        )}

        {step === 'step3' && (
          <ManagerInfoForm>
            <Button label="이전" variant="secondary" width="100px" height="40px" onClick={() => setStep('step2')} margin="0 15px 0 0" />
            <Button label="등록" variant="primary" width="100px" height="40px" type="submit" isLoading={methods.formState.isSubmitting} />
          </ManagerInfoForm>
        )}
      </EmployerSetupCompany>
      <FormDevTools {...methods} />
    </FormProvider>
  );
}

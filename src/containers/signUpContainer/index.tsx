import React from 'react';
import SignUp from '@/components/signUp';
import { useForm, FormProvider, SubmitHandler } from 'react-hook-form';
import { schema } from '@/utils';
import { yupResolver } from '@hookform/resolvers/yup';
import { SignUpForm } from '@/types';
import FormDevTools from '@/components/common/FormDevTools';
import SignUpGeneralForm from '@/components/signUp/SignUpGeneralForm';
import SignUpCompleteForm from '@/components/signUp/SignUpCompleteForm';
import { Post, Auth } from '@/apis';
import useAuth from '@/hooks/useAuth';
import dynamic from 'next/dynamic';
import Modal from '@/components/common/modal';
import PolicyTerms from '@/components/policyTerms';
import PolicyPrivacy from '@/components/policyPrivacy';
import { errorCode } from '@/error/errorCode';

const DynamicNoSSRModal = dynamic(() => import('@/components/common/modal'), { ssr: false });

export default function SignUpContainer() {
  const [step, setStep] = React.useState('STEP_1');
  const [selectedPolicy, setSelectedPolicy] = React.useState<'PERSONAL' | 'SERVICE' | null>(null);

  const { setAuthAtomState } = useAuth();

  const methods = useForm<SignUpForm>({
    resolver: yupResolver(schema.signUpSchema),
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    disabled: false,
    defaultValues: {
      userId: '',
      password: '',
      passwordConfirm: '',

      ageAgree: false,
      personalInfoAgree: false,
      serviceTermsAgree: false,
      smsMarketingAgree: false,
      emailMarketingAgree: false,

      userIdAvailableState: false,
    },
  });

  React.useEffect(() => {
    const userIdValue = methods.getValues('userId');
    if (userIdValue) {
      methods.setValue('userIdAvailableState', false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [methods.watch('userId')]);

  // 회원가입 API
  const onSubmit: SubmitHandler<SignUpForm> = async (data) => {
    if (!methods.getValues('userIdAvailableState')) {
      methods.setError('userId', { type: 'custom', message: '아이디 중복체크를 해주세요.' });
      return;
    }

    const requestData = {
      userId: data.userId,
      password: data.password,

      ageAgree: data.ageAgree,
      personalInfoAgree: data.personalInfoAgree,
      serviceTermsAgree: data.serviceTermsAgree,
      smsMarketingAgree: data.smsMarketingAgree,
      emailMarketingAgree: data.emailMarketingAgree,
    };
    try {
      const response = await Auth.signUpEmployer(requestData);
      setAuthAtomState({
        ...response.result,
        status: 'AUTHENTICATED',
      });
      setStep('STEP_2');
    } catch (error: any) {
      const responseErrorCode = error.response?.data?.error?.code;
      if (responseErrorCode === errorCode.ALREADY_EXISTS) {
        alert('이미 존재하는 아이디입니다.');
        return;
      }
      alert('회원가입 중 오류가 발생했습니다.');
    }
  };

  // 아이디 중복 체크 API
  const fetchEmployerUserIdCheck = React.useCallback(async () => {
    try {
      const valid = await methods.trigger('userId');
      if (!valid) return;

      if (methods.getValues('userIdAvailableState')) {
        // 이미 사용 가능한 상태일 경우에도 에러 메시지를 유지
        methods.setError('userId', { type: 'available', message: '사용 가능한 아이디입니다.' });
        return;
      }

      const response = await Post.verificationsEmployerUserId({ userId: methods.getValues('userId') });
      console.log('아이디 체크 API : ', response);
      if (response.result.status === 'duplicate') {
        methods.setError('userId', { type: 'duplicate', message: '이미 사용중인 아이디입니다.' });
        methods.resetField('userId', { keepError: true });
        methods.setFocus('userId');
        return;
      }

      methods.setError('userId', { type: 'available', message: '사용 가능한 아이디입니다.' });
      methods.setValue('userIdAvailableState', true);
    } catch (error) {
      alert('아이디 중복 체크 중 오류가 발생했습니다.');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 전체 동의 체크박스
  const handleChangeAllAgree = React.useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = event.target;
    if (!checked) {
      methods.setValue('ageAgree', false);
      methods.setValue('personalInfoAgree', false);
      methods.setValue('serviceTermsAgree', false);
      methods.setValue('smsMarketingAgree', false);
      methods.setValue('emailMarketingAgree', false);
      return;
    }
    methods.setValue('ageAgree', true);
    methods.setValue('personalInfoAgree', true);
    methods.setValue('serviceTermsAgree', true);
    methods.setValue('smsMarketingAgree', true);
    methods.setValue('emailMarketingAgree', true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleOpenPolicy = React.useCallback((value: string) => {
    if (value === 'serviceTermsAgree') {
      setSelectedPolicy('SERVICE');
    }
    if (value === 'personalInfoAgree') {
      setSelectedPolicy('PERSONAL');
    }
  }, []);

  return (
    <>
      {selectedPolicy !== null && (
        <DynamicNoSSRModal handleCloseModal={() => setSelectedPolicy(null)}>
          <Modal.Header
            title={selectedPolicy === 'SERVICE' ? '서비스 이용약관' : '개인정보 처리방침'}
            handleCloseModal={() => setSelectedPolicy(null)}
          />
          <Modal.Content>
            {selectedPolicy === 'SERVICE' && <PolicyTerms />}
            {selectedPolicy === 'PERSONAL' && <PolicyPrivacy />}
          </Modal.Content>
        </DynamicNoSSRModal>
      )}

      <FormProvider {...methods}>
        <SignUp onSubmit={onSubmit}>
          {step === 'STEP_1' && (
            <SignUpGeneralForm
              handleChangeAllAgree={handleChangeAllAgree}
              fetchEmployerUserIdCheck={fetchEmployerUserIdCheck}
              handleOpenPolicy={handleOpenPolicy}
            />
          )}
          {step === 'STEP_2' && <SignUpCompleteForm />}
        </SignUp>
        <FormDevTools control={methods.control} />
      </FormProvider>
    </>
  );
}

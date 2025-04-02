import React from 'react';
import RecoverAccount from '@/components/recoverAccount';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, FormProvider, SubmitHandler } from 'react-hook-form';
import { Post } from '@/apis';
import { schema } from '@/utils';
import { EmployerAccountVerificationForm } from '@/types';
import useAlertWithConfirm from '@/hooks/useAlertWithConfirm';
import { EmailVerificationRequest } from '@/types/API';
import useLoading from '@/hooks/useLoading';
import { useRouter } from 'next/router';

export default function RecoverAccountContainer() {
  const [accountType, setAccountType] = React.useState<'email' | 'phone'>('email');

  const { setAlertWithConfirmAtom } = useAlertWithConfirm();
  const { setLoadingAtomStatue } = useLoading();
  const router = useRouter();

  const methods = useForm<EmployerAccountVerificationForm>({
    resolver: yupResolver(schema.employerAccountVerificationSchema),
    disabled: false,
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    defaultValues: {
      userName: '',
      email: '',
    },
  });

  React.useEffect(() => {
    const channel = new BroadcastChannel('email-verify');
    channel.onmessage = (event) => {
      const { type, message } = event.data || {};

      if (type === 'email-verify' && message?.redirect) {
        setLoadingAtomStatue({ isLoading: false });
        router.push(message.redirect);
      }
    };

    return () => {
      channel.close();
    };
  }, []);

  const handleAccountTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAccountType(event.target.value as 'email' | 'phone');
    methods.setValue('userName', '');
    methods.setValue('email', '');
  };

  const fetchEmailVerificationRequest = async ({ userName, email, redirect }: EmailVerificationRequest) => {
    setLoadingAtomStatue({ isLoading: true, message: '' });

    try {
      const response = await Post.emailVerification({ userName, email, redirect });
      console.log('이메일 인증 API : ', response);

      if (response.result.status !== 'success') {
        throw new Error();
      }

      setAlertWithConfirmAtom((prev) => ({
        ...prev,
        title: 'TITLE_24',
        type: 'ALERT',
        confirmLabel: '확인',
      }));

      setLoadingAtomStatue((prev) => ({
        ...prev,
        message: '이메일을 확인하고 인증 링크를 클릭해주세요. \n 인증이 완료되면 자동으로 이동합니다.',
      }));
    } catch (error) {
      setLoadingAtomStatue({ isLoading: false, message: '' });
      throw error;
    }
  };

  const onSubmit: SubmitHandler<EmployerAccountVerificationForm> = async (data) => {
    try {
      const response = await Post.employerAccountVerification({ userName: data.userName, email: data.email });
      console.log('유저정보 찾기 API : ', response);

      if (response.result.status === 'not_found') {
        setAlertWithConfirmAtom((prev) => ({
          ...prev,
          subTitle: 'DESC_17',
          type: 'ALERT',
          confirmLabel: '확인',
        }));
        return;
      }

      if (response.result.status !== 'success') {
        throw new Error();
      }

      const requestData = {
        userName: data.userName,
        email: data.email,
        redirect: '/recover/account/success',
      };

      await fetchEmailVerificationRequest(requestData);
    } catch (error) {
      alert('예상치 못한 에러가 발생 했습니다. 잠시 후 다시 시도해주세요.');
    }
  };

  return (
    <FormProvider {...methods}>
      <RecoverAccount onSubmit={onSubmit} accountType={accountType} handleAccountTypeChange={handleAccountTypeChange} />
    </FormProvider>
  );
}

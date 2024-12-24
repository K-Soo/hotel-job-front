import React from 'react';
import SignIn from '@/components/signIn';
import Logo from '@/components/common/Logo';
import SignInTabs from '@/components/signIn/SignInTabs';
import { signInTabsOptions } from '@/constants/tabs';
import { useForm, FormProvider, SubmitHandler } from 'react-hook-form';
import { SignInForm } from '@/types';
import { schema } from '@/utils';
import { yupResolver } from '@hookform/resolvers/yup';
import FormDevTools from '@/components/common/FormDevTools';
import CompanyForm from '@/components/signIn/CompanyForm';
import GeneralForm from '@/components/signIn/GeneralForm';
import { Post } from '@/apis';
import useAuth from '@/hooks/useAuth';

type SignInTab = 'general' | 'company';

export default function SignInContainer() {
  const [tab, setTab] = React.useState<SignInTab>('general');
  const [isSubmitError, setIsSubmitError] = React.useState(false);

  const { setAuthAtomState } = useAuth();

  const methods = useForm<SignInForm>({
    resolver: yupResolver(schema.signInSchema),
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    defaultValues: {
      userId: '',
      password: '',
    },
  });

  React.useEffect(() => {
    if (methods.formState) {
      setIsSubmitError(false);
    }
    console.log('methods.formState.isValid: ', methods.formState.isValid);
  }, [methods]);

  const onSubmit: SubmitHandler<SignInForm> = async (data) => {
    try {
      const response = await Post.signIn({ userId: data.userId, password: data.password });
      console.log('로그인 API : ', response);
      if (!response.success) {
        throw new Error();
      }
      setAuthAtomState({
        provider: response.result.provider,
        role: response.result.role,
        status: 'AUTHENTICATED',
      });
    } catch (error) {
      console.log('error: ', error);
      setIsSubmitError(true);
    } finally {
    }
  };

  React.useEffect(() => {
    methods.clearErrors();
    setIsSubmitError(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tab]);

  return (
    <SignIn>
      <FormProvider {...methods}>
        <Logo size="middle" margin="0 0 30px 0" />
        <SignInTabs<SignInTab> margin="0 0 30px 0" currentTab={tab} setTab={setTab} tabsOptions={signInTabsOptions} />
        {tab === 'general' && <GeneralForm />}
        {tab === 'company' && <CompanyForm onSubmit={onSubmit} isSubmitError={isSubmitError} />}
        <FormDevTools control={methods.control} />
      </FormProvider>
    </SignIn>
  );
}

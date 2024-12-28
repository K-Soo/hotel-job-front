import React from 'react';
import SignIn from '@/components/signIn';
import Logo from '@/components/common/Logo';
import { signInTabsOptions } from '@/constants/tabs';
import { useForm, FormProvider, SubmitHandler } from 'react-hook-form';
import { SignInForm } from '@/types';
import { schema } from '@/utils';
import { yupResolver } from '@hookform/resolvers/yup';
import FormDevTools from '@/components/common/FormDevTools';
import Tabs from '@/components/common/Tabs';
import CompanyForm from '@/components/signIn/CompanyForm';
import GeneralForm from '@/components/signIn/GeneralForm';
import { Post } from '@/apis';
import useAuth from '@/hooks/useAuth';
import { ParsedUrlQuery } from 'querystring';
import { useRouter } from 'next/router';
import path from '@/constants/path';
import dynamic from 'next/dynamic';
import environment from '@/environment';

const DynamicCompanyForm = dynamic(() => import('@/components/signIn/CompanyForm'), { ssr: false });
const DynamicGeneralForm = dynamic(() => import('@/components/signIn/GeneralForm'), { ssr: false });

type SignInTab = 'general' | 'company';

export interface UrlQuery extends ParsedUrlQuery {
  type?: SignInTab;
}

export default function SignInContainer() {
  const [isSubmitError, setIsSubmitError] = React.useState(false);
  const [previousData, setPreviousData] = React.useState<SignInForm | null>(null);

  const router = useRouter();
  const { type = 'general' } = router.query as UrlQuery;

  const { setAuthAtomState } = useAuth();

  const methods = useForm<SignInForm>({
    resolver: yupResolver(schema.signInSchema),
    disabled: false,
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    defaultValues: {
      userId: environment.isLocal ? 'kanabun102' : '',
      password: environment.isLocal ? '@@EErr1234' : '',
    },
  });

  console.log('dirtyFields: ', methods.formState.dirtyFields);
  console.log('validatingFields: ', methods.formState.validatingFields);
  console.log('disabled: ', methods.formState.isSubmitting);

  React.useEffect(() => {
    if (methods.formState.submitCount > 5) {
      methods.clearErrors();
      methods.reset();
      setIsSubmitError(false);
      alert('5회 이상 로그인 시도를 하셨습니다.');
    }
  }, [methods.formState.submitCount]);

  React.useEffect(() => {
    if (methods.formState) {
      setIsSubmitError(false);
    }
  }, [methods]);

  const onSubmit: SubmitHandler<SignInForm> = async (data) => {
    try {
      const response = await Post.signIn({ userId: data.userId, password: data.password });
      console.log('로그인 API : ', response);
      if (!response.success) {
        throw new Error();
      }
      setAuthAtomState({
        ...response.result,
        status: 'AUTHENTICATED',
      });
      router.push(path.EMPLOYER);
    } catch (error) {
      console.log('error: ', error);
      methods.setValue('password', '');
      setIsSubmitError(true);
    } finally {
    }
  };

  React.useEffect(() => {
    methods.clearErrors();
    setIsSubmitError(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type]);

  return (
    <SignIn>
      <FormProvider {...methods}>
        <Logo size="middle" margin="0 0 30px 0" />
        <Tabs margin="0 0 30px 0" tabsOptions={signInTabsOptions} />
        {type === 'general' && <DynamicGeneralForm />}
        {type === 'company' && <DynamicCompanyForm onSubmit={onSubmit} isSubmitError={isSubmitError} />}
        <FormDevTools control={methods.control} />
      </FormProvider>
    </SignIn>
  );
}

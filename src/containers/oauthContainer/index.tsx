import React from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { useSetRecoilState } from 'recoil';
import Layout, { Main } from '@/components/layout';
import { OAuth } from '@/apis';
import OauthSignUpForm from '@/components/common/OauthSignUpForm';
import path from '@/constants/path';
import useAppRouter from '@/hooks/useAppRouter';
import { loadingAtom } from '@/recoil/loading';
import useAuth from '@/hooks/useAuth';
import { ParsedUrlQuery } from 'querystring';
import LoadingOverlay from '@/components/common/LoadingOverlay';
import Portal from '@/components/common/Portal';
import { url } from '@/constants/oauth';
import { useForm, FormProvider, SubmitHandler } from 'react-hook-form';
import { schema } from '@/utils';
import { yupResolver } from '@hookform/resolvers/yup';
import { OAuthSignInForm } from '@/types';
import FormDevTools from '@/components/common/FormDevTools';
import { errorMessages, getErrorCode, errorCode } from '@/error';

export interface UrlQuery extends ParsedUrlQuery {
  code: string;
  state: string;
}

interface OauthContainerProps {
  oauth: 'kakao' | 'google';
}

export default function OauthContainer({ oauth }: OauthContainerProps) {
  const [status, setStatus] = React.useState('IDLE');
  const { setAuthAtomState } = useAuth();
  const router = useRouter();
  const query = router.query as UrlQuery;

  const setLoadingAtom = useSetRecoilState(loadingAtom);
  const { replace } = useAppRouter();

  const methods = useForm<OAuthSignInForm>({
    resolver: yupResolver(schema.oauthSignInSchema),
    mode: 'onSubmit',
    reValidateMode: 'onChange',

    defaultValues: {
      code: '',
      requestType: 'signIn',

      ageAgree: false,
      personalInfoAgree: false,
      serviceTermsAgree: false,

      smsMarketingAgree: false,
      emailMarketingAgree: false,
    },
  });

  // 초기 진입시 작동
  React.useEffect(() => {
    if (router.isReady) {
      const decoded = decodeURIComponent(query.state);
      if (decoded === 'undefined') {
        alert('잘못된 접근입니다.');
        window.location.href = path.SIGN_IN;
        return;
      }

      const restoredState = JSON.parse(decoded);
      console.log('restoredState: ', restoredState);

      methods.setValue('code', query.code ?? '');
      methods.setValue('requestType', restoredState.requestType ?? 'signIn');

      methods.setValue('ageAgree', restoredState.ageAgree ?? false);
      methods.setValue('serviceTermsAgree', restoredState.serviceTermsAgree ?? false);
      methods.setValue('personalInfoAgree', restoredState.personalInfoAgree ?? false);

      methods.setValue('smsMarketingAgree', restoredState.serviceTermsAgree ?? false);
      methods.setValue('emailMarketingAgree', restoredState.emailMarketingAgree ?? false);

      setStatus('EXIST');
    }
  }, [query.state, router.isReady]);

  const handleInitialOAuthSignIn = async () => {
    setLoadingAtom({ isLoading: true });

    const requestBody = methods.getValues();

    if (!requestBody.code) {
      return;
    }
    try {
      const response = await OAuth[oauth](requestBody);
      console.log('카카오 로그인 API : ', response);

      if (!response.success) {
        throw new Error();
      }
      setAuthAtomState({
        ...response.result,
        status: 'AUTHENTICATED',
      });
      replace(path.HOME);
    } catch (error: any) {
      console.error('oauth error: ', error?.response?.data);
      const customErrorcode = getErrorCode(error);

      if (customErrorcode === errorCode.OAUTH_SIGN_IN_NOT_FOUND_USER) {
        methods.setValue('requestType', 'signUp');
        return;
      }

      // 계정 권한 에러
      if (customErrorcode) {
        const accountErrorMessage = errorMessages[customErrorcode];
        if (accountErrorMessage) {
          alert(accountErrorMessage);
          window.location.href = path.SIGN_IN;
          return;
        }
      }

      alert('로그인에 실패했습니다. 다시 시도해주세요.');
      window.location.href = path.SIGN_IN;
    } finally {
      setLoadingAtom({ isLoading: false });
    }
  };

  React.useEffect(() => {
    if (router.isReady && router.query.code && status !== 'IDLE') {
      handleInitialOAuthSignIn();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.isReady, router.query.code, status]);

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

  // 회원가입 API
  // 같은 code값으로 다시 요청을 보내면 카카오에서 에러를 발생시켜서 카카오 서버로 재요청
  const onSubmit: SubmitHandler<OAuthSignInForm> = async (data, event) => {
    event?.preventDefault();
    const state = encodeURIComponent(JSON.stringify(data));
    const authUpperCase = oauth.toUpperCase() as 'KAKAO' | 'GOOGLE';
    const baseUrl = url[authUpperCase] + `&state=${state}`;
    window.location.href = baseUrl;
  };

  if (status === 'IDLE') {
    return (
      <Portal>
        <LoadingOverlay />
      </Portal>
    );
  }

  if (methods.watch('requestType') === 'signUp') {
    return (
      <FormProvider {...methods}>
        <OauthSignUpForm handleChangeAllAgree={handleChangeAllAgree} onSubmit={onSubmit} />
        <FormDevTools control={methods.control} />
      </FormProvider>
    );
  }
}

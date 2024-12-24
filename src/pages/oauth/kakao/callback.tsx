import React from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { useSetRecoilState } from 'recoil';
import Layout, { Main } from '@/components/layout';
import { OAuth, Get, Post, instance } from '@/apis';
import Consent from '@/components/common/Consent';
import OauthSignUpForm from '@/components/common/OauthSignUpForm';
import path from '@/constants/path';
import useAppRouter from '@/hooks/useAppRouter';
import { loadingAtom } from '@/recoil/loading';
import useAuth from '@/hooks/useAuth';
import CheckBox from '@/components/common/style/CheckBox';
import Button from '@/components/common/style/Button';
import environment from '@/environment';
import { ParsedUrlQuery } from 'querystring';
import Loading from '@/components/common/Loading';
import Portal from '@/components/common/Portal';

export interface UrlQuery extends ParsedUrlQuery {
  code: string;
  state: string;
}

export default function KaKaoCallbackPage() {
  const [status, setStatus] = React.useState('IDLE');
  const [signInForm, setSignInForm] = React.useState({
    isInitialRequest: 'Y',
    allAgree: false,
    personalInfoAgree: false,
    serviceTermsAgree: false,
    marketingAgree: false,
  });
  const { setAuthAtomState } = useAuth();
  const router = useRouter();
  const query = router.query as UrlQuery;

  const setLoadingAtom = useSetRecoilState(loadingAtom);
  const { replace } = useAppRouter();

  React.useEffect(() => {
    if (router.isReady) {
      const decoded = decodeURIComponent(query.state);
      if (decoded === 'undefined') {
        return;
      }

      const restoredState = JSON.parse(decoded);

      setSignInForm((prev) => ({
        ...prev,
        allAgree: restoredState?.allAgree ?? false,
        isInitialRequest: restoredState?.isInitialRequest ?? 'Y',
        personalInfoAgree: restoredState?.personalInfoAgree ?? false,
        serviceTermsAgree: restoredState?.serviceTermsAgree ?? false,
        marketingAgree: restoredState?.marketingAgree ?? false,
      }));
      setStatus('EXIST');
    }
  }, [query.state, router.isReady]);

  const handleInitialOAuthSignIn = async () => {
    setLoadingAtom({ isLoading: true });

    const requestBody = {
      code: router.query.code as string,
      isInitialRequest: signInForm.isInitialRequest as 'Y' | 'N',
      personalInfoAgree: signInForm.personalInfoAgree,
      serviceTermsAgree: signInForm.serviceTermsAgree,
      marketingAgree: signInForm.marketingAgree,
    };

    try {
      const response = await OAuth.kakaoSignIn(requestBody);
      console.log('카카오 로그인 API : ', response);

      if (!response.success) {
        throw new Error();
      }
      setAuthAtomState({
        provider: response.result.provider,
        role: response.result.role,
        status: 'AUTHENTICATED',
      });
      replace(path.HOME);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const isNotFoundUserError = error.response?.data.error.code === 'ERR-2002';
        if (isNotFoundUserError) {
          setSignInForm((prev) => ({ ...prev, isInitialRequest: 'N' }));
          return;
        }
      }
    } finally {
      setLoadingAtom({ isLoading: false });
    }
  };

  React.useEffect(() => {
    if (router.isReady && router.query.code && status !== 'IDLE') {
      handleInitialOAuthSignIn();
    }
  }, [router.isReady, router.query.code, status]);

  const handleChangeCheckbox = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    setSignInForm((prev) => ({ ...prev, [name]: checked }));
  };

  const handleSubmitSignUp = () => {
    const state = encodeURIComponent(JSON.stringify(signInForm));
    window.location.href = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${environment.kakaoClientId}&redirect_uri=${environment.kakaoRedirectUrl}&state=${state}`;
  };

  if (status === 'IDLE') {
    return (
      <Portal>
        <Loading />
      </Portal>
    );
  }

  if (signInForm.isInitialRequest === 'N') {
    return (
      <OauthSignUpForm>
        <CheckBox checked={true} name="allAgree" onChange={handleChangeCheckbox} label="전체 동의" margin="5px" />
        <CheckBox
          checked={signInForm.personalInfoAgree}
          name="personalInfoAgree"
          required
          onChange={handleChangeCheckbox}
          label="19세 이상"
          margin="5px"
        />
        <CheckBox
          checked={signInForm.personalInfoAgree}
          name="personalInfoAgree"
          required
          onChange={handleChangeCheckbox}
          label="서비스이용 동의"
          margin="5px"
        />
        <CheckBox
          checked={signInForm.serviceTermsAgree}
          name="serviceTermsAgree"
          required
          onChange={handleChangeCheckbox}
          label="개인정보 수집동의"
          margin="5px"
        />
        <CheckBox
          checked={signInForm.marketingAgree}
          name="marketingAgree"
          optional
          onChange={handleChangeCheckbox}
          label="마케팅 동의"
          margin="5px"
        />
        <Button label="가입" name="positive" onClick={handleSubmitSignUp} variant="primary" />
      </OauthSignUpForm>
    );
  }

  return <></>;
}

KaKaoCallbackPage.getLayout = (page: React.ReactElement) => {
  return (
    <Layout>
      <Main>{page}</Main>
    </Layout>
  );
};

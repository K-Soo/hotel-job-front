import styled from 'styled-components';
import axios from 'axios';
import React from 'react';
import Personal from '@/components/signIn/Personal';
import Company from '@/components/signIn/Company';
import Logo from '@/components/common/Logo';
import SignInTabs from '@/components/signIn/SignInTabs';
import { signInTabsOptions } from '@/constants/tabs';
import { useForm, FormProvider, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { schema } from '@/utils';

interface SignInProps {}

type SignInTab = 'general' | 'company';

export default function SignIn({}: SignInProps) {
  const [tab, setTab] = React.useState<SignInTab>('general');

  return (
    <S.SignIn>
      <div className="signin-container">
        <Logo size="middle" margin="0 0 30px 0" />

        <SignInTabs<SignInTab> margin="0 0 50px 0" currentTab={tab} setTab={setTab} tabsOptions={signInTabsOptions} />

        {tab === 'general' && <Personal />}
        {tab === 'company' && <Company />}
      </div>
    </S.SignIn>
  );
}

const S = {
  SignIn: styled.section`
    min-height: 100%;
    max-width: 500px;
    width: 100%;
    margin: 0 auto;
    .signin-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin: 0 auto;
      height: 100%;
      max-width: 350px;
    }
  `,
};

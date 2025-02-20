import React from 'react';
import styled from 'styled-components';
import Logo from '@/components/common/Logo';
import FormCheckbox from '@/components/common/form/FormCheckbox';
import CheckBox from '@/components/common/style/CheckBox';
import Line from '@/components/common/Line';
import Button from '@/components/common/style/Button';
import { SubmitHandler, useFormContext } from 'react-hook-form';
import { OAuthSignInForm } from '@/types';
import Modal from '@/components/common/modal';
import dynamic from 'next/dynamic';
import PolicyTerms from '@/components/policyTerms';
import PolicyPrivacy from '@/components/policyPrivacy';

const DynamicNoSSRModal = dynamic(() => import('@/components/common/modal'), { ssr: false });

interface OauthSignUpFormProps {
  handleChangeAllAgree: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: SubmitHandler<OAuthSignInForm>;
}

export default function OauthSignUpForm({ handleChangeAllAgree, onSubmit }: OauthSignUpFormProps) {
  const [selectedPolicy, setSelectedPolicy] = React.useState<'PERSONAL' | 'SERVICE' | null>(null);

  const {
    watch,
    formState: { isSubmitting },
    handleSubmit,
  } = useFormContext<OAuthSignInForm>();

  const handleOpenPolicy = React.useCallback((value: string) => {
    console.log('value: ', value);
    if (value === 'serviceTermsAgree') {
      setSelectedPolicy('SERVICE');
    }
    if (value === 'personalInfoAgree') {
      setSelectedPolicy('PERSONAL');
    }
  }, []);

  const agreeList = watch(['ageAgree', 'personalInfoAgree', 'serviceTermsAgree', 'smsMarketingAgree', 'emailMarketingAgree']);
  const allAgreeChecked = agreeList.every((agree) => agree);

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

      <S.OauthSignUpForm>
        <S.Header>
          <div className="sign-up-header">
            <Logo size="middle" margin="0 0 15px 0" />
          </div>
          <h1 className="title">회원가입</h1>
          <h2 className="sub-title">이용약관</h2>
        </S.Header>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CheckBox name="all" label="전체 동의" checked={allAgreeChecked} onChange={handleChangeAllAgree} />

          <Line margin="10px 0" />

          <FormCheckbox name="ageAgree" required label="만 19세 이상" margin="0 0 15px 0" visibleIcon={false} />

          <FormCheckbox name="serviceTermsAgree" required label="서비스 이용 동의" margin="0 0 15px 0" handleClickIcon={handleOpenPolicy} />
          <FormCheckbox
            name="personalInfoAgree"
            required
            label="개인정보 수집동의"
            margin="0 0 15px 0"
            handleClickIcon={handleOpenPolicy}
          />

          <FormCheckbox name="smsMarketingAgree" optional label="SMS 수신 동의" margin="0 0 15px 0" visibleIcon={false} />
          <FormCheckbox name="emailMarketingAgree" optional label="E-Mail 수신 동의" margin="0 0 15px 0" visibleIcon={false} />

          <Button label="가입" name="positive" variant="primary" margin="50px 0 0 0" type="submit" isLoading={isSubmitting} />
        </form>
      </S.OauthSignUpForm>
    </>
  );
}

const S = {
  OauthSignUpForm: styled.section`
    max-width: 450px;
    margin: 0 auto;
    width: 100%;
    height: 100%;
  `,
  Header: styled.header`
    .sign-up-header {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    .title {
      text-align: center;
      font-size: 24px;
      font-weight: 500;
      margin-bottom: 30px;
    }
    .sub-title {
      font-size: 18px;
      margin-bottom: 15px;
    }
  `,
};

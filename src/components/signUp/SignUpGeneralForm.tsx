import styled from 'styled-components';
import FormInput from '@/components/common/form/FormInput';
import Button from '@/components/common/style/Button';
import { SignUpForm } from '@/types';
import FormCheckbox from '@/components/common/form/FormCheckbox';
import CheckBox from '@/components/common/style/CheckBox';
import Line from '@/components/common/Line';
import { useRouter } from 'next/router';
import path from '@/constants/path';
import { useFormContext } from 'react-hook-form';

interface SignUpGeneralFormProps {
  setStep: React.Dispatch<React.SetStateAction<string>>;
  handleChangeAllAgree: (event: React.ChangeEvent<HTMLInputElement>) => void;
  fetchEmployerUserIdCheck: () => Promise<void>;
}

export default function SignUpGeneralForm({ setStep, handleChangeAllAgree, fetchEmployerUserIdCheck }: SignUpGeneralFormProps) {
  const router = useRouter();

  const {
    watch,
    formState: { isSubmitting },
  } = useFormContext<SignUpForm>();

  const agreeList = watch(['ageAgree', 'personalInfoAgree', 'serviceTermsAgree', 'smsMarketingAgree', 'emailMarketingAgree']);
  const allAgreeChecked = agreeList.every((agree) => agree);

  return (
    <S.SignUpGeneralForm>
      <h2 className="sign-up-title">회원가입</h2>

      <S.Horizontal>
        <div className="wrapper">
          <FormInput<SignUpForm>
            required
            label="아이디"
            name="userId"
            placeholder="소문자+숫자, 8~16자"
            maxLength={16}
            errorPosition="static"
          />
          <Button
            label="확인"
            variant="secondary100"
            height="40px"
            margin="18px 0 0 15px"
            width="100px"
            onClick={fetchEmployerUserIdCheck}
            disabled={isSubmitting}
          />
        </div>
      </S.Horizontal>

      <FormInput<SignUpForm>
        required
        label="비밀번호"
        name="password"
        placeholder="영문+숫자+특수문자, 8~16자"
        type="password"
        maxLength={16}
        errorPosition="static"
      />
      <FormInput<SignUpForm>
        required
        label="비밀번호 확인"
        name="passwordConfirm"
        placeholder="비밀번호 확인"
        type="password"
        maxLength={16}
      />
      <S.Subtitle>이용 약관</S.Subtitle>
      <CheckBox name="all" label="전체 동의" checked={allAgreeChecked} onChange={handleChangeAllAgree} disabled={isSubmitting} />
      <Line margin="10px 0" />
      <FormCheckbox name="ageAgree" required label="만 19세 이상" margin="0 0 15px 0" visibleIcon={false} />
      <FormCheckbox name="personalInfoAgree" required label="서비스이용 동의" margin="0 0 15px 0" />
      <FormCheckbox name="serviceTermsAgree" required label="개인정보 수집동의" margin="0 0 15px 0" />
      <FormCheckbox name="smsMarketingAgree" optional label="SMS 수신 동의" margin="0 0 15px 0" visibleIcon={false} />
      <FormCheckbox name="emailMarketingAgree" optional label="E-Mail 수신 동의" margin="0 0 15px 0" visibleIcon={false} />

      <div className="button-group">
        <Button label="이전" variant="secondary" margin="0 15px 0 0" onClick={() => router.push(path.SIGN_IN)} />
        <Button label="가입완료" variant="primary" type="submit" />
      </div>
    </S.SignUpGeneralForm>
  );
}

const S = {
  SignUpGeneralForm: styled.div`
    .sign-up-title {
      font-size: 32px;
      color: ${(props) => props.theme.colors.gray800};
      font-weight: 600;
      margin-bottom: 30px;
    }
    .button-group {
      display: flex;
      margin-top: 50px;
    }
  `,
  Horizontal: styled.div`
    margin-bottom: 5px;
    .wrapper {
      display: flex;
    }
    .available-text {
      font-size: 13px;
    }
  `,
  Subtitle: styled.h3`
    font-size: 18px;
    color: ${(props) => props.theme.colors.gray800};
    font-weight: 600;
    margin-top: 30px;
    margin-bottom: 15px;
  `,
};

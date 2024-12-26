import styled from 'styled-components';
import Button from '@/components/common/style/Button';
import FormCheckbox from '@/components/common/form/FormCheckbox';
import CheckBox from '@/components/common/style/CheckBox';
import Line from '@/components/common/Line';
import path from '@/constants/path';
import { useRouter } from 'next/router';

interface SignUpPolicyFormProps {
  setStep: React.Dispatch<React.SetStateAction<string>>;
}

export default function SignUpPolicyForm({ setStep }: SignUpPolicyFormProps) {
  const router = useRouter();

  return (
    <S.SignUpPolicyForm>
      <h2 className="sign-up-title">이용 약관</h2>
      <CheckBox name="all" label="전체 동의" checked={false} onChange={() => {}} />

      <Line />

      <FormCheckbox name="ageAgree" required label="20세 이상" margin="0 0 10px 0" />

      <FormCheckbox name="personalInfoAgree" required label="서비스이용 동의" margin="0 0 10px 0" />

      <FormCheckbox name="serviceTermsAgree" required label="개인정보 수집동의" margin="0 0 10px 0" />

      <FormCheckbox name="marketingAgree" optional label="마케팅 동의" margin="0 0 10px 0" />

      <div className="button-group">
        <Button label="로그인" variant="secondary" onClick={() => router.push(path.SIGN_IN)} margin="0 15px 0 0" />
        <Button label="다음" variant="primary" onClick={() => setStep('STEP_2')} />
      </div>
    </S.SignUpPolicyForm>
  );
}

const S = {
  SignUpPolicyForm: styled.div`
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
};

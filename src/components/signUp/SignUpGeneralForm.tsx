import styled from 'styled-components';
import FormInput from '@/components/common/form/FormInput';
import Button from '@/components/common/style/Button';
import { SignUpForm } from '@/types';
import FormCheckbox from '@/components/common/form/FormCheckbox';
import CheckBox from '@/components/common/style/CheckBox';
import Line from '@/components/common/Line';

interface SignUpGeneralFormProps {
  setStep: React.Dispatch<React.SetStateAction<string>>;
}

export default function SignUpGeneralForm({ setStep }: SignUpGeneralFormProps) {
  return (
    <S.SignUpGeneralForm>
      <h2 className="sign-up-title">기본 정보</h2>

      <S.Horizontal>
        <FormInput<SignUpForm> required label="아이디" name="password" placeholder="아이디" />
        <Button label="확인" variant="secondary100" height="40px" margin="18px 0 0 15px" width="100px" />
      </S.Horizontal>

      <FormInput<SignUpForm> required label="비밀번호" name="password" placeholder="비밀번호" />

      <FormInput<SignUpForm> required label="비밀번호 확인" name="password" placeholder="비밀번호 확인" />

      <Line />

      <CheckBox name="all" label="전체 동의" checked={false} onChange={() => {}} />

      <Line />

      <FormCheckbox name="ageAgree" required label="20세 이상" margin="0 0 10px 0" />

      <FormCheckbox name="personalInfoAgree" required label="서비스이용 동의" margin="0 0 10px 0" />

      <FormCheckbox name="serviceTermsAgree" required label="개인정보 수집동의" margin="0 0 10px 0" />

      <FormCheckbox name="marketingAgree" optional label="마케팅 동의" margin="0 0 10px 0" />

      <div className="button-group">
        <Button label="뒤로" variant="secondary" margin="0 15px 0 0" onClick={() => setStep('STEP_1')} />
        <Button label="가입완료" variant="primary" onClick={() => setStep('STEP_3')} />
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
    display: flex;
  `,
};

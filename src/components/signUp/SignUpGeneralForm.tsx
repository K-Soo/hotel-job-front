import styled from 'styled-components';
import FormInput from '@/components/common/form/FormInput';
import Button from '@/components/common/style/Button';
import { SignUpForm } from '@/types';

interface SignUpGeneralFormProps {}

export default function SignUpGeneralForm({}: SignUpGeneralFormProps) {
  return (
    <S.SignUpGeneralForm>
      <FormInput<SignUpForm> required label="아이디" name="password" placeholder="아이디" />
      <FormInput<SignUpForm> required label="비밀번호" name="password" placeholder="비밀번호" />
      <FormInput<SignUpForm> required label="비밀번호 확인" name="password" placeholder="비밀번호 확인" />
      <FormInput<SignUpForm> required label="이메일" name="password" placeholder="이메일" />
      <FormInput<SignUpForm> required label="담당자" name="password" placeholder="담당자" />

      <div className="button-group">
        <Button label="뒤로" variant="secondary" margin="0 15px 0 0" />
        <Button label="다음" variant="primary" />
      </div>
    </S.SignUpGeneralForm>
  );
}

const S = {
  SignUpGeneralForm: styled.div`
    .button-group {
      display: flex;
    }
  `,
};

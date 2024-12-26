import styled from 'styled-components';
import FormInput from '@/components/common/form/FormInput';
import Button from '@/components/common/style/Button';
import { SignUpForm } from '@/types';
import { useRouter } from 'next/router';

interface SignUpCompanyFormProps {
  setStep: React.Dispatch<React.SetStateAction<string>>;
}

export default function SignUpCompanyForm({ setStep }: SignUpCompanyFormProps) {
  const router = useRouter();

  return (
    <S.SignUpCompanyForm>
      <h2 className="sign-up-title">업체 정보</h2>
      <FormInput<SignUpForm> required label="사업자등록번호" name="password" placeholder="사업자등록번호" />
      <FormInput<SignUpForm> required label="상호명" name="password" placeholder="상호명" />

      <div className="button-group">
        <Button label="뒤로" variant="secondary" margin="0 15px 0 0" onClick={() => setStep('STEP_1')} />
        <Button label="다음" variant="primary" onClick={() => setStep('STEP_2')} />
      </div>
    </S.SignUpCompanyForm>
  );
}

const S = {
  SignUpCompanyForm: styled.div`
    flex: 1;
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

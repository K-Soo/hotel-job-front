import styled from 'styled-components';
import FormInput from '@/components/common/form/FormInput';
import Button from '@/components/common/style/Button';
import { SignUpForm } from '@/types';

interface SignUpCompanyFormProps {
  setStep: React.Dispatch<React.SetStateAction<string>>;
}

export default function SignUpCompanyForm({ setStep }: SignUpCompanyFormProps) {
  return (
    <S.SignUpCompanyForm>
      <div className="company-info">
        <h2 className="company-info__title">업체 정보</h2>
        <FormInput<SignUpForm> required label="사업자등록번호" name="password" placeholder="사업자등록번호" />
        <FormInput<SignUpForm> required label="상호명" name="password" placeholder="상호명" />
        <FormInput<SignUpForm> required label="대표자" name="password" placeholder="대표자" />
        <FormInput<SignUpForm> required label="사업장 주소" name="password" placeholder="사업장 주소" />
        <FormInput<SignUpForm> required label="사업장 상세주소" name="password" placeholder="사업장 상세주소" />
      </div>
      <div className="button-group">
        <Button label="다음" variant="primary" onClick={() => setStep('STEP_2')} />
      </div>
    </S.SignUpCompanyForm>
  );
}

const S = {
  SignUpCompanyForm: styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
    .company-info {
      &__title {
        font-size: 32px;
        color: ${(props) => props.theme.colors.gray800};
        font-weight: 600;
        margin-bottom: 30px;
      }
    }
    .button-group {
      display: flex;
    }
  `,
};

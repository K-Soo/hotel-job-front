import styled from 'styled-components';
import FormInput from '@/components/common/form/FormInput';
import { SetupCompanyForm } from '@/types';
import StepHeader from '@/components/employerSetupCompany/StepHeader';
interface BusinessNumberFormProps {
  children: React.ReactNode;
}

export default function BusinessNumberForm({ children }: BusinessNumberFormProps) {
  return (
    <S.BusinessNumberForm>
      <StepHeader text="사업자 기본정보 입력" />

      <FormInput<SetupCompanyForm>
        required
        label="사업자등록번호"
        name="businessRegistrationNumber"
        placeholder="사업자등록번호"
        mask={'999-99-99999'}
        margin="0 0 10px 0"
        isFocusing
        errorPosition="static"
      />
      <FormInput<SetupCompanyForm> required label="상호명" name="companyName" placeholder="상호명" maxLength={30} errorPosition="static" />
      <S.ButtonBox>{children}</S.ButtonBox>
    </S.BusinessNumberForm>
  );
}

const S = {
  BusinessNumberForm: styled.div`
    padding: 15px;
  `,
  ButtonBox: styled.div`
    margin-top: 90px;
    display: flex;
    justify-content: flex-end;
  `,
};

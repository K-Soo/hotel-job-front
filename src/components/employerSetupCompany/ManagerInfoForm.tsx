import styled from 'styled-components';
import FormInput from '@/components/common/form/FormInput';
import { SetupCompanyForm } from '@/types';
import StepHeader from '@/components/employerSetupCompany/StepHeader';

interface ManagerInfoFormProps {
  children: React.ReactNode;
}

export default function ManagerInfoForm({ children }: ManagerInfoFormProps) {
  return (
    <S.ManagerInfoForm>
      <StepHeader text="담당자 기본 정보" />

      <FormInput<SetupCompanyForm> required label="담당자명" name="managerName" placeholder="담당자명" isFocusing errorPosition="static" />

      <FormInput<SetupCompanyForm>
        required
        label="담당자 연락처"
        name="managerNumber"
        placeholder="담당자 연락처"
        mask="999-9999-9999"
        errorPosition="static"
      />
      <FormInput<SetupCompanyForm> required label="담당자 이메일" name="managerEmail" placeholder="담당자 이메일" errorPosition="static" />

      <S.ButtonBox>{children}</S.ButtonBox>
    </S.ManagerInfoForm>
  );
}

const S = {
  ManagerInfoForm: styled.div`
    padding: 15px;
    .address-wrapper {
      display: flex;
      align-items: center;
    }
  `,
  Header: styled.div`
    margin-bottom: 30px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 100px;
    padding: 0 15px;
    border-radius: 8px;
    background-color: ${(props) => props.theme.colors.gray100};
    .title {
      font-size: 18px;
      font-weight: 500;
      color: ${(props) => props.theme.colors.gray800};
    }
  `,
  ButtonBox: styled.div`
    margin-top: 30px;
    display: flex;
    justify-content: flex-end;
  `,
};

import styled from 'styled-components';
import FormInput from '@/components/common/form/FormInput';
import { SetupCompanyForm } from '@/types';

interface BusinessNumberFormProps {
  children: React.ReactNode;
}

export default function BusinessNumberForm({ children }: BusinessNumberFormProps) {
  return (
    <S.BusinessNumberForm>
      <S.Header>
        <h2 className="title">사업자 기본 정보</h2>
      </S.Header>

      <FormInput<SetupCompanyForm>
        required
        label="사업자등록번호"
        name="businessRegistrationNumber"
        placeholder="사업자등록번호"
        mask={'999-99-99999'}
        margin="0 0 10px 0"
      />
      <FormInput<SetupCompanyForm> required label="상호명" name="companyName" placeholder="상호명" maxLength={30} />
      <S.ButtonBox>{children}</S.ButtonBox>
    </S.BusinessNumberForm>
  );
}

const S = {
  BusinessNumberForm: styled.div`
    max-width: 450px;
    margin: 0 auto;
    padding: 15px;
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
    margin-top: 20px;
    display: flex;
    justify-content: flex-end;
  `,
};

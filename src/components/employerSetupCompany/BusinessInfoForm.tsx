import styled from 'styled-components';
import FormInput from '@/components/common/form/FormInput';
import { BusinessForm } from '@/types';

interface BusinessInfoFormProps {
  children: React.ReactNode;
}

export default function BusinessInfoForm({ children }: BusinessInfoFormProps) {
  return (
    <S.BusinessInfoForm>
      <S.Header>
        <h2 className="title">업체 기본 정보</h2>
        {/* <div>사업자 정보를 입력해주세요</div> */}
      </S.Header>

      <FormInput<BusinessForm> required label="사업자등록번호" name="businessRegistrationNumber" placeholder="사업자등록번호" />
      <FormInput<BusinessForm> required label="상호명" name="businessName" placeholder="상호명" />

      <S.ButtonBox>{children}</S.ButtonBox>
    </S.BusinessInfoForm>
  );
}

const S = {
  BusinessInfoForm: styled.div`
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
    border-radius: 5px;
    background-color: ${(props) => props.theme.colors.gray100};
    .title {
      font-size: 20px;
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

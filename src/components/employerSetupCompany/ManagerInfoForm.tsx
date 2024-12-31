import styled from 'styled-components';
import FormInput from '@/components/common/form/FormInput';
import { BusinessForm } from '@/types';
import Button from '@/components/common/style/Button';
import Line from '@/components/common/Line';

interface ManagerInfoFormProps {
  children: React.ReactNode;
}

export default function ManagerInfoForm({ children }: ManagerInfoFormProps) {
  return (
    <S.ManagerInfoForm>
      <S.Header>
        <h2 className="title">업체 기본 정보</h2>
      </S.Header>

      <FormInput<BusinessForm> required label="대표자명" name="tradeName" placeholder="대표자" />

      <div className="address-wrapper">
        <FormInput<BusinessForm> required label="업체 주소" name="businessRegistrationNumber" placeholder="주소" disabled />
        <Button label="검색" variant="secondary100" width="100px" height="40px" margin="0 0 0 15px" />
      </div>

      <FormInput<BusinessForm> required name="businessRegistrationNumber" placeholder="상세 주소" />

      <Line margin="15px 0" />

      <FormInput<BusinessForm> required label="담당자명" name="businessName" placeholder="사업자등록번호" />
      <FormInput<BusinessForm> required label="담당자 연락처" name="businessName" placeholder="사업자등록번호" />

      <S.ButtonBox>{children}</S.ButtonBox>
    </S.ManagerInfoForm>
  );
}

const S = {
  ManagerInfoForm: styled.div`
    max-width: 450px;
    margin: 0 auto;
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

import styled from 'styled-components';
import FormInput from '@/components/common/form/FormInput';
import Button from '@/components/common/style/Button';
import { SetupCompanyForm } from '@/types';
import { useSetRecoilState } from 'recoil';
import { daumPostAtom } from '@/recoil/daumPost';
import { useRecoilValue } from 'recoil';
import DaumPost from '@/components/common/DaumPost';
import React from 'react';

interface BusinessInfoFormProps {
  children: React.ReactNode;
}

export default function BusinessInfoForm({ children }: BusinessInfoFormProps) {
  const setDaumPostAtom = useSetRecoilState(daumPostAtom);

  return (
    <S.BusinessInfoForm>
      <S.Header>
        <h2 className="title">사업자 기본 정보</h2>
      </S.Header>

      <FormInput<SetupCompanyForm> required label="대표자명" name="businessOwner" placeholder="대표자" />

      <div className="address-wrapper">
        <FormInput<SetupCompanyForm> required label="업체 주소" name="address" placeholder="주소" disabled />
        <Button
          label="검색"
          variant="secondary100"
          width="100px"
          height="40px"
          margin="0 0 0 15px"
          onClick={() => setDaumPostAtom({ isOpen: true })}
        />
      </div>

      <FormInput<SetupCompanyForm> required name="addressDetail" placeholder="상세 주소" />

      <S.ButtonBox>{children}</S.ButtonBox>
    </S.BusinessInfoForm>
  );
}

const S = {
  BusinessInfoForm: styled.div`
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

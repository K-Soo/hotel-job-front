import styled from 'styled-components';
import FormInput from '@/components/common/form/FormInput';
import Button from '@/components/common/style/Button';
import { SetupCompanyForm } from '@/types';
import { useSetRecoilState } from 'recoil';
import { daumPostAtom } from '@/recoil/daumPost';
import React from 'react';
import StepHeader from '@/components/employerSetupCompany/StepHeader';

interface BusinessInfoFormProps {
  children: React.ReactNode;
}

export default function BusinessInfoForm({ children }: BusinessInfoFormProps) {
  const setDaumPostAtom = useSetRecoilState(daumPostAtom);

  return (
    <S.BusinessInfoForm>
      <StepHeader text="사업자 기본정보 입력" />

      <FormInput<SetupCompanyForm> required label="대표자명" name="businessOwner" placeholder="대표자" isFocusing errorPosition="static" />

      <div className="address-wrapper">
        <FormInput<SetupCompanyForm>
          required
          label="업체 주소"
          name="address"
          placeholder="주소"
          disabled
          errorPosition="static"
          inputStyle={{ fontSize: '13px', color: 'gray' }}
        />
        <Button
          label="검색"
          variant="secondary100"
          width="100px"
          height="40px"
          margin="2px 0 0 15px"
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
    padding: 15px;
    .address-wrapper {
      display: flex;
      align-items: center;
    }
  `,
  ButtonBox: styled.div`
    margin-top: 60px;
    display: flex;
    justify-content: flex-end;
  `,
};

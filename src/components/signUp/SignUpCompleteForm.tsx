import styled from 'styled-components';
import React from 'react';
import Icon from '@/icons/Icon';
import Button from '@/components/common/style/Button';
import { useRouter } from 'next/router';
import path from '@/constants/path';

export default function SignUpCompleteForm() {
  const router = useRouter();

  return (
    <S.SignUpCompleteForm>
      <StyledSuccessIcon>
        <Icon name="Check24x24" width="24" height="" />
      </StyledSuccessIcon>
      <p className="welcome">회원가입 완료</p>
      <p className="text">
        호텔잡 회원가입을 축하합니다. <br />
        이제 호텔잡을 통해 다양한 서비스를 이용하실 수 있습니다.
      </p>
      <Button
        label="확인"
        variant="primary"
        onClick={() => window.location.replace(path.EMPLOYER_SETUP_COMPANY)}
        width="200px"
        borderRadius="30px"
        fontSize="16px"
      />
    </S.SignUpCompleteForm>
  );
}

const StyledSuccessIcon = styled.div`
  background-color: ${(props) => props.theme.colors.blue500};
  width: 80px;
  height: 80px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 30px auto;
  svg {
    width: 55px;
    height: 55px;
  }
`;

const S = {
  SignUpCompleteForm: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    .welcome {
      font-size: 24px;
      color: ${(props) => props.theme.colors.gray800};
      font-weight: 600;
      margin-bottom: 30px;
      text-align: center;
    }
    .text {
      font-size: 16px;
      margin-bottom: 50px;
      text-align: center;
      line-height: 1.5;
      color: ${(props) => props.theme.colors.gray800};
    }
  `,
};

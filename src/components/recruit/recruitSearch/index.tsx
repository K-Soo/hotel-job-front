import React from 'react';
import styled from 'styled-components';

interface RecruitSearchProps {
  children: React.ReactNode;
}

export default function RecruitSearch({ children }: RecruitSearchProps) {
  return <S.RecruitSearch>{children}</S.RecruitSearch>;
}

const S = {
  RecruitSearch: styled.div`
    margin: 0 auto;
    display: flex;
    margin-top: 15px;
    margin-bottom: 50px;
    max-width: 1024px;
    width: 100%;
    color: ${({ theme }) => theme.colors.black300};
    ${(props) => props.theme.media.mobile`
      flex-direction: column;
      margin-top: 0;
      margin-bottom: 15px;
    `};
  `,
};

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
    display: flex;
    margin: 15px auto 50px auto;
    max-width: 1024px;
    width: 100%;
    color: ${({ theme }) => theme.colors.black300};
    ${(props) => props.theme.media.laptop`
      padding: 15px 15px 50px 15px;
      margin: 0 auto 0 auto;
    `};

    ${(props) => props.theme.media.mobile`
      flex-direction: column;
      padding: 0 15px 15px 15px;
    `};
  `,
};

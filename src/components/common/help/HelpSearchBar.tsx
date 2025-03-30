import React from 'react';
import styled from 'styled-components';

export default function HelpSearchBar() {
  return (
    <S.HelpSearchBar>
      <input type="text" className="text-form" placeholder="검색어 입력" />
    </S.HelpSearchBar>
  );
}

const S = {
  HelpSearchBar: styled.div`
    height: 45px;
    border-radius: 6px;
    background-color: ${({ theme }) => theme.colors.gray100};
    margin: 15px 0;
    overflow: hidden;
    .text-form {
      all: unset;
      border-radius: inherit;
      height: 100%;
      width: 100%;
      padding-left: 20px;
    }
  `,
};

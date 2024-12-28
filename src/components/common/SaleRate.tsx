import React from 'react';
import styled from 'styled-components';

interface ISaleRate {
  rate: number | undefined;
  fontSize?: string;
  margin?: string;
}

export default React.memo(function SaleRate({ rate, fontSize, margin }: ISaleRate) {
  return (
    <S.SaleRate margin={margin} fontSize={fontSize}>
      {rate}%
    </S.SaleRate>
  );
});

const S = {
  SaleRate: styled.span<{ fontSize?: string; margin?: string }>`
    color: #f20000;
    font-weight: 700;
    font-size: ${(props) => (props.fontSize ? props.fontSize : '16px')};
    margin: ${(props) => (props.margin ? props.margin : '0 5px 0 0')};
    letter-spacing: -0.4px;
  `,
};

import styled from 'styled-components';

interface SummaryProps {}

export default function Summary({}: SummaryProps) {
  return <S.Summary>Summary</S.Summary>;
}

const S = {
  Summary: styled.div`
    border: 1px solid red;
    width: 100%;
    height: 300px;
    border-radius: 15px;
  `,
};

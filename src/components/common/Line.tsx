import styled from 'styled-components';

interface LineProps {}

export default function Line({}: LineProps) {
  return <S.Line />;
}

const S = {
  Line: styled.div`
    border-top: 1px solid ${(props) => props.theme.colors.grayOpacity200};
    margin: 20px 0;
  `,
};

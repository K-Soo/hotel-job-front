import styled from 'styled-components';

interface LineProps {
  margin?: string;
}

export default function Line({ margin }: LineProps) {
  return <S.Line $margin={margin} />;
}

const S = {
  Line: styled.div<{ $margin?: string }>`
    border-top: 1px solid ${(props) => props.theme.colors.grayOpacity200};
    margin: ${(props) => (props.$margin ? props.$margin : '20px 0')};
  `,
};

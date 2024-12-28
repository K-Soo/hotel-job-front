import styled from 'styled-components';

interface LineProps {
  margin?: string;
  color?: string;
}

export default function Line({ margin, color }: LineProps) {
  return <S.Line $margin={margin} $color={color} />;
}

const S = {
  Line: styled.div<{ $margin?: string; $color?: string }>`
    border-top: 1px solid ${(props) => (props.$color ? props.$color : props.theme.colors.grayOpacity200)};
    margin: ${(props) => (props.$margin ? props.$margin : '20px 0')};
  `,
};

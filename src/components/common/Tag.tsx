import styled from 'styled-components';

interface TagProps {
  margin?: string;
  fontSize?: string;
  color?: string;
  backgroundColor?: string;
  borderColor?: string;
  borderRadius?: string;
  padding?: string;
  width?: string;
  height?: string;
}

export default function Tag({ margin, fontSize, color, backgroundColor, borderColor, borderRadius, padding, width, height }: TagProps) {
  return (
    <S.Tag
      $margin={margin}
      $fontSize={fontSize}
      $color={color}
      $backgroundColor={backgroundColor}
      $borderColor={borderColor}
      $borderRadius={borderRadius}
      $padding={padding}
      $width={width}
      $height={height}
    >
      Tag
    </S.Tag>
  );
}

const S = {
  Tag: styled.span<{
    $margin?: string;
    $fontSize?: string;
    $color?: string;
    $backgroundColor?: string;
    $borderColor?: string;
    $borderRadius?: string;
    $padding?: string;
    $width?: string;
    $height?: string;
  }>`
    margin: ${(props) => props.$margin || '0'};
    font-size: ${(props) => props.$fontSize || '14px'};
    color: ${(props) => props.$color || props.theme.colors.black100};
    background-color: ${(props) => props.$backgroundColor || props.theme.colors.gray100};
    border: 1px solid ${(props) => props.$borderColor || props.theme.colors.gray200};
    border-radius: ${(props) => props.$borderRadius || '4px'};
    padding: ${(props) => props.$padding || '4px 8px'};
    width: ${(props) => props.$width || 'auto'};
    height: ${(props) => props.$height || 'auto'};
    display: inline;
  `,
};

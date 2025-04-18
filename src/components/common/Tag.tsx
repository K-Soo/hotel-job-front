import styled, { css, keyframes } from 'styled-components';

type TagType = 'BEST' | 'URGENT' | 'VERIFIED' | 'UNVERIFIED' | 'DEFAULT_RESUME' | 'DRAFT' | 'ATTENTION' | 'JOB' | 'CONDITION';

interface TagProps {
  label: string;
  margin?: string;
  fontSize?: string;
  color?: string;
  backgroundColor?: string;
  borderColor?: string;
  borderRadius?: string;
  padding?: string;
  width?: string;
  height?: string;
  type?: TagType;
}

const twinkle = keyframes`
  0% {
    -webkit-transform: scale(0) rotate(45deg);
    opacity: 0;
  }
  80% {
    -webkit-transform: scale(0) rotate(45deg);
    opacity: 0.5;
  }
  81% {
    -webkit-transform: scale(4) rotate(45deg);
    opacity: 1;
  }
  100% {
    -webkit-transform: scale(50) rotate(45deg);
    opacity: 0;
  }
`;

export default function Tag({
  label,
  margin,
  fontSize,
  color,
  backgroundColor,
  borderColor,
  borderRadius,
  padding,
  width,
  height,
  type,
}: TagProps) {
  return (
    <S.Tag
      className="ignore-scroll"
      $margin={margin}
      $fontSize={fontSize}
      $color={color}
      $backgroundColor={backgroundColor}
      $borderColor={borderColor}
      $borderRadius={borderRadius}
      $padding={padding}
      $width={width}
      $height={height}
      $type={type}
    >
      {type === 'ATTENTION' && '✨ '}
      {label}
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
    $type?: TagType;
  }>`
    margin: ${(props) => props.$margin || '0'};
    font-size: ${(props) => props.$fontSize || '12px'};
    color: ${(props) => props.$color || props.theme.colors.black300};
    background-color: ${(props) => props.$backgroundColor || props.theme.colors.gray100};
    border: 1px solid ${(props) => props.$borderColor || props.theme.colors.gray200};
    border-radius: ${(props) => props.$borderRadius || '3px'};
    padding: ${(props) => props.$padding || '3px 8px'};
    width: ${(props) => props.$width || 'auto'};
    height: ${(props) => props.$height || 'auto'};
    display: inline-flex;
    align-items: center;
    justify-content: center;
    pointer-events: none;
    user-select: none;
    white-space: nowrap;
    ${(props) =>
      props.$type === 'BEST' &&
      css`
        color: ${props.theme.colors.white};
        background-color: ${props.theme.colors.red300};
        border: none;
        border-radius: 10px;
        font-weight: 500;
      `};

    ${(props) =>
      props.$type === 'URGENT' &&
      css`
        color: ${props.theme.colors.white};
        background-color: ${props.theme.colors.red500};
        border: none;
        overflow: hidden;
        padding: 3px 6px;
        position: relative;
        &::before {
          position: absolute;
          content: '';
          display: inline-block;
          top: -180px;
          left: 0;
          width: 30px;
          height: 100%;
          background-color: #fff;
          animation: ${twinkle} 6s ease-in-out infinite;
        }
      `};

    ${(props) =>
      props.$type === 'URGENT' &&
      css`
        color: ${props.theme.colors.white};
        background-color: ${props.theme.colors.red500};
        border: none;
        overflow: hidden;
        padding: 3px 6px;
        position: relative;
        &::before {
          position: absolute;
          content: '';
          display: inline-block;
          top: -180px;
          left: 0;
          width: 30px;
          height: 100%;
          background-color: #fff;
          animation: ${twinkle} 6s ease-in-out infinite;
        }
      `};
    ${(props) =>
      props.$type === 'ATTENTION' &&
      css`
        color: ${props.theme.colors.black400};
        border: none;
        overflow: hidden;
        position: relative;
        &::before {
          position: absolute;
          content: '';
          display: inline-block;
          top: -180px;
          left: 0;
          width: 30px;
          height: 100%;
          background-color: #fff;
          animation: ${twinkle} 6s ease-in-out infinite;
        }
      `};

    ${(props) =>
      props.$type === 'VERIFIED' &&
      css`
        color: ${props.theme.colors.white};
        background-color: ${props.theme.colors.gray800};
        border: none;
        border-radius: 10px;
        font-weight: 400;
        font-size: 12px;
      `};

    ${(props) =>
      props.$type === 'UNVERIFIED' &&
      css`
        color: ${props.theme.colors.white};
        background-color: ${props.theme.colors.gray600};
        border: none;
        border-radius: 10px;
        font-weight: 400;
        font-size: 12px;
      `};

    ${(props) =>
      props.$type === 'DEFAULT_RESUME' &&
      css`
        color: ${(props) => props.theme.colors.blue800};
        background-color: ${(props) => props.theme.colors.blue50};
        border: none;
      `};

    ${(props) =>
      props.$type === 'DRAFT' &&
      css`
        color: ${(props) => props.theme.colors.red300};
        border: none;
        background: none;
      `};

    ${(props) =>
      props.$type === 'CONDITION' &&
      css`
        border-radius: 20px;
        font-weight: 300;
        margin-right: 8px;
      `};

    ${(props) =>
      props.$type === 'JOB' &&
      css`
        color: ${(props) => props.theme.colors.blue500};
        border: ${(props) => `1px solid ${props.theme.colors.blue100}`};
        background-color: ${(props) => props.theme.colors.blue100};
        border-radius: 30px;
      `};
  `,
};

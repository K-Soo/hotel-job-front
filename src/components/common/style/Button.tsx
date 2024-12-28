import styled, { css, keyframes } from 'styled-components';
import Icon, { IconType } from '@/icons/Icon';

type ButtonVariant =
  | 'primary' // 기본 버튼
  | 'secondary' // 보조 버튼
  | 'secondary100' // 보조 버튼
  | 'secondary200' // 보조 버튼
  | 'tertiary' // 중립적 버튼
  | 'danger' // 위험한 작업
  | 'success' // 성공적인 작업
  | 'warning' // 경고 작업
  | 'info' // 정보 제공
  | 'ghost' // 투명한 버튼
  | 'outline' // 테두리만 있는 버튼
  | 'text' // 텍스트만 있는 버튼
  | 'disabled' // 비활성화된 버튼
  | 'loading' // 작업 중 버튼
  | 'checkout'; // 결제

interface ButtonProps {
  label: string;
  name?: string;
  variant: ButtonVariant;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  fontSize?: string;
  margin?: string;
  height?: string;
  width?: string;
  maxWidth?: string;
  borderRadius?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  icon?: React.ReactElement;
  iconColor?: string;
  padding?: string;
}

export default function Button({
  label,
  margin,
  onClick,
  variant,
  fontSize,
  type,
  disabled,
  height,
  name,
  width,
  maxWidth,
  borderRadius,
  icon,
  iconColor,
  padding,
}: ButtonProps) {
  return (
    <S.Button
      type={type ?? 'button'}
      onClick={onClick}
      height={height}
      name={name}
      width={width}
      $margin={margin}
      fontSize={fontSize}
      disabled={disabled}
      $borderRadius={borderRadius}
      $variant={variant}
      $maxWidth={maxWidth}
      $iconColor={iconColor}
      $padding={padding}
    >
      {icon}
      {label}
    </S.Button>
  );
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

const S = {
  Button: styled.button<{
    $margin?: string;
    width?: string;
    $maxWidth?: string;
    height?: string;
    fontSize?: string;
    name?: string;
    $borderRadius?: string;
    $iconColor?: string;
    $variant: ButtonVariant;
    $padding?: string;
  }>`
    box-sizing: border-box;
    cursor: pointer;
    width: ${(props) => (props.width ? props.width : '100%')};
    max-width: ${(props) => (props.$maxWidth ? props.$maxWidth : '100%')};
    height: ${(props) => (props.height ? props.height : '45px')};
    border-radius: ${(props) => (props.$borderRadius ? props.$borderRadius : '5px')};
    font-size: ${(props) => (props.fontSize ? props.fontSize : '16px')};
    margin: ${(props) => (props.$margin ? props.$margin : '0')};
    display: flex;
    align-items: center;
    justify-content: center;
    white-space: nowrap;
    padding: ${(props) => (props.$padding ? props.$padding : '0 8px')};
    svg {
      fill: ${(props) => props.$iconColor};
      color: ${(props) => props.$iconColor};
      stroke: ${(props) => props.$iconColor};
    }

    ${(props) =>
      props.$variant === 'primary' &&
      css`
        color: ${(props) => props.theme.colors.white};
        background-color: ${(props) => props.theme.colors.blue500};
        &:hover {
          background-color: ${(props) => props.theme.colors.blue600};
        }
        &:disabled {
          background-color: ${(props) => props.theme.colors.blue200};
          cursor: not-allowed;
        }
      `};

    ${(props) =>
      props.$variant === 'secondary' &&
      css`
        color: ${(props) => props.theme.colors.gray700};
        background-color: ${(props) => props.theme.colors.gray100};
        &:hover {
          transition: 0.3s;
          background-color: ${(props) => props.theme.colors.gray200};
          color: ${(props) => props.theme.colors.black200};
        }
        &:disabled {
          cursor: not-allowed;
        }
      `};

    ${(props) =>
      props.$variant === 'secondary100' &&
      css`
        color: ${(props) => props.theme.colors.blue500};
        background-color: ${(props) => props.theme.colors.blue50};
        &:hover {
          transition: 0.3s;
          background-color: ${(props) => props.theme.colors.blue100};
        }
        &:disabled {
          cursor: not-allowed;
        }
      `};

    ${(props) =>
      props.$variant === 'secondary200' &&
      css`
        color: ${(props) => props.theme.colors.gray700};
        background-color: ${(props) => props.theme.colors.white};
        &:hover {
          transition: 0.3s;
          background-color: ${(props) => props.theme.colors.gray200};
        }
        &:disabled {
          cursor: not-allowed;
        }
      `};

    ${(props) =>
      props.$variant === 'tertiary' &&
      css`
        color: ${(props) => props.theme.colors.gray700};
        background-color: ${(props) => props.theme.colors.white};
        border: 1px solid ${(props) => props.theme.colors.gray200};
        &:hover {
          transition: 0.3s;
          background-color: ${(props) => props.theme.colors.gray};
          color: ${(props) => props.theme.colors.black200};
        }
        &:disabled {
          cursor: not-allowed;
        }
      `};

    ${(props) =>
      props.$variant === 'checkout' &&
      css`
        color: ${(props) => props.theme.colors.gray100};
        background: linear-gradient(0deg, rgba(255, 27, 0, 1) 0%, rgba(251, 75, 2, 1) 100%);
        overflow: hidden;
        position: relative;
        &:hover {
          background: red;
        }
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
        &:disabled {
          cursor: not-allowed;
        }
      `};

    ${(props) =>
      props.name === 'positiveWhite' &&
      `
        color: #555;
        border: 1px solid #ebebeb;
        border-bottom-color: #c6c6c6;
        box-shadow: 0 0 2px 1px rgba(0,0,0,0.04);
        text-shadow: 0 0 5px rgba(255,255,255,1);
        background: #fff;
        background: linear-gradient(to bottom,#ffffff 40%,#f6f6f6 100%);
        :hover{
          background: linear-gradient(to bottom,#ffffff 100%,#f6f6f6 100%);
        }
        &:disabled {
          background: #d9d9d9;
          color: #fff;
          text-shadow: none;
          box-shadow: none;
          border: none;
        }
    `};
  `,
};

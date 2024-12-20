import styled, { css } from 'styled-components';

// 1. positive : 화면의 변화를 주거나 정보를 추가하는 버튼 ("전송" "확인" "더보기" 등)
// 2. Neutral: 화면의 변화가 없거나 되돌아가는 버튼 ("취소"버튼 등)
// 3. Negative: 삭제, 리셋, 추가 정보를 차단하는 버튼

type ButtonVariant =
  | 'primary' // 기본 버튼
  | 'secondary' // 보조 버튼
  | 'tertiary' // 중립적 버튼
  | 'danger' // 위험한 작업
  | 'success' // 성공적인 작업
  | 'warning' // 경고 작업
  | 'info' // 정보 제공
  | 'ghost' // 투명한 버튼
  | 'outline' // 테두리만 있는 버튼
  | 'text' // 텍스트만 있는 버튼
  | 'disabled' // 비활성화된 버튼
  | 'loading'; // 작업 중 버튼

interface ButtonProps {
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  label: string;
  name?: string;
  variant: ButtonVariant;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  fontSize?: string;
  margin?: string;
  height?: string;
  width?: string;
  borderRadius?: string;
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
  borderRadius,
}: ButtonProps) {
  return (
    <S.Button
      type={type ?? 'button'}
      onClick={onClick}
      height={height}
      name={name}
      width={width}
      margin={margin}
      fontSize={fontSize}
      disabled={disabled}
      $borderRadius={borderRadius}
      $variant={variant}
    >
      {label}
    </S.Button>
  );
}

const S = {
  Button: styled.button<{
    margin?: string;
    width?: string;
    height?: string;
    fontSize?: string;
    name?: string;
    $borderRadius?: string;
    $variant: ButtonVariant;
  }>`
    cursor: pointer;
    margin: ${(props) => (props.margin ? props.margin : '0')};
    width: ${(props) => (props.width ? props.width : '100%')};
    height: ${(props) => (props.height ? props.height : '40px')};
    border-radius: ${(props) => (props.$borderRadius ? props.$borderRadius : '0')};
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    border-radius: 3px;
    font-size: ${(props) => (props.fontSize ? props.fontSize : '16px')};

    ${(props) =>
      props.$variant === 'primary' &&
      css`
        color: ${(props) => props.theme.colors.white100};
        background-color: ${(props) => props.theme.colors.blue100};
        &:hover {
          background-color: ${(props) => props.theme.colors.blue200};
        }
        &:disabled {
          background-color: ${(props) => props.theme.colors.blue300};
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

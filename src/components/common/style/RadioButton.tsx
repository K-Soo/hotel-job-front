import styled from 'styled-components';

interface RadioProps {
  label?: string;
  name: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onClick?: (event: React.MouseEvent<HTMLInputElement>) => void;
  margin?: string;
  checked: boolean;
  fontSize?: string;
  value?: string;
  disabled?: boolean;
  style?: React.CSSProperties;
  className?: string;
}

export default function RadioButton({
  label,
  name,
  onChange,
  checked,
  margin,
  fontSize,
  value,
  disabled,
  onClick,
  style,
  className,
}: RadioProps) {
  return (
    <S.RadioButton $margin={margin} style={style} className={className} $fontSize={fontSize}>
      <input
        id={`radio-button-${value}`}
        type="radio"
        onChange={onChange}
        onClick={onClick}
        name={name}
        checked={checked}
        value={value}
        disabled={disabled}
      />
      <label htmlFor={`radio-button-${value}`}>{label}</label>
    </S.RadioButton>
  );
}

const S = {
  RadioButton: styled.div<{ $margin?: string; $fontSize?: string }>`
    margin: ${(props) => props.$margin || 0};
    display: inline-block;
    &:hover {
      color: ${(props) => props.theme.colors.blue700};
    }

    input[type='radio'] {
      display: none;
    }

    label {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0 20px;
      border: 1px solid #ccc;
      height: 40px;
      width: 100%;
      border-radius: 8px;
      background-color: #ffffff;
      color: #555;
      font-size: ${(props) => props.$fontSize || '16px'};
      cursor: pointer;
      transition: all 0.2s;
      user-select: none;
      cursor: pointer;
    }

    input[type='radio']:checked + label {
      background-color: #e6f0ff;
      border: 1px solid ${({ theme }) => theme.colors.blue500};
      color: ${({ theme }) => theme.colors.blue400};
      font-weight: 500;
    }

    input[type='radio']:hover + label {
      color: #1c64f2;
      border: 1px solid ${({ theme }) => theme.colors.blue300};
    }

    input[type='radio']:checked:hover + label {
      color: ${({ theme }) => theme.colors.blue400};
      border: 1px solid ${({ theme }) => theme.colors.blue500};
    }

    input[type='radio']:disabled + label {
      background-color: #f5f5f5;
      color: #aaa;
      cursor: not-allowed;
    }
  `,
};

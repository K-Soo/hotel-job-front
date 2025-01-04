import styled from 'styled-components';

interface CheckBoxProps {
  label?: string;
  name: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  visibleIcon?: boolean;
  margin?: string;
  checked: boolean;
  required?: boolean;
  optional?: boolean;
  visibleView?: boolean;
  fontSize?: string;
  value?: string;
  disabled?: boolean;
}

export default function CheckBox({
  label,
  name,
  onChange,
  checked,
  visibleView,
  margin,
  required,
  optional,
  fontSize,
  value,
  disabled,
}: CheckBoxProps) {
  return (
    <S.CheckBox $margin={margin}>
      <S.CheckBoxContainer className="wrapper" $fontSize={fontSize} $active={checked}>
        <input
          id={`checkbox-${name}`}
          type="checkbox"
          onChange={onChange}
          name={name}
          checked={checked}
          value={value}
          disabled={disabled}
        />
        <label htmlFor={`checkbox-${name}`}>
          {label && (
            <p className="label-text">
              {required && <span className="label-text__required">[필수]</span>}
              {optional && <span className="label-text__optional">[선택]</span>}
              <span>{label}</span>
            </p>
          )}
        </label>
      </S.CheckBoxContainer>
      {visibleView && <S.ViewIcon>보기</S.ViewIcon>}
    </S.CheckBox>
  );
}

const S = {
  CheckBox: styled.div<{ $margin?: string; $fontSize?: string }>`
    margin: ${(props) => props.$margin || 0};
    display: flex;
    align-items: center;
    justify-content: space-between;
    user-select: none;
    font-size: 13px;
    .view {
      white-space: nowrap;
      margin-left: 10px;
      color: ${(props) => props.theme.colors.gray600};
      &:hover {
        text-decoration: underline;
        color: ${(props) => props.theme.colors.blue700};
        text-decoration: underline;
        font-weight: 400;
      }
    }
  `,
  CheckBoxContainer: styled.div<{ $active?: boolean; $fontSize?: string }>`
    display: flex;
    align-items: center;
    justify-content: space-between;
    line-height: 1.2;
    &:hover {
      color: ${(props) => props.theme.colors.blue700};
    }

    input[type='checkbox'] {
      display: none;
    }

    input[type='checkbox']:checked + label:before {
      background-color: ${(props) => props.theme.colors.blue700};
      border: 2px solid ${(props) => props.theme.colors.blue700};
    }

    input[type='checkbox']:checked + label:after {
      content: '';
      position: absolute;
      left: 4px;
      top: 50%;
      transform: translateY(-50%);
      width: 16px;
      height: 17px;
      background-image: url('data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white"><path d="M9 16.2l-5.2-5.2L3 12.8l6 6 12-12-1.4-1.4-10.6 10.8z"/></svg>');
      background-size: contain;
      background-repeat: no-repeat;
      background-position: center;
    }

    label {
      color: ${(props) => props.theme.colors.gray700};
      font-size: ${(props) => props.$fontSize || '13px'};
      position: relative;
      padding-left: 30px;
      min-height: 24px;
      display: flex;
      align-items: center;
      cursor: pointer;
    }
    label:before {
      content: '';
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
      width: 22px;
      height: 22px;
      border: 2px solid #ccc;
      border-radius: 5px;
    }
    label:hover:before {
      border-color: #888;
      background-color: ${(props) => props.theme.colors.blue100};
      border: 2px solid ${(props) => props.theme.colors.blue700};
    }

    input[type='checkbox']:disabled + label:before {
      background-color: #ccc;
      border: 2px solid #ccc;
    }

    .label-text {
      font-weight: 300;
      ${(props) =>
        props.$active &&
        `
          color: ${props.theme.colors.blue700};
          font-weight: 400;
        `};
      &__required {
        color: ${(props) => props.theme.colors.blue700};
        padding-right: 2px;
      }
      &__optional {
        padding-right: 2px;
      }
    }
  `,
  ViewIcon: styled.i`
    white-space: nowrap;
    margin-left: 10px;
    color: ${(props) => props.theme.colors.gray600};
    cursor: pointer;
    &:hover {
      text-decoration: underline;
      color: ${(props) => props.theme.colors.blue700};
      text-decoration: underline;
      font-weight: 400;
    }
  `,
};

import styled, { css } from 'styled-components';
import { useFormContext, Path, FieldValues } from 'react-hook-form';

interface FormTagBoxProps<T> {
  name: Path<T>;
  labelFlexBasis?: string;
  readOnly?: boolean;
  required?: boolean;
  label?: string;
  placeholder?: string;
  maxWidth?: string;
  minWidth?: string;
}

export default function FormTagBox<T extends FieldValues>({
  name,
  label,
  labelFlexBasis,
  placeholder,
  readOnly,
  required,
  maxWidth,
  minWidth,
}: FormTagBoxProps<T>) {
  const { watch, setValue } = useFormContext<T>();

  const watchValue = watch(name);

  // const handleClickRemoveItem = (label: string) => {
  //   const findItem = watchValue.filter((element: string) => element !== label);
  //   setValue<string>(name, [...findItem]);
  // };

  return (
    <S.FormTagBox $maxWidth={maxWidth} $minWidth={minWidth}>
      {label && (
        <S.FormLabel
          className="input-label"
          htmlFor={name + '-FormTagBox'}
          required={required && !readOnly}
          labelFlexBasis={labelFlexBasis}
        >
          {label}
        </S.FormLabel>
      )}
      <S.TagContainer>
        {/* {placeholder && !watchValue && <p>{placeholder}</p>} */}

        <S.TagItem>숙식제공</S.TagItem>
        <S.TagItem>숙식제공</S.TagItem>
        <S.TagItem>숙식제공</S.TagItem>
        <S.TagItem>숙식제공</S.TagItem>
        <S.TagItem>숙식제공</S.TagItem>
        <S.TagItem>숙식제공</S.TagItem>
        <S.TagItem>숙식제공</S.TagItem>
      </S.TagContainer>
    </S.FormTagBox>
  );
}

const S = {
  FormTagBox: styled.div<{ $margin?: string; $width?: string; $maxWidth?: string; $minWidth?: string }>`
    min-height: 40px;
    margin: ${(props) => (props.$margin ? props.$margin : '0')};
    max-width: ${(props) => (props.$maxWidth ? props.$maxWidth : '100%')};
    min-width: ${(props) => (props.$minWidth ? props.$minWidth : 'auto')};
    width: ${(props) => (props.$width ? props.$width : '100%')};
    display: flex;
    align-items: center;
  `,
  FormLabel: styled.label<{ required?: boolean; labelFlexBasis?: string }>`
    color: ${({ theme }) => theme.colors.gray700};
    display: block;
    font-size: 14px;
    cursor: default;
    white-space: nowrap;
    flex-basis: ${(props) => props.labelFlexBasis || '150px'};
    flex-basis: 200px;
    ${(props) =>
      props.required &&
      css`
        &::after {
          content: '*';
          margin-left: 2px;
          vertical-align: top;
          color: crimson;
        }
      `};
  `,
  TagContainer: styled.div`
    border: 1px solid ${({ theme }) => theme.colors.gray300};
    width: 100%;
    box-sizing: border-box;
    max-width: auto;
    /* padding-left: 10px; */
    border-radius: 5px;
    font-size: 16px;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    font-size: 16px;
    overflow: hidden;
    p {
      color: ${(props) => props.theme.colors.gray400};
      font-size: 15px;
      font-weight: 300;
    }
  `,
  TagItem: styled.span`
    font-size: 13px;
    height: 25px;
    padding: 0 8px;
    border-radius: 30px;
    margin: 3px 5px;
    display: flex;
    align-items: center;
    background-color: ${(props) => props.theme.colors.gray100};
    cursor: pointer;
  `,
};

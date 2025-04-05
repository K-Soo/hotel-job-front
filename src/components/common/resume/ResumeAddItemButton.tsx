import styled, { css } from 'styled-components';
import Icon from '@/icons/Icon';

interface ResumeAddItemButtonProps {
  label: string;
  maxLength?: number;
  variant: 'blue' | 'green' | 'gray';
  onClick: () => void;
}

export default function ResumeAddItemButton({ label, maxLength, variant, onClick }: ResumeAddItemButtonProps) {
  return (
    <S.ResumeAddItemButton type="button" $variant={variant} onClick={onClick}>
      <Icon name="Plus24x24" width="20px" height="20px" margin="0 5px 0 0" />
      <span>{label}</span>
      {maxLength && <span className="count">{`(최대 ${maxLength}개)`}</span>}
    </S.ResumeAddItemButton>
  );
}

const S = {
  ResumeAddItemButton: styled.button<{ $variant: 'blue' | 'green' | 'gray' }>`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 50px;
    border-radius: 10px;
    cursor: pointer;
    /* margin-top: 30px; */
    .count {
      padding-left: 5px;
    }
    ${(props) =>
      props.$variant === 'blue' &&
      css`
        background-color: ${props.theme.colors.blue50};
        border: 1px solid ${props.theme.colors.blue300};
        color: ${props.theme.colors.blue500};
        &:hover {
          background-color: ${props.theme.colors.blue100};
          color: ${props.theme.colors.blue700};
        }
      `};

    ${(props) =>
      props.$variant === 'green' &&
      css`
        background-color: ${props.theme.colors.green50};
        border: 1px solid ${props.theme.colors.green300};
        color: ${props.theme.colors.green400};
        &:hover {
          background-color: ${props.theme.colors.green100};
          color: ${props.theme.colors.green700};
        }
      `};

    ${(props) =>
      props.$variant === 'gray' &&
      css`
        background-color: ${props.theme.colors.gray50};
        border: 1px solid ${props.theme.colors.gray300};
        color: ${props.theme.colors.gray600};
        &:hover {
          background-color: ${props.theme.colors.gray100};
          color: ${props.theme.colors.gray700};
        }
      `};
  `,
};

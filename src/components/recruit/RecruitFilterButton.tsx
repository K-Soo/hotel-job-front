import styled from 'styled-components';
import Icon from '@/icons/Icon';

interface RecruitFilterButtonProps {
  label: string;
  name?: string;
  margin?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  isTag?: boolean;
}

export default function RecruitFilterButton({ label, name, margin, onClick, isTag }: RecruitFilterButtonProps) {
  return (
    <S.RecruitFilterButton type="button" $margin={margin} name={name} $isTag={isTag}>
      <span>{label}</span>
      {!isTag && <Icon name="ArrowBottom14x14" width="14px" height="14px" margin="0 0 0 3px" />}
    </S.RecruitFilterButton>
  );
}

const S = {
  RecruitFilterButton: styled.button<{ $margin?: string; $isTag?: boolean }>`
    color: ${(props) => props.theme.colors.gray700};
    background-color: ${(props) => props.theme.colors.white};
    border: 1px solid ${(props) => props.theme.colors.gray200};
    padding: 0 15px;
    width: auto;
    height: 35px;
    border-radius: ${(props) => (props.$isTag ? '20px' : '6px')};
    font-size: 14px;
    cursor: pointer;
    margin: ${(props) => (props.$margin ? props.$margin : '0')};
    display: flex;
    align-items: center;
    justify-content: center;
    white-space: nowrap;
    &:hover {
      transition: 0.3s;
      background-color: ${(props) => props.theme.colors.gray};
      color: ${(props) => props.theme.colors.black200};
    }
  `,
};

import styled from 'styled-components';
import Icon from '@/icons/Icon';

interface RecruitTagButtonProps {
  label: string;
  name?: string;
  margin?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  value: string;
}

export default function RecruitTagButton({ label, name, margin, onClick, value }: RecruitTagButtonProps) {
  return (
    <S.RecruitTagButton type="button" $margin={margin} name={name} onClick={onClick} value={value}>
      <span>{label}</span>
    </S.RecruitTagButton>
  );
}

const S = {
  RecruitTagButton: styled.button<{ $margin?: string }>`
    color: ${(props) => props.theme.colors.gray700};
    background-color: ${(props) => props.theme.colors.white};
    border: 1px solid ${(props) => props.theme.colors.gray200};
    padding: 0 15px;
    width: auto;
    height: 35px;
    border-radius: 20px;
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

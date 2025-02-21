import styled from 'styled-components';
import Icon from '@/icons/Icon';

interface RemoveButtonProps {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

export default function RemoveButton({ onClick }: RemoveButtonProps) {
  return (
    <S.RemoveButton onClick={onClick}>
      <Icon name="CloseA24x24" width="20px" height="20px" />
    </S.RemoveButton>
  );
}

const S = {
  RemoveButton: styled.button`
    width: 25px;
    height: 25px;
    border-radius: 5px;
    background-color: ${(props) => props.theme.colors.red100};
    display: flex;
    align-items: center;
    justify-content: center;
    &:hover {
      background-color: ${(props) => props.theme.colors.red200};
    }
    svg {
      color: ${(props) => props.theme.colors.red400};
    }
  `,
};

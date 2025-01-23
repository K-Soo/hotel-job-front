import styled from 'styled-components';

interface RemoveButtonProps {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

export default function RemoveButton({ onClick }: RemoveButtonProps) {
  return <S.RemoveButton onClick={onClick}>RemoveButton</S.RemoveButton>;
}

const S = {
  RemoveButton: styled.button``,
};

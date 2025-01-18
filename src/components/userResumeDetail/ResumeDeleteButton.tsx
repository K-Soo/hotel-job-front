import styled from 'styled-components';

interface ResumeDeleteButtonProps {
  onClick: () => void;
}

export default function ResumeDeleteButton({ onClick }: ResumeDeleteButtonProps) {
  return <S.ResumeDeleteButton onClick={() => onClick()}>x</S.ResumeDeleteButton>;
}

const S = {
  ResumeDeleteButton: styled.button`
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 5px;
    background-color: ${({ theme }) => theme.colors.red300};
  `,
};

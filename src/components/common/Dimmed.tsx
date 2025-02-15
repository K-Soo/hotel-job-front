import styled from 'styled-components';

interface DimmedProps {
  text?: string;
  children?: React.ReactNode;
}

export default function Dimmed({ text, children }: DimmedProps) {
  return (
    <S.Dimmed>
      {children}
      {text && <p className="text">{text}</p>}
    </S.Dimmed>
  );
}

const S = {
  Dimmed: styled.div`
    background-color: rgba(0, 0, 0, 0.5);
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    border-radius: inherit;
    z-index: 1;
    .text {
      z-index: 2;
      color: ${({ theme }) => theme.colors.gray200};
      font-weight: 300;
    }
  `,
};

import styled from 'styled-components';

interface DimmedProps {
  children?: React.ReactNode;
}

export default function Dimmed({ children }: DimmedProps) {
  return <S.Dimmed>{children}</S.Dimmed>;
}

const S = {
  Dimmed: styled.div`
    background-color: rgba(0, 0, 0, 0.7);
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
  `,
};

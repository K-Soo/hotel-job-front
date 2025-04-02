import styled from 'styled-components';

interface HeaderProps {
  position?: 'sticky' | 'static';
  borderBottom?: boolean;
  children: React.ReactNode;
}

export function Header({ children, borderBottom = true, position = 'sticky' }: HeaderProps) {
  return (
    <S.Header $position={position} $borderBottom={borderBottom}>
      {children}
    </S.Header>
  );
}

const S = {
  Header: styled.header<{ $position: 'sticky' | 'static'; $borderBottom: boolean }>`
    position: ${(props) => props.$position};
    top: -25px;
    border-bottom: ${(props) => (props.$borderBottom ? '1px solid #e5e8eb' : 'none')};
    z-index: 5;
    background-color: rgba(255, 255, 255, 0.8);
    backdrop-filter: blur(10px);
    ${(props) => props.theme.media.tablet`
      top: 0;
      border-bottom: none;
      background-color: initial;
    `};
  `,
};

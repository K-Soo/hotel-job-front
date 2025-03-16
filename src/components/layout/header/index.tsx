import styled from 'styled-components';

interface HeaderProps {
  children: React.ReactNode;
}

export function Header({ children }: HeaderProps) {
  return <S.Header>{children}</S.Header>;
}

const S = {
  Header: styled.header`
    position: sticky;
    top: -25px;
    border-bottom: 1px solid ${(props) => props.theme.colors.gray200};
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

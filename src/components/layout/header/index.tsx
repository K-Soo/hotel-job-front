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
    box-shadow: 0 1px 0 0 rgba(0, 0, 0, 0.1);
    z-index: 5;
    background-color: ${(props) => props.theme.colors.white};
    ${(props) => props.theme.media.tablet`
      top: 0;
      padding: 0 15px;
    `};
  `,
};

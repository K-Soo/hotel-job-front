import styled from 'styled-components';

interface MobileNavigationProps {}

export function MobileNavigation({}: MobileNavigationProps) {
  return <S.MobileNavigation>MobileNavigation</S.MobileNavigation>;
}

const S = {
  MobileNavigation: styled.div`
    display: none;
    height: 50px;
    ${(props) => props.theme.media.tablet`
      display: block;
    `}
  `,
};

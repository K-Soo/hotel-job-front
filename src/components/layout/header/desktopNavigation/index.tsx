import styled from 'styled-components';
import Navigation from '@/components/layout/header/Navigation';
import UtilityMenu from '@/components/layout/header/UtilityMenu';

export function DesktopNavigation() {
  return (
    <S.DesktopNavigation>
      <UtilityMenu />
      <Navigation />
    </S.DesktopNavigation>
  );
}

const S = {
  DesktopNavigation: styled.div`
    margin: 0 auto;
    max-width: 1024px;
    ${(props) => props.theme.media.laptop`
      padding: 0 15px;
    `}
    ${(props) => props.theme.media.tablet`
      display: none;
    `}
  `,
};

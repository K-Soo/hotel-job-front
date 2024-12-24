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
    /* height: 110px; */
    ${(props) => props.theme.media.tablet`
      display: none;
    `}
  `,
};

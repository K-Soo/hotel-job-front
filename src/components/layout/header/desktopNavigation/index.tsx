import styled from 'styled-components';
import Navigation from '@/components/layout/header/Navigation';
import UtilityMenu from '@/components/layout/header/UtilityMenu';
interface DesktopNavigationProps {}

export function DesktopNavigation({}: DesktopNavigationProps) {
  return (
    <S.DesktopNavigation>
      <UtilityMenu />
      <Navigation />
    </S.DesktopNavigation>
  );
}

const S = {
  DesktopNavigation: styled.div`
    ${(props) => props.theme.media.tablet`
      display: none;
    `}
  `,
};

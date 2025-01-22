import styled from 'styled-components';
import { useRouter } from 'next/router';
import Logo from '@/components/common/Logo';
import path from '@/constants/path';
import Icon from '@/icons/Icon';
import { useSetRecoilState } from 'recoil';
import { hamburgerNavigationAtom } from '@/recoil/hamburgerNavigation';

interface MobileNavigationProps {
  backIcon?: boolean;
  profileIcon?: boolean;
  hamburgerIcon?: boolean;
  logoIcon?: boolean;
  homeIcon?: boolean;
  backUrl?: string;
  title?: string;
}

export function MobileNavigation({ title, backUrl, backIcon, profileIcon, logoIcon, homeIcon, hamburgerIcon }: MobileNavigationProps) {
  const router = useRouter();

  const setHamburgerNavigationAtomState = useSetRecoilState(hamburgerNavigationAtom);

  const handleClickBack = () => {
    if (!backUrl) return;
    router.push(backUrl);
  };

  return (
    <S.MobileNavigation>
      <div className="left">
        {backIcon && <Icon name="ArrowLeft24x24" width="24px" height="24px" onClick={handleClickBack} />}
        {homeIcon && <i onClick={() => router.push(path.HOME)}>home</i>}
        {logoIcon && <Logo size="small" margin="0" />}
      </div>

      <div className="title">{title && <h3>{title}</h3>}</div>

      <div className="right">
        {profileIcon && <i>profile</i>}
        {hamburgerIcon && (
          <Icon name="ListA24x24" width="24px" height="24px" onClick={() => setHamburgerNavigationAtomState({ isOpen: true })} />
        )}
      </div>
    </S.MobileNavigation>
  );
}

const S = {
  MobileNavigation: styled.div`
    display: none;
    height: 50px;
    ${(props) => props.theme.media.tablet`
      display: flex;
      align-items: center;
      justify-content: space-between;
    `}
    .left {
      flex-basis: 50px;
      height: 100%;
      display: flex;
      align-items: center;
    }
    .title {
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      flex-basis: calc(100% - 100px);
      font-size: 16px;
      font-weight: 500;
    }
    .right {
      flex-basis: 50px;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: end;
    }
  `,
};

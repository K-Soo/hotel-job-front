import styled from 'styled-components';
import { useRouter } from 'next/router';
import Logo from '@/components/common/Logo';
import path from '@/constants/path';
interface MobileNavigationProps {
  backIcon?: boolean;
  profileIcon?: boolean;
  logoIcon?: boolean;
  homeIcon?: boolean;
  backUrl?: string;
  title?: string;
}

export function MobileNavigation({ title, backUrl, backIcon, profileIcon, logoIcon, homeIcon }: MobileNavigationProps) {
  const router = useRouter();

  const handleClickBack = () => {
    if (!backUrl) return;
    router.push(backUrl);
  };

  return (
    <S.MobileNavigation>
      <div className="left" onClick={handleClickBack}>
        {backIcon && <i>back</i>}
        {homeIcon && <i onClick={() => router.push(path.HOME)}>home</i>}
        {logoIcon && <Logo size="small" margin="0" />}
      </div>

      <div className="title">{title && <h3>{title}</h3>}</div>
      <div className="right">{profileIcon && <i>profile</i>}</div>
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
    }
  `,
};

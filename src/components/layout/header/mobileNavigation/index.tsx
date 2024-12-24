import styled from 'styled-components';
import { useRouter } from 'next/router';

interface MobileNavigationProps {
  backIcon?: boolean;
  profileIcon?: boolean;
  path?: string;
  title?: string;
}

export function MobileNavigation({ title, path, backIcon, profileIcon }: MobileNavigationProps) {
  const router = useRouter();

  const handleClickBack = () => {
    if (!path) return;
    router.push(path);
  };

  return (
    <S.MobileNavigation>
      <div className="left" onClick={handleClickBack}>
        {backIcon && <i>back</i>}
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

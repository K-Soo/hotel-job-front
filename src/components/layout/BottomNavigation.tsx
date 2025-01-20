import styled, { css } from 'styled-components';
import path from '@/constants/path';
import useAuth from '@/hooks/useAuth';
import { useRouter } from 'next/router';
import { useSetRecoilState } from 'recoil';
import { bottomSheetAtom } from '@/recoil/bottomSheet';
import Portal from '@/components/common/Portal';
import Icon from '@/icons/Icon';

export default function BottomNavigation() {
  const router = useRouter();
  const setBottomSheetAtom = useSetRecoilState(bottomSheetAtom);

  const { isAuthenticated, role } = useAuth();

  const handleLink = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const { name } = event.currentTarget;
    router.push(name);
  };

  const handleClickPopUpSheet = () => {
    setBottomSheetAtom((prev) => ({ ...prev, isOpen: !prev.isOpen }));
  };

  return (
    <Portal>
      <S.BottomNavigation>
        <div className="item">
          <S.ButtonLink name={path.HOME} onClick={handleLink}>
            <Icon name="Home24x24" width="24px" height="24px" />
            <S.IconText $active={router.pathname === path.HOME}>홈</S.IconText>
          </S.ButtonLink>
        </div>

        <div className="item">
          <S.ButtonLink name={path.RECRUIT} onClick={handleLink}>
            <Icon name="Rocket24x24" width="24px" height="24px" />
            <S.IconText $active={router.pathname === path.RECRUIT}>채용</S.IconText>
          </S.ButtonLink>
        </div>

        <div className="item">
          <S.ButtonLink name={path.TALENT} onClick={handleLink}>
            <Icon name="StickerSmileSquare24x24" width="24px" height="24px" />
            <S.IconText $active={router.pathname === path.TALENT}>인재</S.IconText>
          </S.ButtonLink>
        </div>

        {isAuthenticated && (
          <div className="item">
            <S.ButtonLink name={role === 'JOB_SEEKER' ? path.USER : path.EMPLOYER} onClick={handleLink}>
              <Icon name="StickerSmileSquare24x24" width="24px" height="24px" />
              <S.IconText $active={router.pathname === path.USER}>MY</S.IconText>
            </S.ButtonLink>
          </div>
        )}

        {!isAuthenticated && (
          <div className="item">
            <S.ButtonLink name={path.SIGN_IN} onClick={handleLink}>
              <Icon name="UserRounded24x24" width="24px" height="24px" />
              <S.IconText $active={router.pathname === path.SIGN_IN}>로그인</S.IconText>
            </S.ButtonLink>
          </div>
        )}
      </S.BottomNavigation>
    </Portal>
  );
}

const S = {
  BottomNavigation: styled.nav`
    display: none;
    z-index: 10;
    ${(props) => props.theme.media.tablet`
      display: flex;
    `};
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 75px;
    box-sizing: border-box;
    background-color: ${(props) => props.theme.colors.white};
    padding-bottom: 5px;
    /* border-top-left-radius: 10px; */
    /* border-top-right-radius: 10px; */
    /* box-shadow: 0 -1px 15px rgba(0, 0, 0, 0.1); */
    border-top: 1px solid ${(props) => props.theme.colors.gray100};
    .item {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  `,
  ButtonLink: styled.button`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 55px;
    height: 55px;
    border-radius: 10px;
  `,
  IconText: styled.span<{ $active: boolean }>`
    font-size: 13px;
    padding-top: 5px;
    color: ${(props) => props.theme.colors.gray500};
    ${(props) =>
      props.$active &&
      css`
        color: ${props.theme.colors.black200};
        font-weight: 500;
      `};
  `,
};

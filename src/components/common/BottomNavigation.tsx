import styled from 'styled-components';
import path from '@/constants/path';
import useAuth from '@/hooks/useAuth';
import { useRouter } from 'next/router';
import { useSetRecoilState } from 'recoil';
import { bottomSheetAtom } from '@/recoil/bottomSheet';
import Portal from '@/components/common/Portal';

export default function BottomNavigation() {
  const router = useRouter();
  const setBottomSheetAtom = useSetRecoilState(bottomSheetAtom);

  const { isAuthenticated } = useAuth();

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
        <S.ButtonLink className="items" name={path.HOME} onClick={handleLink}>
          <i>IC</i>
          <span>홈</span>
        </S.ButtonLink>
        <S.ButtonLink className="items" name={path.RECRUIT} onClick={handleLink}>
          <i>IC</i>
          <span>채용정보</span>
        </S.ButtonLink>
        <S.ButtonLink className="items" name={path.TALENT} onClick={handleLink}>
          <i>IC</i>
          <span>인재풀</span>
        </S.ButtonLink>

        {isAuthenticated && (
          <S.ButtonLink className="items" onClick={handleClickPopUpSheet}>
            <i>IC</i>
            <span>MY</span>
          </S.ButtonLink>
        )}
        {!isAuthenticated && (
          <S.ButtonLink className="items" name={path.SIGN_IN} onClick={handleLink}>
            <i>IC</i>
            <span>LOGIN</span>
          </S.ButtonLink>
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
    height: 70px;
    box-sizing: border-box;
    background-color: ${(props) => props.theme.colors.white};
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    box-shadow: 0 -1px 15px rgba(0, 0, 0, 0.1);
    .items {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      font-size: 14px;
      svg {
      }
    }
  `,
  ButtonLink: styled.button``,
};

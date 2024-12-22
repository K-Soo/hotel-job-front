import styled from 'styled-components';
import Link from 'next/link';
import path from '@/constants/path';
import { useRecoilValue } from 'recoil';
import { authAtom, authSelector } from '@/recoil/auth';
import { Post, Get } from '@/apis';
import Icon from '@/icons/Icon';

export default function Navigation() {
  const authSelectorValue = useRecoilValue(authSelector);

  const handleClickSignOut = async () => {
    try {
      const response = await Post.signOut();
      console.log('로그아웃 API : ', response);
    } catch (error) {
      alert('로그아웃 중 에러가 발생했습니다.');
    } finally {
      window.location.href = '/sign-in';
    }
  };

  return (
    <S.Navigation>
      <div className="items">
        <Link className="items__item" href={path.RECRUIT}>
          채용정보
        </Link>
        <Link className="items__item" href={path.TALENT}>
          인재풀
        </Link>
      </div>
      <div className="route-box">
        {authSelectorValue.isLogin && (
          <Link href={path.ACCOUNT}>
            <Icon name="User" />
          </Link>
        )}
        {!authSelectorValue.isLogin && <Link href={path.SIGN_IN}>로그인</Link>}
        {/* {authSelectorValue.isLogin && (
          <Button label="SIGN OUT" onClick={() => handleClickSignOut()} variant="primary" height="30px" width="80px" margin="0 0 0 15px" />
        )} */}
      </div>
    </S.Navigation>
  );
}

const S = {
  Navigation: styled.nav`
    max-width: 1024px;
    margin: 0 auto;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .items {
      &__item {
        margin-right: 15px;
      }
    }
    .route-box {
      height: 100%;
      display: flex;
      align-items: center;
      font-size: 14px;
    }
  `,
};

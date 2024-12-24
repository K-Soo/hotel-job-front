import styled from 'styled-components';
import Link from 'next/link';
import path from '@/constants/path';
import { Post } from '@/apis';
import Icon from '@/icons/Icon';
import Logo from '@/components/common/Logo';
import useAuth from '@/hooks/useAuth';
import { motion } from 'framer-motion';

export default function Navigation() {
  const { isAuthenticated } = useAuth();

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
      <S.Menu>
        <Logo size="small" margin="0 30px 0 0" />

        <MotionLink className="item" href={path.RECRUIT}>
          채용정보
        </MotionLink>

        <MotionLink className="item" href={path.TALENT}>
          인재풀
        </MotionLink>
      </S.Menu>

      <S.Utility>
        {isAuthenticated && (
          <Link href={path.USER}>
            <Icon name="User" />
          </Link>
        )}

        {!isAuthenticated && <Link href={path.SIGN_IN}>로그인</Link>}

        {/* {authSelectorValue.isLogin && (
          <Button label="SIGN OUT" onClick={() => handleClickSignOut()} variant="primary" height="30px" width="80px" margin="0 0 0 15px" />
        )} */}
      </S.Utility>
    </S.Navigation>
  );
}

const MotionLink = motion(Link);

const S = {
  Navigation: styled.nav`
    max-width: 1024px;
    margin: 0 auto;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  `,
  Menu: styled.div`
    display: flex;
    align-items: center;
    height: 100%;
    .item {
      margin-right: 15px;
      font-size: 15px;
      color: ${(props) => props.theme.colors.gray700};
      height: 45px;
      padding: 0 12px;
      border-radius: 5px;
      display: flex;
      align-items: center;
      justify-content: center;
      &:hover {
        background-color: ${(props) => props.theme.colors.gray100};
        color: ${(props) => props.theme.colors.black};
        transition: all 0.3s;
      }
    }
  `,
  Utility: styled.div`
    display: flex;
    align-items: center;
    height: 100%;
  `,
};

import styled from 'styled-components';
import Link from 'next/link';
import path from '@/constants/path';
import { Auth } from '@/apis';
import Icon from '@/icons/Icon';
import Logo from '@/components/common/Logo';
import useAuth from '@/hooks/useAuth';
import { motion } from 'framer-motion';
import Button from '@/components/common/style/Button';
import { useRouter } from 'next/router';

export default function Navigation() {
  const router = useRouter();
  const { isAuthenticated, role } = useAuth();

  const handleClickSignOut = async () => {
    try {
      const response = await Auth.signOut();
      console.log('로그아웃 API : ', response);
    } catch (error) {
      console.log('error: ', error);
    } finally {
      window.location.href = '/sign-in';
    }
  };

  const handleClickUserIcon = () => {
    if (role === 'JOB_SEEKER') {
      router.push(path.USER);
    }
    if (role === 'EMPLOYER') {
      router.push(path.EMPLOYER);
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
          인재
        </MotionLink>

        <MotionLink className="item" href={path.TALENT}>
          고객센터
        </MotionLink>
      </S.Menu>

      <S.Utility>
        {isAuthenticated && (
          <button onClick={handleClickUserIcon}>
            <Icon name="User" />
          </button>
        )}

        {!isAuthenticated && (
          <Button
            margin="0 20px 0 0"
            label="기업회원/채용광고(무료 체험 제공)"
            variant="secondary200"
            height="40px"
            onClick={() => router.push(path.LANDING_EMPLOYER)}
            fontSize="15px"
          />
        )}

        {!isAuthenticated && (
          <Button label="로그인" variant="tertiary" height="40px" onClick={() => router.push(path.SIGN_IN)} fontSize="15px" />
        )}

        {/* {isAuthenticated && (
          <Button label="SIGN OUT" onClick={() => handleClickSignOut()} variant="primary" height="30px" width="80px" margin="0 0 0 15px" />
        )} */}
      </S.Utility>
    </S.Navigation>
  );
}

const MotionLink = motion(Link);

const S = {
  Navigation: styled.nav`
    width: 100%;
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
      height: 40px;
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

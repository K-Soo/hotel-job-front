import styled from 'styled-components';
import Button from '@/components/common/style/Button';
import useAuth from '@/hooks/useAuth';
import { RecruitmentStatusKeys } from '@/types';
interface RecruitDetailBottomNavigationProps {
  applyStatus: 'available' | 'duplicate' | 'idle';
  recruitmentStatus: RecruitmentStatusKeys;
  setIsOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  handleSigninThenApply: () => void;
}

export default function RecruitDetailBottomNavigation({
  applyStatus,
  recruitmentStatus,
  setIsOpenModal,
  handleSigninThenApply,
}: RecruitDetailBottomNavigationProps) {
  const { isAuthenticated, role, isAuthLoading } = useAuth();

  if (isAuthLoading) {
    return (
      <S.RecruitDetailBottomNavigation>
        <div className="wrapper">
          <Button label="" variant="secondary" height="45px" borderRadius="10px" disabled isLoading={true} />
        </div>
      </S.RecruitDetailBottomNavigation>
    );
  }

  // 비 로그인
  if (!isAuthenticated) {
    return (
      <S.RecruitDetailBottomNavigation>
        <div className="wrapper">
          {recruitmentStatus === 'CLOSED' && <Button label="모집 마감" variant="secondary" height="45px" borderRadius="10px" disabled />}
          {recruitmentStatus === 'PROGRESS' && (
            <Button
              label="로그인 후 지원하기"
              variant="primary"
              height="45px"
              borderRadius="10px"
              onClick={() => handleSigninThenApply()}
            />
          )}
        </div>
      </S.RecruitDetailBottomNavigation>
    );
  }

  return (
    <S.RecruitDetailBottomNavigation>
      <div className="wrapper">
        {recruitmentStatus === 'CLOSED' && <Button label="모집 마감" variant="secondary" height="45px" borderRadius="10px" disabled />}

        {recruitmentStatus === 'PROGRESS' && (
          <>
            {/* TODO - bookmark */}
            {/* <S.BookMarkIcon>
            <Icon name="Bookmark24x24" height="32px" width="32px" />
          </S.BookMarkIcon> */}

            {role === 'JOB_SEEKER' && (
              <Button
                label={applyStatus === 'available' ? '지원하기' : '지원완료'}
                variant="primary"
                height="45px"
                borderRadius="10px"
                onClick={() => setIsOpenModal(true)}
                disabled={applyStatus === 'duplicate'}
              />
            )}

            {role !== 'JOB_SEEKER' && <Button label="지원자 전용" variant="secondary" height="45px" borderRadius="10px" disabled />}
          </>
        )}
      </div>
    </S.RecruitDetailBottomNavigation>
  );
}

const S = {
  RecruitDetailBottomNavigation: styled.div`
    display: none;
    position: fixed;
    background-color: white;
    z-index: 10;
    bottom: 0;
    width: 100%;
    height: 80px;
    left: 0;
    right: 0;
    align-items: center;
    justify-content: center;
    .wrapper {
      width: 100%;
      height: 100%;
      position: relative;
      padding: 0 15px;
      &::after {
        content: '';
        position: absolute;
        top: -20px;
        left: 0;
        right: 0;
        height: 20px;
        background: linear-gradient(rgba(255, 255, 255, 0), #fff);
        z-index: 1;
      }
    }

    ${(props) => props.theme.media.tablet`
      display: flex;
    `};
  `,
  BookMarkIcon: styled.div`
    width: 50px;
    height: 45px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 5px;
    margin-right: 15px;
    background-color: ${(props) => props.theme.colors.gray100};
    svg {
      color: #999;
    }
  `,
};

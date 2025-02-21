import styled from 'styled-components';
import Button from '@/components/common/style/Button';
import useAuth from '@/hooks/useAuth';
import { useRouter } from 'next/router';
import path from '@/constants/path';
import { RecruitmentStatusKeys } from '@/types';
interface RecruitDetailBottomNavigationProps {
  applyStatus: 'available' | 'duplicate' | 'idle';
  recruitmentStatus: RecruitmentStatusKeys;
  setIsOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function RecruitDetailBottomNavigation({
  applyStatus,
  recruitmentStatus,
  setIsOpenModal,
}: RecruitDetailBottomNavigationProps) {
  const { isAuthenticated, role } = useAuth();
  const router = useRouter();

  // 비 로그인
  if (!isAuthenticated) {
    return (
      <S.RecruitDetailBottomNavigation>
        {recruitmentStatus === 'CLOSED' && <Button label="모집 마감" variant="secondary" height="45px" borderRadius="5px" disabled />}
        {recruitmentStatus === 'PROGRESS' && (
          <Button label="로그인 후 지원하기" variant="primary" height="45px" borderRadius="5px" onClick={() => router.push(path.SIGN_IN)} />
        )}
      </S.RecruitDetailBottomNavigation>
    );
  }

  return (
    <S.RecruitDetailBottomNavigation>
      {recruitmentStatus === 'CLOSED' && <Button label="모집 마감" variant="secondary" height="45px" borderRadius="5px" disabled />}

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
              borderRadius="5px"
              onClick={() => setIsOpenModal(true)}
              disabled={applyStatus === 'duplicate'}
            />
          )}

          {role !== 'JOB_SEEKER' && <Button label="지원자 전용" variant="secondary" height="45px" borderRadius="5px" disabled />}
        </>
      )}
    </S.RecruitDetailBottomNavigation>
  );
}

const S = {
  RecruitDetailBottomNavigation: styled.div`
    display: none;
    border-top: 1px solid ${(props) => props.theme.colors.gray200};
    position: fixed;
    background-color: white;
    z-index: 10;
    bottom: 0;
    width: 100%;
    height: 65px;
    left: 0;
    right: 0;
    padding: 0 15px;
    align-items: center;
    justify-content: center;
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

import React from 'react';
import styled from 'styled-components';
import Button from '@/components/common/style/Button';
import useAuth from '@/hooks/useAuth';
import RecruitDetailApplyResumeForm from '@/components/recruitDetail/RecruitDetailApplyResumeForm';
import { RecruitmentStatusKeys } from '@/types';
interface RecruitDetailSideMenuProps {
  managerName: string;
  managerNumber: string;
  handleClickApply: () => void;
  isOpenApplyForm: boolean;
  isApplyCheckError: boolean;
  isApplyCheckLoading: boolean;
  applyStatus: 'available' | 'duplicate' | 'idle';
  selectedResume: string | null;
  setSelectedResume: React.Dispatch<React.SetStateAction<string | null>>;
  setIsOpenApplyForm: React.Dispatch<React.SetStateAction<boolean>>;
  recruitmentStatus: RecruitmentStatusKeys;
  fetchSubmitApply: () => Promise<void>;
  handleSigninThenApply: () => void;
}

export default function RecruitDetailSideMenu({
  managerName,
  managerNumber,
  handleClickApply,
  isOpenApplyForm,
  isApplyCheckError,
  applyStatus,
  isApplyCheckLoading,
  fetchSubmitApply,
  selectedResume,
  setIsOpenApplyForm,
  recruitmentStatus,
  setSelectedResume,
  handleSigninThenApply,
}: RecruitDetailSideMenuProps) {
  const { isAuthenticated, role, isAuthLoading } = useAuth();

  if (isAuthLoading) {
    return (
      <S.RecruitDetailSideMenu>
        <Button label="" variant="secondary" height="50px" fontSize="16px" borderRadius="10px" isLoading={true} />
      </S.RecruitDetailSideMenu>
    );
  }

  if (!isAuthenticated) {
    return (
      <S.RecruitDetailSideMenu>
        <Button
          label="로그인 후 지원하기"
          variant="primary"
          height="50px"
          borderRadius="10px"
          onClick={() => handleSigninThenApply()}
          fontSize="16px"
        />
      </S.RecruitDetailSideMenu>
    );
  }

  if (recruitmentStatus === 'CLOSED') {
    return (
      <S.RecruitDetailSideMenu>
        <Button label="모집 마감" variant="secondary" height="50px" borderRadius="10px" fontSize="18px" disabled />
      </S.RecruitDetailSideMenu>
    );
  }

  if (isAuthenticated && role !== 'JOB_SEEKER') {
    return (
      <S.RecruitDetailSideMenu>
        <Button label="지원자 전용" variant="secondary" height="50px" borderRadius="10px" fontSize="18px" disabled />
      </S.RecruitDetailSideMenu>
    );
  }

  if (role === 'JOB_SEEKER') {
    return (
      <S.RecruitDetailSideMenu>
        {!isOpenApplyForm && !isApplyCheckError && (
          <Button
            label={applyStatus === 'available' ? '지원하기' : '지원완료'}
            variant="primary"
            height="50px"
            borderRadius="10px"
            onClick={handleClickApply}
            fontSize="18px"
            disabled={applyStatus === 'duplicate'}
            isLoading={isApplyCheckLoading}
          />
        )}

        {isApplyCheckError && <Button label="지원불가" variant="secondary" height="50px" borderRadius="10px" fontSize="18px" disabled />}

        {isOpenApplyForm && (
          <RecruitDetailApplyResumeForm
            selectedResume={selectedResume}
            setSelectedResume={setSelectedResume}
            setIsOpenApplyForm={setIsOpenApplyForm}
            fetchSubmitApply={fetchSubmitApply}
          />
        )}

        <div className="info-box">
          <div className="info-box__item">
            <span>담당자</span>
            <em>{managerName}</em>
          </div>
          <div className="info-box__item">
            <span>연락처</span>
            <em>{managerNumber}</em>
          </div>
        </div>

        {/* TODO - 마감일 */}
        {/* <div className="period-box"></div> */}
      </S.RecruitDetailSideMenu>
    );
  }

  return (
    <S.RecruitDetailSideMenu>
      <Button label="지원자 전용" variant="secondary" height="50px" borderRadius="10px" fontSize="18px" disabled />

      <div className="info-box">
        <div className="info-box__item">
          <span>담당자</span>
          <em>{managerName}</em>
        </div>
        <div className="info-box__item">
          <span>연락처</span>
          <em>{managerNumber}</em>
        </div>
      </div>

      {/* TODO - 마감일 */}
      {/* <div className="period-box"></div> */}
    </S.RecruitDetailSideMenu>
  );
}

const S = {
  RecruitDetailSideMenu: styled.div`
    flex: 0 0 330px;
    position: sticky;
    top: 90px;
    height: 400px;
    margin-left: 30px;
    background-color: ${({ theme }) => theme.colors.white};
    ${(props) => props.theme.media.tablet`
      display: none;
    `};
    .info-box {
      position: relative;
      background-color: ${(props) => props.theme.colors.gray};
      border-radius: 10px;
      padding: 20px;
      margin-top: 20px;
      &__item {
        margin-bottom: 15px;
        font-size: 15px;
        display: flex;
        color: ${(props) => props.theme.colors.black200};
        span {
          flex: 0 0 100px;
          display: inline-block;
        }
        &:last-child {
          margin-bottom: 0;
        }
      }
    }
  `,
};

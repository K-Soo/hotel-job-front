import React from 'react';
import styled from 'styled-components';
import Button from '@/components/common/style/Button';
import Dimmed from '@/components/common/Dimmed';
import useAuth from '@/hooks/useAuth';
import path from '@/constants/path';
import { useRouter } from 'next/router';

interface RecruitDetailSideMenuProps {
  managerName: string;
  managerNumber: string;
  children: React.ReactNode;
}

export default function RecruitDetailSideMenu({ managerName, managerNumber, children }: RecruitDetailSideMenuProps) {
  const { isAuthenticated, isAuthIdle } = useAuth();
  const router = useRouter();

  return (
    <S.RecruitDetailSideMenu>
      {children}
      <div className="info-box">
        {!isAuthIdle && !isAuthenticated && (
          <Dimmed>
            <Button
              label="로그인/회원가입"
              variant="secondary200"
              height="40px"
              width="140px"
              onClick={() => router.push(path.SIGN_IN)}
              fontSize="14px"
            />
          </Dimmed>
        )}
        <div className="info-box__item">
          <span>담당자</span>
          <em>{managerName}</em>
        </div>
        <div className="info-box__item">
          <span>연락처</span>
          <em>{managerNumber}</em>
        </div>
      </div>
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

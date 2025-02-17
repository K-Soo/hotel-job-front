import { ApplicationHistory } from '@/types';
import styled from 'styled-components';
import DesktopCard from '@/components/userApplicationHistory/applicationHistoryTable/DesktopCard';
import MobileCard from '@/components/userApplicationHistory/applicationHistoryTable/MobileCard';
import React from 'react';
import useResponsive from '@/hooks/useResponsive';

interface RecruitmentTableProps {
  children: React.ReactNode;
}

interface ApplicationHistoryTableBodyProps {
  data: ApplicationHistory[];
  handleClickApplicant: (applicant: ApplicationHistory) => void;
}

export default function ApplicationHistoryTable({ children }: RecruitmentTableProps) {
  return <S.ApplicationHistoryTable>{children}</S.ApplicationHistoryTable>;
}

function ApplicationHistoryTableHeader() {
  return (
    <S.ApplicationHistoryTableHeader>
      <span className="row hotel">업체명</span>
      <span className="row position">포지션</span>
      <span className="row review-stage-status">진행상태</span>
      <span className="row application-status">지원상태</span>
      <span className="row date">지원일</span>
    </S.ApplicationHistoryTableHeader>
  );
}

function ApplicationHistoryTableBody({ data, handleClickApplicant }: ApplicationHistoryTableBodyProps) {
  const { isTablet } = useResponsive();
  return (
    <S.ApplicationHistoryTableBody>
      {data.map((item) => (
        <React.Fragment key={item.id}>
          {!isTablet && <DesktopCard item={item} handleClickApplicant={handleClickApplicant} />}
          {isTablet && <MobileCard item={item} handleClickApplicant={handleClickApplicant} />}
        </React.Fragment>
      ))}
    </S.ApplicationHistoryTableBody>
  );
}

const S = {
  ApplicationHistoryTable: styled.div`
    width: 100%;
    height: auto;
  `,
  ApplicationHistoryTableHeader: styled.div`
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: space-around;
    background-color: ${(props) => props.theme.colors.blue};
    border-top: 1px solid ${(props) => props.theme.colors.black600};
    border-bottom: 1px solid ${(props) => props.theme.colors.gray200};
    .row {
      font-size: 14px;
      text-align: center;
      flex-wrap: nowrap;
      white-space: nowrap;
      padding: 0 10px;
      font-weight: 350;
    }
    .hotel {
      flex: 0 0 120px;
    }
    .position {
      flex: 1;
      text-align: left;
    }
    .review-stage-status {
      flex: 0 0 100px;
    }
    .application-status {
      flex: 0 0 80px;
    }
    .date {
      flex: 0 0 120px;
    }
  `,
  ApplicationHistoryTableBody: styled.div``,
};

ApplicationHistoryTable.Header = ApplicationHistoryTableHeader;
ApplicationHistoryTable.Body = ApplicationHistoryTableBody;

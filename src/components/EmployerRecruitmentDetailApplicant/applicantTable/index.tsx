import React from 'react';
import styled, { css } from 'styled-components';
import CheckBox from '@/components/common/style/CheckBox';
import { EmployerReviewStageStatusKey, RecruitmentDetailApplicantListItem } from '@/types';
import { EMPLOYER_REVIEW_STAGE_STATUS } from '@/constants/application';
import ResumeBodyRow from '@/components/EmployerRecruitmentDetailApplicant/applicantTable/ResumeBodyRow';
import StepBodyRow from '@/components/EmployerRecruitmentDetailApplicant/applicantTable/StepBodyRow';
import DateBodyRow from '@/components/EmployerRecruitmentDetailApplicant/applicantTable/DateBodyRow';
import ProfileBodyRow from '@/components/EmployerRecruitmentDetailApplicant/applicantTable/ProfileBodyRow';
import { EDUCATION_LEVEL } from '@/constants';
import { CAREER_LEVEL } from '@/constants/resume';

interface ApplicantTableProps {
  children: React.ReactNode;
}
interface ApplicantTableBody {
  data: RecruitmentDetailApplicantListItem[];
  checkedApplicants: RecruitmentDetailApplicantListItem[];
  handleChangeCheckApplicant: (resumeSnapshot: RecruitmentDetailApplicantListItem) => void;
  fetchUpdateEmployerReviewStageStatus: (id: number, stage: EmployerReviewStageStatusKey) => Promise<void>;
  handleClickResumePreview: (item: RecruitmentDetailApplicantListItem) => void;
  handleClickNotifyOneApplicant: (resumeSnapshot: RecruitmentDetailApplicantListItem) => void;
}

export default function ApplicantTable({ children }: ApplicantTableProps) {
  return <StyledTable>{children}</StyledTable>;
}

const CommonFlex = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const StyledTable = styled.div`
  box-sizing: border-box;
`;

function ApplicantTableHeader() {
  return (
    <StyledTableHeader>
      <span className="header-row check">
        <CheckBox className="row-check" checked={false} name={'ch'} onChange={() => {}} />
      </span>
      <span className="header-row status">전형/합격 여부</span>
      <span className="header-row name">이름/나이</span>
      <span className="header-row career">경력/신입</span>
      <span className="header-row education">최종 학력</span>
      <span className="header-row date">지원일</span>
      <span className="header-row step">전형/발표</span>
      <span className="header-row resume">분류</span>
    </StyledTableHeader>
  );
}

const StyledTableHeader = styled.div`
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${(props) => props.theme.colors.gray};
  border-bottom: 1px solid ${(props) => props.theme.colors.gray300};
  .header-row {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    text-align: center;
    font-size: 14px;
    white-space: nowrap;
    color: ${(props) => props.theme.colors.gray900};
  }
  .check {
    flex: 0 1 50px;
    display: flex;
    align-items: center;
    .row-check {
      label {
        padding-left: 25px;
      }
    }
  }
  .status {
    ${CommonFlex}
    flex-basis: 10%;
    height: 100%;
  }
  .name {
    ${CommonFlex}
    align-items: flex-start;
    flex-grow: 1;
    height: 100%;
    padding-left: 15px;
  }
  .career {
    ${CommonFlex}
    flex-basis: 8%;
    height: 100%;
  }
  .education {
    ${CommonFlex}
    flex-basis: 10%;
    height: 100%;
    /* border: 1px solid red; */
  }
  .step {
    ${CommonFlex}
    flex-basis: 15%;
    height: 100%;
    /* border: 1px solid red; */
  }
  .resume {
    ${CommonFlex}
    flex: 0 1 100px;
    height: 100%;
  }
  .date {
    ${CommonFlex}
    flex-basis: 10%;
    height: 100%;
  }
`;

function ApplicantTableBody({
  data,
  fetchUpdateEmployerReviewStageStatus,
  handleClickResumePreview,
  handleChangeCheckApplicant,
  checkedApplicants,
  handleClickNotifyOneApplicant,
}: ApplicantTableBody) {
  return (
    <StyledTableBody>
      {data.map((item) => {
        return (
          <div key={item.id} className="body-row">
            <div className="check">
              <CheckBox
                className="row-check"
                checked={checkedApplicants.some((applicant) => applicant.id === item.id)}
                name={item.resumeSnapshot.id}
                onChange={() => handleChangeCheckApplicant(item)}
              />
            </div>

            <div className="status">
              <span>{EMPLOYER_REVIEW_STAGE_STATUS[item.employerReviewStageStatus]}</span>
            </div>

            <ProfileBodyRow item={item} handleClickResumePreview={handleClickResumePreview} />

            <div className="career">{CAREER_LEVEL[item.resumeSnapshot.careerLevel]}</div>

            <div className="education">{EDUCATION_LEVEL[item.resumeSnapshot.education]}</div>

            {/* 지원일 */}
            <DateBodyRow item={item} />

            {/* 전형 */}
            <StepBodyRow
              item={item}
              fetchUpdateEmployerReviewStageStatus={fetchUpdateEmployerReviewStageStatus}
              handleClickNotifyOneApplicant={handleClickNotifyOneApplicant}
              announcementRecipients={item.announcementRecipients}
            />

            {/* 분류 */}
            <ResumeBodyRow
              id={item.id}
              cancelAt={item.cancelAt}
              employerReviewStageStatus={item.employerReviewStageStatus}
              fetchUpdateEmployerReviewStageStatus={fetchUpdateEmployerReviewStageStatus}
              announcementRecipients={item.announcementRecipients}
            />
          </div>
        );
      })}
    </StyledTableBody>
  );
}

const StyledNotifyGuide = styled.div`
  margin-top: 2px;
  font-size: 13px;
  display: flex;
  align-items: center;
  height: 24px;
  .complete {
    padding-right: 8px;
    color: ${(props) => props.theme.colors.blue500};
    font-weight: 500;
    display: flex;
    align-items: center;
  }
`;

const StyledTableBody = styled.div`
  min-height: 400px;
  max-height: 800px;
  overflow-y: auto;
  .body-row {
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 100px;
    font-size: 14px;
    white-space: nowrap;
    border-bottom: 1px solid ${(props) => props.theme.colors.gray300};
    .check {
      ${CommonFlex}
      flex: 0 1 50px;
      height: 100%;
      .row-check {
        label {
          padding-left: 25px;
        }
      }
    }
    .status {
      ${CommonFlex}
      flex-basis: 10%;
      height: 100%;
    }
    .career {
      ${CommonFlex}
      flex-basis: 8%;
      height: 100%;
    }
    .education {
      ${CommonFlex}
      flex-basis: 10%;
      height: 100%;
    }
  }
`;

ApplicantTable.Header = ApplicantTableHeader;
ApplicantTable.Body = ApplicantTableBody;

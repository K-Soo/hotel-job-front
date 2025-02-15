import React from 'react';
import styled, { css } from 'styled-components';
import CheckBox from '@/components/common/style/CheckBox';
import Button from '@/components/common/style/Button';
import DefaultProfileImage from '@/components/common/DefaultProfileImage';
import { EmployerReviewStageStatusKey, RecruitmentDetailApplicantListItem, ResumeDetail } from '@/types';
import { dateFormat, parseBirthDateAndCalculateAge } from '@/utils';
import { EMPLOYER_REVIEW_STAGE_STATUS } from '@/constants/application';
import ResumeBodyRow from '@/components/EmployerRecruitmentDetailApplicant/applicantTable/ResumeBodyRow';
import StepBodyRow from '@/components/EmployerRecruitmentDetailApplicant/applicantTable/StepBodyRow';
import { EDUCATION_LEVEL, SEX_CODE } from '@/constants';
import { CAREER_LEVEL } from '@/constants/resume';
import Icon from '@/icons/Icon';

interface ApplicantTableProps {
  children: React.ReactNode;
}
interface ApplicantTableBody {
  data: RecruitmentDetailApplicantListItem[];
  checkedApplicants: RecruitmentDetailApplicantListItem[];
  handleOpenNoticeForm: () => void;
  handleChangeCheckApplicant: (resumeSnapshot: RecruitmentDetailApplicantListItem) => void;
  fetchUpdateEmployerReviewStageStatus: (id: number, stage: EmployerReviewStageStatusKey) => Promise<void>;
  handleClickResumePreview: (applicationId: number, isView: boolean, data: ResumeDetail) => void;
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
      {/* <span className="header-row salary">희망/최근급여</span> */}
      <span className="header-row date">지원일</span>
      <span className="header-row step">전형/발표</span>
      <span className="header-row resume">분류</span>
    </StyledTableHeader>
  );
}

const StyledTableHeader = styled.div`
  /* box-sizing: border-box; */
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  /* border-bottom: 1px solid ${(props) => props.theme.colors.gray300}; */
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
    /* border: 1px solid red; */
  }
  .education {
    ${CommonFlex}
    flex-basis: 10%;
    height: 100%;
    /* border: 1px solid red; */
  }
  .salary {
    ${CommonFlex}
    flex-basis: 140px;
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
  handleOpenNoticeForm,
  handleChangeCheckApplicant,
  checkedApplicants,
  handleClickNotifyOneApplicant,
}: ApplicantTableBody) {
  return (
    <StyledTableBody>
      {data.map((item) => {
        const { age, birthYear } = parseBirthDateAndCalculateAge(item.resumeSnapshot.birthday);
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

            <div className="name" onClick={() => handleClickResumePreview(item.id, item.isView, item.resumeSnapshot)}>
              <div className="wrapper">
                <DefaultProfileImage imageUrl={item.resumeSnapshot.profileImage} margin="0 10px 0 0" />
                <div className="name__text">
                  <span className="name__text--top">
                    {item.resumeSnapshot.name} {'/'} {SEX_CODE[item.resumeSnapshot.sexCode]}
                  </span>
                  <span className="name__text--bottom">
                    {birthYear} {`${age}세`}
                  </span>
                </div>
              </div>
              {item.employerReviewStageStatus === 'ACCEPT' && item.announcementRecipients.length === 0 && (
                <StyledNotifyGuide>
                  <strong className="complete">
                    <Icon name="NoticeA24x24" width="26px" height="26px" />
                    최종 합격 전형 이동 완료!
                  </strong>
                  <span>합격/불합격 발표로 소식을 전해주세요.</span>
                </StyledNotifyGuide>
              )}
            </div>

            <div className="career">{CAREER_LEVEL[item.resumeSnapshot.careerLevel]}</div>

            <div className="education">{EDUCATION_LEVEL[item.resumeSnapshot.education]}</div>

            {/* <div className="salary">3000 ~ 3800</div> */}

            <div className="date">
              <div className="date__text">{item.applyAt ? dateFormat.date(item.applyAt, 'YY.MM.DD') : '-'}</div>
              {item.isView && <span>열람</span>}
              {!item.isView && <span style={{ color: '#4593fc' }}>미열람</span>}
            </div>

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
              employerReviewStageStatus={item.employerReviewStageStatus}
              fetchUpdateEmployerReviewStageStatus={fetchUpdateEmployerReviewStageStatus}
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
    .name {
      display: flex;
      flex-direction: column;
      justify-content: center;
      padding-left: 15px;
      flex-grow: 1;
      height: 100%;
      font-size: 13px;
      cursor: pointer;
      .wrapper {
        display: flex;
        align-items: center;
      }
      &__text {
        display: flex;
        flex-direction: column;
        &:hover {
          text-decoration: underline;
        }
        &--top {
          padding-bottom: 3px;
        }
        &--bottom {
          color: ${(props) => props.theme.colors.gray800};
          font-weight: 300;
        }
      }
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
    .salary {
      ${CommonFlex}
      flex-basis: 140px;
      height: 100%;
    }
    .step {
      ${CommonFlex}
      flex-basis: 15%;
      height: 100%;
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
      font-size: 12px;
      color: ${(props) => props.theme.colors.gray900};
      font-weight: 300;
      &__text {
        color: ${(props) => props.theme.colors.black300};
        padding-bottom: 5px;
      }
    }
  }
`;

ApplicantTable.Header = ApplicantTableHeader;
ApplicantTable.Body = ApplicantTableBody;

import React from 'react';
import styled, { css } from 'styled-components';
import CheckBox from '@/components/common/style/CheckBox';
import Button from '@/components/common/style/Button';
import { EmployerReviewStageStatusKey, RecruitmentDetailApplicantListItem, ResumeDetail } from '@/types';
import { dateFormat, parseBirthDateAndCalculateAge } from '@/utils';
import { EMPLOYER_REVIEW_STAGE_STATUS, REVIEW_STAGE_STATUS } from '@/constants/application';
import { SEX_CODE } from '@/constants';

interface ApplicantTableProps {
  children: React.ReactNode;
}
interface ApplicantTableBody {
  isSuccess: boolean;
  isLoading: boolean;
  data: RecruitmentDetailApplicantListItem[] | undefined;
  fetchUpdateEmployerReviewStageStatus: (id: number, stage: EmployerReviewStageStatusKey) => Promise<void>;
  handleClickResumePreview: (data: ResumeDetail) => void;
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
      <span className="header-row career">경력</span>
      <span className="header-row education">최종 학력</span>
      <span className="header-row salary">희망/최근급여</span>
      <span className="header-row date">지원일</span>
      <span className="header-row step">전형</span>
      <span className="header-row resume">이력서</span>
      <span className="header-row class">열람/미열람</span>
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
    flex-grow: 1;
    height: 100%;
    /* border: 1px solid red; */
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
  .date {
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
  .class {
    ${CommonFlex}
    flex-basis: 100px;
    height: 100%;
  }
`;

function ApplicantTableBody({
  data,
  isLoading,
  isSuccess,
  fetchUpdateEmployerReviewStageStatus,
  handleClickResumePreview,
}: ApplicantTableBody) {
  return (
    <StyledTableBody>
      {isLoading && <div>로딩중...</div>}
      {isSuccess &&
        data &&
        data.map((item) => {
          const { age, birthYear } = parseBirthDateAndCalculateAge(item.resumeSnapshot.birthday);
          return (
            <div key={item.id} className="body-row">
              <div className="check">
                <CheckBox className="row-check" checked={false} name={''} onChange={() => {}} />
              </div>
              <div className="status">
                <span>{EMPLOYER_REVIEW_STAGE_STATUS[item.employerReviewStageStatus]}</span>
              </div>

              <div className="name">
                <span className="name__top">
                  {item.resumeSnapshot.name} {'/'} {SEX_CODE[item.resumeSnapshot.sexCode]}
                </span>
                <span className="name__bottom">
                  {birthYear} {`${age}세`}
                </span>
              </div>
              <div className="career">경력</div>
              <div className="education">대학교 4학년</div>
              <div className="salary">3000 ~ 3800</div>
              <div className="date">{item.applyAt ? dateFormat.date6(item.applyAt.toString()) : '-'}</div>

              <div className="step">
                {item.employerReviewStageStatus === 'DOCUMENT' && (
                  <Button
                    label="면접전형 이동"
                    variant="secondary100"
                    width="90px"
                    fontSize="13px"
                    height="30px"
                    onClick={() => fetchUpdateEmployerReviewStageStatus(item.id, 'INTERVIEW')}
                  />
                )}

                {item.employerReviewStageStatus === 'INTERVIEW' && (
                  <>
                    <Button label="면접 제안" variant="primary" width="90px" fontSize="13px" height="30px" />
                    <StyledRollbackButton onClick={() => fetchUpdateEmployerReviewStageStatus(item.id, 'DOCUMENT')}>
                      전형이동 복구
                    </StyledRollbackButton>
                  </>
                )}

                {item.employerReviewStageStatus === 'FINAL_ACCEPT' && (
                  <>
                    <Button label="합격 통보" variant="primary" width="90px" fontSize="13px" height="30px" />
                    <StyledRollbackButton>전형이동 복구</StyledRollbackButton>
                  </>
                )}

                {item.employerReviewStageStatus === 'REJECT' && (
                  <>
                    <Button label="불합격 통보" variant="primary" width="90px" fontSize="13px" height="30px" />
                    <StyledRollbackButton>전형이동 복구</StyledRollbackButton>
                  </>
                )}
              </div>
              <div className="resume">
                <span onClick={() => handleClickResumePreview(item.resumeSnapshot)}>이력서</span>
              </div>
              <div className="class">
                <span>{item.isView ? '열람' : '미열람'}</span>
              </div>
            </div>
          );
        })}
    </StyledTableBody>
  );
}

const StyledRollbackButton = styled.button`
  margin-top: 8px;
  color: ${(props) => props.theme.colors.gray800};
  font-size: 13px;
  &:hover {
    cursor: pointer;
    color: ${(props) => props.theme.colors.black200};
    text-decoration: underline;
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
    /* border: 1px solid red; */
    white-space: nowrap;
    border-bottom: 1px solid ${(props) => props.theme.colors.gray300};
    .check {
      ${CommonFlex}
      flex: 0 1 50px;
      height: 100%;
      /* border: 1px solid red; */
      .row-check {
        /* border: 1px solid red; */
        label {
          padding-left: 25px;
        }
      }
    }
    .status {
      ${CommonFlex}
      flex-basis: 10%;
      height: 100%;
      /* border: 1px solid red; */
    }
    .name {
      ${CommonFlex}
      flex-grow: 1;
      height: 100%;
      font-size: 13px;
      &__top {
        padding-bottom: 3px;
      }
      &__bottom {
        color: ${(props) => props.theme.colors.gray600};
        font-weight: 300;
      }
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
    .date {
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
      color: ${(props) => props.theme.colors.blue600};
      span {
        &:hover {
          text-decoration: underline;
          color: ${(props) => props.theme.colors.blue800};
          cursor: pointer;
        }
      }
    }
    .class {
      ${CommonFlex}
      flex-basis: 100px;
      height: 100%;
      color: ${(props) => props.theme.colors.gray600};
      font-weight: 300;
    }
  }
`;

ApplicantTable.Header = ApplicantTableHeader;
ApplicantTable.Body = ApplicantTableBody;

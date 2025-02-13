import React from 'react';
import styled, { css } from 'styled-components';
import CheckBox from '@/components/common/style/CheckBox';
import Button from '@/components/common/style/Button';
import DefaultProfileImage from '@/components/common/DefaultProfileImage';
import { EmployerReviewStageStatusKey, RecruitmentDetailApplicantListItem, ResumeDetail } from '@/types';
import { dateFormat, parseBirthDateAndCalculateAge } from '@/utils';
import { EMPLOYER_REVIEW_STAGE_STATUS } from '@/constants/application';
import { SEX_CODE } from '@/constants';
import LoadingSpinner from '@/components/common/LoadingSpinner';
interface ApplicantTableProps {
  children: React.ReactNode;
}
interface ApplicantTableBody {
  isSuccess: boolean;
  isLoading: boolean;
  data: RecruitmentDetailApplicantListItem[] | undefined;
  fetchUpdateEmployerReviewStageStatus: (id: number, stage: EmployerReviewStageStatusKey) => Promise<void>;
  handleClickResumePreview: (applicationId: number, isView: boolean, data: ResumeDetail) => void;
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
      <span className="header-row salary">희망/최근급여</span>
      <span className="header-row step">전형</span>
      <span className="header-row resume">분류</span>
      <span className="header-row date">지원일</span>
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
    flex-basis: 8%;
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
      {isLoading && <LoadingSpinner height="150px" />}
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

              <div className="name" onClick={() => handleClickResumePreview(item.id, item.isView, item.resumeSnapshot)}>
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

              <div className="career">경력</div>

              <div className="education">대학교 4학년</div>

              <div className="salary">3000 ~ 3800</div>

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
                    <Button
                      label="최종합격 이동"
                      variant="secondary100"
                      width="90px"
                      fontSize="13px"
                      height="30px"
                      margin="10px 0 0 0"
                      onClick={() => fetchUpdateEmployerReviewStageStatus(item.id, 'ACCEPT')}
                    />
                  </>
                )}

                {item.employerReviewStageStatus === 'ACCEPT' && (
                  <>
                    <Button label="합격 통보" variant="primary" width="90px" fontSize="13px" height="30px" />
                  </>
                )}

                {item.employerReviewStageStatus === 'REJECT' && (
                  <>
                    <Button label="불합격 통보" variant="primary" width="90px" fontSize="13px" height="30px" />
                  </>
                )}
              </div>

              {/* 분류 */}
              <div className="resume">
                {item.employerReviewStageStatus === 'DOCUMENT' && (
                  <StyledRejectButton onClick={() => fetchUpdateEmployerReviewStageStatus(item.id, 'REJECT')} margin="0">
                    불합격 처리
                  </StyledRejectButton>
                )}

                {item.employerReviewStageStatus === 'INTERVIEW' && (
                  <>
                    <StyledRollbackButton onClick={() => fetchUpdateEmployerReviewStageStatus(item.id, 'DOCUMENT')}>
                      전형이동 복구
                    </StyledRollbackButton>
                    <StyledRejectButton onClick={() => fetchUpdateEmployerReviewStageStatus(item.id, 'REJECT')}>
                      불합격 처리
                    </StyledRejectButton>
                  </>
                )}

                {item.employerReviewStageStatus === 'ACCEPT' && (
                  <StyledRollbackButton onClick={() => fetchUpdateEmployerReviewStageStatus(item.id, 'DOCUMENT')}>
                    전형이동 복구
                  </StyledRollbackButton>
                )}

                {item.employerReviewStageStatus === 'REJECT' && (
                  <StyledRollbackButton onClick={() => fetchUpdateEmployerReviewStageStatus(item.id, 'DOCUMENT')}>
                    전형이동 복구
                  </StyledRollbackButton>
                )}
              </div>

              <div className="date">
                <div className="date__text">{item.applyAt ? dateFormat.date(item.applyAt, 'YY.MM.DD HH:mm') : '-'}</div>
                {item.isView && <span>열람</span>}
                {!item.isView && <span style={{ color: '#4593fc' }}>미열람</span>}
              </div>
            </div>
          );
        })}
    </StyledTableBody>
  );
}

const StyledRollbackButton = styled.button`
  color: ${(props) => props.theme.colors.gray800};
  font-size: 13px;
  text-decoration: underline;
  &:hover {
    cursor: pointer;
    color: ${(props) => props.theme.colors.black200};
  }
`;

const StyledRejectButton = styled.button<{ margin?: string }>`
  color: ${(props) => props.theme.colors.gray800};
  font-size: 13px;
  cursor: pointer;
  text-decoration: underline;
  margin: ${(props) => props.margin || '10px 0 0 0'};
  &:hover {
    cursor: pointer;
    color: ${(props) => props.theme.colors.black200};
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
    }
    .name {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-grow: 1;
      height: 100%;
      font-size: 13px;
      cursor: pointer;
      &:hover {
        text-decoration: underline;
      }
      &__text {
        display: flex;
        flex-direction: column;
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
      flex-basis: 8%;
      height: 100%;
      font-size: 12px;
      color: ${(props) => props.theme.colors.gray600};
      font-weight: 300;
      &__text {
        padding-bottom: 5px;
      }
    }
  }
`;

ApplicantTable.Header = ApplicantTableHeader;
ApplicantTable.Body = ApplicantTableBody;

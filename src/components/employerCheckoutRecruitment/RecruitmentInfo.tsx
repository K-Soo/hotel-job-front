import React from 'react';
import { PaymentRecruitmentInfo } from '@/types';
import styled from 'styled-components';
import { dateFormat } from '@/utils';
import { ALL_JOBS } from '@/constants/job';
import SkeletonUI from '@/components/common/SkeletonUI';
interface RecruitmentInfoProps {
  recruitmentInfo: PaymentRecruitmentInfo | undefined;
  isLoading: boolean;
}

const RecruitmentInfo = ({ recruitmentInfo, isLoading }: RecruitmentInfoProps) => {
  return (
    <S.RecruitmentInfo>
      <h2 className="title">적용하는 채용공고</h2>
      {isLoading && <SkeletonUI.Line style={{ height: '80px' }} />}
      {!isLoading && recruitmentInfo && (
        <S.RecruitmentContainer>
          <S.RecruitmentHeader>
            <span className="header-title">공고제목</span>
            <span className="job">직무</span>
            <span className="created-at">생성일</span>
          </S.RecruitmentHeader>

          <S.RecruitmentContent>
            <div className="content-title">
              <p>{recruitmentInfo.recruitmentTitle}</p>
            </div>
            <div className="content-job">
              {recruitmentInfo.jobs.map((job) => (
                <span className="content-job__text" key={job}>
                  {ALL_JOBS[job]}
                </span>
              ))}
            </div>
            <div className="created-at">
              <p>{dateFormat.date(recruitmentInfo.createdAt, 'YY.MM.DD')}</p>
            </div>
          </S.RecruitmentContent>
        </S.RecruitmentContainer>
      )}
    </S.RecruitmentInfo>
  );
};

export default React.memo(RecruitmentInfo);

const S = {
  RecruitmentInfo: styled.div`
    padding: 0 30px 30px 30px;
    .title {
      font-size: 20px;
      font-weight: 600;
      margin-bottom: 10px;
      color: ${({ theme }) => theme.colors.gray800};
    }
  `,
  RecruitmentContainer: styled.div`
    border-top: 1px solid ${({ theme }) => theme.colors.black400};
    border-bottom: 1px solid ${({ theme }) => theme.colors.black400};
  `,
  RecruitmentHeader: styled.div`
    display: flex;
    align-items: center;
    text-align: center;
    height: 40px;
    border-bottom: 1px solid ${({ theme }) => theme.colors.gray300};
    font-size: 14px;
    .header-title {
      flex: 1;
    }
    .job {
      flex-basis: 250px;
    }
    .created-at {
      flex-basis: 200px;
    }
  `,
  RecruitmentContent: styled.div`
    display: flex;
    align-items: center;
    height: 40px;
    font-size: 14px;
    .content-title {
      flex: 1;
      padding-left: 20px;
      text-align: center;
    }
    .content-job {
      flex-basis: 250px;
      text-align: center;
      &__text {
        padding: 0 3px;
      }
    }
    .created-at {
      flex-basis: 200px;
      text-align: center;
    }
  `,
};

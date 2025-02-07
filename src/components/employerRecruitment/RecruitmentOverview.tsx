import { ALL_JOBS, AllJobsKeyValuesKeys } from '@/constants/job';
import { RecruitmentItem } from '@/types';
import styled from 'styled-components';
import { dateFormat } from '@/utils';

interface RecruitmentOverviewProps {
  recruitmentTitle: string;
  jobs: AllJobsKeyValuesKeys[];
  item: RecruitmentItem;
}

export default function RecruitmentOverview({ recruitmentTitle, jobs, item }: RecruitmentOverviewProps) {
  return (
    <S.RecruitmentOverview>
      <h5 className="title">{recruitmentTitle}</h5>
      <div className="summary">
        <div className="summary__job-box">
          {jobs.map((job) => (
            <span className="summary__job-box--text" key={job}>
              {ALL_JOBS[job]}
            </span>
          ))}
        </div>
        {/* TODO - 현재 년도 비교 후 렌더링  */}
        {/* TODO - 등록 = 수정  */}

        {item.recruitmentStatus === 'PROGRESS' && (
          <time className="summary__date--update">{dateFormat.date(item.updatedAt, 'YY.MM.DD HH:mm')} 수정</time>
        )}
      </div>
    </S.RecruitmentOverview>
  );
}

const S = {
  RecruitmentOverview: styled.div`
    height: 100%;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    flex-direction: column;
    width: 100%;
    cursor: pointer;
    .title {
      width: 100%;
      text-align: left;
      &:hover {
        text-decoration: underline;
      }
    }
    .summary {
      display: flex;
      padding-top: 3px;
      font-size: 12px;
      white-space: nowrap;
      color: ${(props) => props.theme.colors.gray800};
      &__job-box {
        color: ${(props) => props.theme.colors.gray800};
        &--text {
          padding-right: 5px;
        }
      }
      &__date {
        color: ${(props) => props.theme.colors.gray600};
        &--update {
          &::before {
            content: '|';
            padding: 0 5px;
          }
        }
      }
    }
  `,
};

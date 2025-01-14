import styled from 'styled-components';

interface RecruitmentOverviewProps {
  recruitmentTitle: string;
}

export default function RecruitmentOverview({ recruitmentTitle }: RecruitmentOverviewProps) {
  return (
    <S.RecruitmentOverview>
      <h5 className="title">{recruitmentTitle}</h5>
      <div className="summary">
        <div className="summary__job-box">
          <span className="summary__job-box--text">당번</span>
          <span className="summary__job-box--text">지배인</span>
          <span className="summary__job-box--text">부부팀</span>
        </div>
        {/* TODO - 현재 년도 비교 후 렌더링  */}
        {/* TODO - 등록 = 수정  */}
        <time className="summary__date--start">01.24 등록</time>
        <time className="summary__date--update">01.24 수정</time>
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
      &:hover {
        text-decoration: underline;
      }
    }
    .summary {
      display: flex;
      padding-top: 3px;
      font-size: 12px;
      color: ${(props) => props.theme.colors.gray800};
      &__job-box {
        color: ${(props) => props.theme.colors.gray800};
        &--text {
          padding-right: 5px;
        }
        &::after {
          content: '|';
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

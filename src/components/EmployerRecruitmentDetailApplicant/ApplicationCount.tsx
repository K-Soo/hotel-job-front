import { RecruitmentDetailApplicationCount } from '@/types';
import styled from 'styled-components';

interface ApplicationCountProps {
  data: RecruitmentDetailApplicationCount;
}

export default function ApplicationCount({ data }: ApplicationCountProps) {
  return (
    <S.ApplicationCount>
      <article className="count-box">
        <div className="count-box__item">
          <span className="count-box__item--text">총 지원자</span>
          <span className="count-box__item--count">{data.totalCount}</span>
        </div>
        <div className="count-box__item">
          <span className="count-box__item--text">열람</span>
          <span className="count-box__item--count">{data.viewCount}</span>
        </div>
        <div className="count-box__item">
          <span className="count-box__item--text">미 열람</span>
          <span className="count-box__item--count">{data.notViewCount}</span>
        </div>
      </article>

      {/* <article className="notice-box">
        <div className="notice-box__item">
          <span className="notice-box__item--text">면접제안</span>
          <span className="notice-box__item--count">{data.notViewCount}</span>
        </div>
        <div className="notice-box__item">
          <span className="notice-box__item--text">최종합격 통보</span>
          <span className="notice-box__item--count">{data.notViewCount}</span>
        </div>
        <div className="notice-box__item">
          <span className="notice-box__item--text">불합격 통보</span>
          <span className="notice-box__item--count">{data.notViewCount}</span>
        </div>
      </article> */}
    </S.ApplicationCount>
  );
}

const S = {
  ApplicationCount: styled.div`
    height: 100px;
    display: flex;
    justify-content: space-between;
    margin-bottom: 30px;

    .count-box {
      display: flex;
      &__item {
        width: 100px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        &--text {
          font-size: 16px;
          margin-bottom: 5px;
          color: ${({ theme }) => theme.colors.black800};
        }
        &--count {
          font-size: 24px;
          font-weight: bold;
          color: ${({ theme }) => theme.colors.gray700};
          background-color: ${({ theme }) => theme.colors.gray100};
          display: flex;
          width: 65px;
          height: 65px;
          align-items: center;
          justify-content: center;
          border-radius: 10px;
        }
      }
    }
    .notice-box {
      display: flex;
      &__item {
        width: 100px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        &--text {
          font-size: 16px;
          margin-bottom: 5px;
          color: ${({ theme }) => theme.colors.black800};
        }
        &--count {
          font-size: 24px;
          font-weight: bold;
          color: ${({ theme }) => theme.colors.gray700};
          background-color: ${({ theme }) => theme.colors.gray100};
          display: flex;
          width: 65px;
          height: 65px;
          align-items: center;
          justify-content: center;
          border-radius: 10px;
        }
      }
    }
  `,
};

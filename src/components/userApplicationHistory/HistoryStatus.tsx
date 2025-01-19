import styled from 'styled-components';

interface HistoryStatusProps {}

export default function HistoryStatus({}: HistoryStatusProps) {
  return (
    <S.HistoryStatus>
      <button className="item">
        <strong className="item__count">100</strong>
        <span className="item__text">전체</span>
      </button>
      <button className="item">
        <strong className="item__count">200</strong>
        <span className="item__text">지원완료</span>
      </button>
      <button className="item">
        <strong className="item__count">10</strong>
        <span className="item__text">면접요청</span>
      </button>
      <button className="item">
        <strong className="item__count">10</strong>
        <span className="item__text">최종합격</span>
      </button>
      <button className="item">
        <strong className="item__count">100</strong>
        <span className="item__text">불합격</span>
      </button>
    </S.HistoryStatus>
  );
}

const S = {
  HistoryStatus: styled.div`
    display: flex;
    align-items: center;
    height: 80px;
    margin-bottom: 30px;
    .item {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100%;
      cursor: pointer;
      &__count {
        color: ${(props) => props.theme.colors.gray600};
        font-size: 38px;
        ${(props) => props.theme.media.tablet`
          font-size: 24px;
        `};
        ${(props) => props.theme.media.mobile`
          font-size: 22px;
        `};
      }
      &__text {
        color: ${(props) => props.theme.colors.gray600};
        font-weight: 300;
        padding-top: 10px;
        font-size: 14px;
      }
    }
  `,
};

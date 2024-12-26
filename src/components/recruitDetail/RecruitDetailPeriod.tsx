import styled from 'styled-components';

interface RecruitDetailPeriodProps {}

export default function RecruitDetailPeriod({}: RecruitDetailPeriodProps) {
  return (
    <S.RecruitDetailPeriod>
      <div className="period">
        <div></div>
        <div></div>
      </div>
      <div className="info">
        <div>
          <span>지원방법</span>
          <span>입사지원 / 전화</span>
        </div>
        <div>
          <span>담당자</span>
          <span>이건호</span>
        </div>
        <div>
          <span>연락처</span>
          <span>010-1234-1231</span>
        </div>
        <div>
          <span>메일</span>
          <span>kanabun12asd@naver.com</span>
        </div>
      </div>
    </S.RecruitDetailPeriod>
  );
}

const S = {
  RecruitDetailPeriod: styled.div`
    display: flex;
    border: 1px solid red;
    margin-bottom: 50px;
    .period {
      flex: 50%;
    }
    .info {
      flex: 50%;
    }
  `,
};

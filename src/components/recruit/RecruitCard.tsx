import styled from "styled-components";

interface RecruitCardProps {}

export default function RecruitCard({}: RecruitCardProps) {
  return (
    <S.RecruitCard>
      <div className="company">
        <div>메이호텔</div>
      </div>

      <div className="detail">
        {/* 경력, 지역, 외국인 여부*/}
        <div className="detail__tag">
          <span className="detail__tag--item">급구</span>
          <span className="detail__tag--item">숙식 가능</span>
        </div>

        <div className="detail__content">
          <h6>당번 구합니다</h6>
        </div>
      </div>

      <div className="info">
        <div>경기도 전체</div>
        <div>경력 무관</div>
        <div>정규직</div>
        <div>외국인 무관</div>
      </div>

      <div className="support">
        {/* 입사지원하기, 등록날짜, 디데이*/}
        <button>입사지원</button>
        <time>~10.15(화)</time>
        <span>15일전 등록</span>
      </div>
    </S.RecruitCard>
  );
}

const S = {
  RecruitCard: styled.article`
    display: flex;
    width: 100%;
    border-bottom: 1px solid #000;
    padding: 15px 0;
    /* height: 50px; */
    .company {
      flex: 20%;
      border: 1px solid red;
    }
    .detail {
      flex: 40%;
      border: 1px solid red;
    }
    .info {
      flex: 10%;
      border: 1px solid red;
      display: flex;
      flex-direction: column;
      font-size: 13px;
    }
    .support {
      flex: 20%;
      border: 1px solid red;
      display: flex;
      flex-direction: column;
    }
  `,
};

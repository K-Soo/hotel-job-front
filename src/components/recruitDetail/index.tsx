import styled from "styled-components";

interface RecruitDetailProps {}

export default function RecruitDetail({}: RecruitDetailProps) {
  return (
    <S.RecruitDetail>
      {false && <S.Images>{/* 이미지 영역 */}</S.Images>}

      <S.Header>
        <div className="left">
          <div className="left__company">메이호텔</div>
          <div className="left__title">야간 근무할 담당자 모십니다.</div>
        </div>
        <div className="right">
          <span>즐겨찾기</span>
          <button>입사지원</button>
        </div>
      </S.Header>

      <S.Title>상세 정보</S.Title>
      <S.information>
        <div className="left">
          <div>
            <span>경력</span>
            <span>무관</span>
          </div>
          <div>
            <span>직무</span>
            <span>무관</span>
          </div>
          <div>
            <span>급여</span>
            <span>협의</span>
          </div>
        </div>

        <div className="right">
          <div>
            <span>근무지역</span>
            <span>서울</span>
          </div>
          <div>
            <span>고용형태</span>
            <span>계약직</span>
          </div>
          <div>
            <span>근무시간</span>
            <span>10시~10시</span>
          </div>
          <div>
            <span>근무형태</span>
            <span>무관</span>
          </div>
        </div>
      </S.information>

      <S.Title>상세 정보</S.Title>
      <S.Content>
        <p>lasdlpsalpdlspaldp</p>
      </S.Content>

      <S.Title>접수기간 및 담당자</S.Title>
      <S.Accept>
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
      </S.Accept>

      <S.Title>근무 위치</S.Title>
      <S.Location>
        <div>서울 송파구 올림픽로 602-5</div>
        <div>지도</div>
      </S.Location>
    </S.RecruitDetail>
  );
}

const S = {
  RecruitDetail: styled.section`
    border: 3px solid #000;
    ${(props) => props.theme.tablet``};
  `,
  Header: styled.article`
    display: flex;
    justify-content: space-between;
    border: 1px solid red;
    .left {
      &__company {
        font-size: 18px;
        color: #333;
        font-weight: 500;
      }
      &__title {
        font-size: 28px;
        font-weight: 600;
      }
    }
    ${(props) => props.theme.tablet``};
  `,
  Images: styled.article`
    height: 350px;
    border-radius: 15px;
    background-color: gray;

    ${(props) => props.theme.tablet``};
  `,
  information: styled.article`
    border: 1px solid red;
    display: flex;
    .left {
      flex: 50%;
    }
    .right {
      flex: 50%;
    }
    ${(props) => props.theme.tablet``};
  `,
  Content: styled.article`
    min-height: 500px;
    ${(props) => props.theme.tablet``};
  `,
  Location: styled.article`
    ${(props) => props.theme.tablet``};
  `,
  Accept: styled.article`
    display: flex;
    border: 1px solid red;
    .period {
      flex: 50%;
    }
    .info {
      flex: 50%;
    }
    ${(props) => props.theme.tablet``};
  `,
  Title: styled.article`
    font-size: 18px;
    font-weight: 600;
    ${(props) => props.theme.tablet``};
  `,
};

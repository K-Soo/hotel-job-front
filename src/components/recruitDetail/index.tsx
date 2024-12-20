import styled from 'styled-components';

interface RecruitDetailProps {}

export default function RecruitDetail({}: RecruitDetailProps) {
  return (
    <S.RecruitDetail>
      {true && <S.Images>{/* 이미지 영역 */}</S.Images>}

      <S.DateTime>
        <span>등록일</span>
        <span>수정일</span>
      </S.DateTime>
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
          <div className="left__item">
            <span className="left__item--label">직무</span>
            <span className="left__item--value">무관</span>
          </div>
          <div className="left__item">
            <span className="left__item--label">경력</span>
            <span className="left__item--value">무관</span>
          </div>
          <div className="left__item">
            <span className="left__item--label">급여</span>
            <span className="left__item--value">협의</span>
          </div>
          <div className="left__item">
            <span className="left__item--label">고용형태</span>
            <span className="left__item--value">계약직</span>
          </div>
        </div>

        <div className="right">
          <div className="right__item">
            <span className="right__item--label">근무지역</span>
            <span className="right__item--value">서울</span>
          </div>

          <div className="right__item">
            <span className="right__item--label">근무시간</span>
            <span className="right__item--value">10시~10시</span>
          </div>
          <div className="right__item">
            <span className="right__item--label">근무형태</span>
            <span className="right__item--value">격일</span>
          </div>
          <div className="right__item">
            <span className="right__item--label">국적</span>
            <span className="right__item--value">무관</span>
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
  RecruitDetail: styled.section``,
  Images: styled.article`
    height: 350px;
    border-radius: 15px;
    background-color: gray;
    margin-bottom: 30px;
  `,
  DateTime: styled.article`
    text-align: right;
    margin-bottom: 5px;
  `,
  Header: styled.article`
    display: flex;
    justify-content: space-between;
    border: 1px solid red;
    margin-bottom: 50px;

    ${(props) => props.theme.media.tablet`
      flex-direction: column-reverse;
    `};
    .left {
      &__company {
        font-size: 18px;
        color: #333;
        font-weight: 500;
        margin-bottom: 5px;
      }
      &__title {
        font-size: 28px;
        font-weight: 600;
        ${(props) => props.theme.media.tablet`
          font-size: 16px;
        `};
      }
    }
  `,

  information: styled.article`
    border: 1px solid red;
    display: flex;
    margin-bottom: 50px;
    .left {
      flex: 50%;
      &__item {
        display: flex;
        margin-bottom: 5px;
        &--label {
          flex-basis: 70px;
          border: 1px solid red;
        }
        &__value {
        }
      }
    }
    .right {
      flex: 50%;
      &__item {
        display: flex;
        margin-bottom: 5px;
        &--label {
          flex-basis: 70px;
        }
        &__value {
        }
      }
    }
    ${(props) => props.theme.media.tablet``};
  `,
  Content: styled.article`
    min-height: 500px;
    margin-bottom: 50px;
    ${(props) => props.theme.media.tablet``};
  `,

  Accept: styled.article`
    display: flex;
    border: 1px solid red;
    margin-bottom: 50px;
    .period {
      flex: 50%;
    }
    .info {
      flex: 50%;
    }
    ${(props) => props.theme.media.tablet``};
  `,
  Location: styled.article`
    ${(props) => props.theme.media.tablet``};
  `,
  Title: styled.article`
    font-size: 20px;
    font-weight: 600;
    margin-bottom: 5px;
    ${(props) => props.theme.media.tablet``};
  `,
};

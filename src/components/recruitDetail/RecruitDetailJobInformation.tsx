import styled from 'styled-components';

interface RecruitDetailJobInformationProps {}

export default function RecruitDetailJobInformation({}: RecruitDetailJobInformationProps) {
  return (
    <S.RecruitDetailJobInformation>
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
    </S.RecruitDetailJobInformation>
  );
}

const S = {
  RecruitDetailJobInformation: styled.div`
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
  `,
};

import styled from 'styled-components';

interface RecruitmentCountProps {}

export default function RecruitmentCount({}: RecruitmentCountProps) {
  return (
    <S.RecruitmentCount>
      <S.RecruitmentCountContainer>
        <div className="item">
          <h6 className="item__title">전체공고</h6>
          <p className="item__text">10</p>
        </div>
        <div className="item">
          <h6 className="item__title">진행중</h6>
          <p className="item__text">2</p>
        </div>
        <div className="item">
          <h6 className="item__title">대기중</h6>
          <p className="item__text">2</p>
        </div>

        <div className="item">
          <h6 className="item__title">마감</h6>
          <p className="item__text">2</p>
        </div>
      </S.RecruitmentCountContainer>
    </S.RecruitmentCount>
  );
}

const S = {
  RecruitmentCount: styled.div`
    flex: 1;
    height: 180px;
    border: 1px solid ${({ theme }) => theme.colors.gray400};
    border-radius: 10px;
    padding: 30px;
    display: flex;
    flex-direction: column;
  `,
  RecruitmentCountContainer: styled.div`
    flex: 1;
    display: flex;
    .item {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      &__title {
        font-size: 18px;
        margin-bottom: 15px;
        color: ${({ theme }) => theme.colors.black400};
      }
      &__text {
        font-size: 28px;
      }
    }
  `,
};

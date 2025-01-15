import styled from 'styled-components';

interface RecruitDetailPeriodProps {
  managerName: string;
  managerEmail: string;
  managerNumber: string;
}

export default function RecruitDetailPeriod({ managerEmail, managerName, managerNumber }: RecruitDetailPeriodProps) {
  return (
    <>
      <S.Title>접수기간 및 담당자</S.Title>
      <S.RecruitDetailPeriod>
        <div className="info-box">
          <div className="info-box__item">
            <span>담당자</span>
            <em>{managerName}</em>
          </div>
          <div className="info-box__item">
            <span>담당자 이메일</span>
            <em>{managerEmail}</em>
          </div>
          <div className="info-box__item">
            <span>담당자 연락처</span>
            <em>{managerNumber}</em>
          </div>
        </div>
      </S.RecruitDetailPeriod>
    </>
  );
}

const S = {
  RecruitDetailPeriod: styled.div`
    display: none;
    margin-bottom: 50px;
    border-radius: 10px;
    padding: 20px;
    background-color: ${(props) => props.theme.colors.gray};
    ${(props) => props.theme.media.tablet`
      display: block;
    `};
    .info-box {
      background-color: ${(props) => props.theme.colors.gray};
      border-radius: 10px;
      &__item {
        margin-bottom: 15px;
        font-size: 15px;
        display: flex;
        color: ${(props) => props.theme.colors.black200};

        span {
          flex: 0 0 140px;
          display: inline-block;
        }
        em {
          word-break: break-all;
        }
        &:last-child {
          margin-bottom: 0;
        }
        ${(props) => props.theme.media.mobile`
          span {
            flex: 0 0 110px;
          }
        `};
      }
    }
  `,
  Title: styled.article`
    display: none;
    font-size: 22px;
    font-weight: 500;
    margin-bottom: 15px;
    ${(props) => props.theme.media.tablet`
      display: block;
    `};
  `,
};

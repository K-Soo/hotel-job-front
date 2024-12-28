import styled from 'styled-components';
import Icon from '@/icons/Icon';
import RecruitPrice from '@/components/recruit/RecruitPrice';

interface RecruitMobileCardProps {}

export default function RecruitMobileCard({}: RecruitMobileCardProps) {
  return (
    <S.RecruitMobileCard>
      <S.HeaderBox>
        <div className="tags">
          <RecruitTag>숙식제공</RecruitTag>
          <RecruitTag>수당</RecruitTag>
          <RecruitTag>수당</RecruitTag>
        </div>
        <time>TODAY</time>
      </S.HeaderBox>
      <S.ContentBox>
        <div className="info-box">
          <h6 className="info-box__title">청소 이모구합니다. 밥 맛깔나게 잘하시는분 오셨으면 좋겠습니다.</h6>
          <div className="info-box__detail">
            <div className="info-box__detail--company">호텔 더 아무무</div>
            <address className="info-box__detail--address">서울 송파구</address>
          </div>
        </div>
        <div className="icon-box">
          <Icon name="Star24x24" width="24px" height="24px" margin="0" />
        </div>
      </S.ContentBox>
      <S.infoBox>
        <div className="jobs">
          <span className="jobs__text">룸메이드</span>
          <div className="jobs__conditions">
            <span>경력무관</span>
            <span>경력무관</span>
          </div>
        </div>
        <div>
          <RecruitPrice fonSize="13px" />
        </div>
      </S.infoBox>
    </S.RecruitMobileCard>
  );
}

const RecruitTag = styled.span`
  height: 18px;
  width: fit-content;
  display: flex;
  align-items: center;
  padding: 0px 5px;
  border-radius: 3px;
  margin-right: 8px;
  background-color: ${(props) => props.theme.colors.blue50};
  font-size: 13px;
  font-weight: 300;
  color: ${(props) => props.theme.colors.blue800};
  letter-spacing: 0.8px;
  &:hover {
    background-color: ${(props) => props.theme.colors.blue100};
  }
`;

const S = {
  RecruitMobileCard: styled.div`
    width: 100%;
    height: 160px;
    display: flex;
    flex-direction: column;
    border: 0.8px solid ${(props) => props.theme.colors.gray200};
    padding: 15px 10px;
    margin: 8px 0;
    border-radius: 10px;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.05);
  `,
  HeaderBox: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 13px;
    margin-bottom: 10px;
    font-weight: 500;

    color: ${(props) => props.theme.colors.gray700};
    .tags {
      display: flex;
      flex-wrap: wrap;
    }
  `,
  ContentBox: styled.div`
    flex: 1;
    display: flex;
    .info-box {
      flex: 1;
      &__title {
        color: ${(props) => props.theme.colors.gray800};
        font-size: 16px;
        font-weight: 500;
        margin-bottom: 10px;
        overflow: hidden;
        white-space: nowrap;
        white-space: break-spaces;
        display: -webkit-box;
        word-break: break-all;
        text-overflow: ellipsis;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
      }
      &__detail {
        display: flex;
        align-items: center;
        &--company {
          font-size: 14px;
          font-weight: 400;
          color: ${(props) => props.theme.colors.black100};
          &::after {
            content: '|';
            margin: 0 8px;
            color: ${(props) => props.theme.colors.gray400};
          }
        }
        &--address {
          font-size: 13px;
          font-weight: 300;
          color: ${(props) => props.theme.colors.gray700};
        }
      }
    }
    .icon-box {
      margin-left: 35px;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
  `,

  infoBox: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: end;
    .jobs {
      &__text {
        font-size: 14px;
      }
      &__conditions {
        display: flex;
        align-items: center;
        font-size: 13px;
        color: ${(props) => props.theme.colors.gray600};
        margin-top: 5px;
        & > span {
          margin-right: 5px;
        }
      }
    }
  `,
};

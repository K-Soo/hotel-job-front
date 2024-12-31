import styled from 'styled-components';
import Icon from '@/icons/Icon';
import RecruitPrice from '@/components/recruit/RecruitPrice';
import Tag from '@/components/common/Tag';
import { motion } from 'framer-motion';

interface RecruitUrgentCardProps {}

export default function RecruitUrgentCard({}: RecruitUrgentCardProps) {
  return (
    <S.RecruitUrgentCard whileTap={{ scale: 0.98 }} whileHover={{ border: '1px solid #b0b8c1' }}>
      <S.HeaderBox>
        <div className="tags">
          <Tag label="급구" type="URGENT" />
        </div>
      </S.HeaderBox>
      <S.ContentBox>
        <div className="info-box">
          <h6 className="info-box__title">당직자 구합니다. 휴계시간 많아요.</h6>
          <div className="info-box__detail">
            <div className="info-box__detail--company">호텔 더 아무무</div>
            <address className="info-box__detail--address">서울 송파구</address>
          </div>
        </div>
      </S.ContentBox>

      <S.infoBox>
        <div className="jobs">
          <span className="jobs__text">룸메이드</span>
          <div className="jobs__conditions">
            <span>경력1년</span>
            <span>정규직</span>
            <span>부부팀</span>
          </div>
        </div>
        <div className="price-wrapper">
          <RecruitPrice fonSize="13px" />
          <Icon className="title__icon" name="ExternalLinkB50x50" width="20px" height="20px" />
          {/* <Icon name="Star24x24" width="16px" height="16px" /> */}
        </div>
      </S.infoBox>
    </S.RecruitUrgentCard>
  );
}

const S = {
  RecruitUrgentCard: styled(motion.div)`
    width: calc(20% - 8px);
    aspect-ratio: 1;
    display: flex;
    flex-direction: column;
    padding: 10px;
    border: 1px solid ${(props) => props.theme.colors.gray300};
    ${(props) => props.theme.media.laptop`
      width: calc(25% - 8px);
    `};

    ${(props) => props.theme.media.tablet`
      aspect-ratio: 5 / 3;
      width: calc(50% - 10px);
    `};

    ${(props) => props.theme.media.mobile`
    `};
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
        font-size: 14px;
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
        ${(props) => props.theme.media.laptop`
          font-size: 15px;
        `};
      }
      &__detail {
        display: flex;
        flex-direction: column;
        &--company {
          font-size: 13px;
          font-weight: 400;
          color: ${(props) => props.theme.colors.black100};
          margin-bottom: 5px;
        }
        &--address {
          font-size: 13px;
          font-weight: 300;
          color: ${(props) => props.theme.colors.gray700};
        }
      }
    }
  `,
  infoBox: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-top: 10px;
    .jobs {
      &__text {
        font-size: 14px;
      }
      &__conditions {
        display: flex;
        align-items: center;
        font-size: 12px;
        color: ${(props) => props.theme.colors.gray600};
        margin-top: 5px;
        & > span {
          margin-right: 5px;
        }
      }
    }
    .price-wrapper {
      margin-top: 5px;
      display: flex;
      justify-content: space-between;
    }
  `,
};

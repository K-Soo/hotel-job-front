import React from 'react';
import styled from 'styled-components';
import Icon from '@/icons/Icon';
import RecruitPrice from '@/components/recruit/RecruitPrice';
import Tag from '@/components/common/Tag';
import { motion } from 'framer-motion';
import { RecruitListItem } from '@/types';
import { allJobs } from '@/constants/job';
import { experienceCondition } from '@/constants/recruitment';
import { addressFormat, employmentTypeFormat } from '@/utils';
import IconDimmed from '@/components/common/IconDimmed';
import { useRouter } from 'next/router';

interface RecruitUrgentCardProps {
  item: RecruitListItem;
}

export default function RecruitUrgentCard({ item }: RecruitUrgentCardProps) {
  const router = useRouter();
  const { sido, sigungu } = addressFormat(item.address);

  const handleClickBlank = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    window.open(`/recruit/${item.id}`, '_blank');
  };

  return (
    <S.RecruitUrgentCard
      whileTap={{ scale: 0.98 }}
      whileHover={{ border: '1px solid #b0b8c1' }}
      onClick={() => router.push(`/recruit/${item.id}`)}
    >
      <S.HeaderBox>
        <div className="tags">
          <Tag label="급구" type="URGENT" />
        </div>
      </S.HeaderBox>
      <S.ContentBox>
        <div className="info-box">
          <h6 className="info-box__title">{item.recruitmentTitle}</h6>
          <div className="info-box__detail">
            <div className="info-box__detail--company">{item.hotelName}</div>
            <address className="info-box__detail--address">
              {sido} {sigungu}
            </address>
          </div>
        </div>
      </S.ContentBox>

      <S.infoBox>
        <div className="jobs">
          {item.jobs.length > 1 ? (
            <span className="jobs__text">
              {allJobs[item.jobs[0]]} 외 {item.jobs.length - 1}
            </span>
          ) : (
            <span className="jobs__text">{allJobs[item.jobs[0]]}</span>
          )}
          <div className="jobs__conditions">
            <span>{experienceCondition[item.experienceCondition]}</span>
            <span>{employmentTypeFormat(item.employmentType)}</span>
          </div>
        </div>
        <div className="price-wrapper">
          <RecruitPrice fonSize="13px" salaryAmount={item.salaryAmount} salary={item.salaryType} />

          <IconDimmed padding="1px" onClick={handleClickBlank}>
            <Icon className="title__icon" name="ExternalLinkB50x50" width="20px" height="20px" />
          </IconDimmed>
        </div>
      </S.infoBox>
    </S.RecruitUrgentCard>
  );
}

const S = {
  RecruitUrgentCard: styled(motion.div)`
    width: calc(25% - 8px);
    aspect-ratio: 4 / 3;
    display: flex;
    flex-direction: column;
    padding: 10px;
    border: 1px solid ${(props) => props.theme.colors.gray300};
    cursor: pointer;
    user-select: none;
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
      align-items: center;
      justify-content: space-between;
    }
  `,
};

import React from 'react';
import styled, { css } from 'styled-components';
import RecruitPrice from '@/components/recruit/RecruitPrice';
import { RecruitListItem } from '@/types';
import { addressFormat, dateFormat, employmentTypeFormat } from '@/utils';
import { EXPERIENCE_CONDITION } from '@/constants/recruitment';
import { ALL_JOBS } from '@/constants/job';
import { useRouter } from 'next/router';
import Tag from '@/components/common/Tag';
import { motion, useAnimationControls } from 'framer-motion';

interface RecruitMobileCardProps {
  item: RecruitListItem;
}

export default function RecruitMobileCard({ item }: RecruitMobileCardProps) {
  const [isBold, setIsBold] = React.useState(false);
  const [isHighlight, setIsHighlight] = React.useState(false);
  const [isTag, setIsTag] = React.useState(false);

  const controls = useAnimationControls();

  const router = useRouter();
  const { sido, sigungu } = addressFormat(item.address);

  const { hasBoldEffect, hasHighlightEffect, hasTagEffect } = React.useMemo(() => {
    const currentDate = new Date();
    let hasBoldEffect = false;
    let hasHighlightEffect = false;
    let hasTagEffect = false;

    item.paymentRecruitment.options?.forEach((option) => {
      const postingEndDate = option.postingEndDate ? new Date(option.postingEndDate) : null;

      if (postingEndDate && currentDate <= postingEndDate) {
        if (option.name === 'BOLD') hasBoldEffect = true;
        if (option.name === 'HIGHLIGHT') hasHighlightEffect = true;
        if (option.name === 'TAG') hasTagEffect = true;
      }
    });

    return { hasBoldEffect, hasHighlightEffect, hasTagEffect };
  }, [item.paymentRecruitment]);

  React.useEffect(() => {
    setIsBold(hasBoldEffect);
    setIsHighlight(hasHighlightEffect);
    setIsTag(hasTagEffect);
  }, [hasBoldEffect, hasHighlightEffect, hasTagEffect]);

  const handleClickRecruit = async () => {
    await controls.start({ scale: [0.98, 1] });
    router.push(`/recruit/${item.id}`);
  };

  return (
    <S.RecruitMobileCard
      onClick={handleClickRecruit}
      animate={controls}
      initial={{ scale: 1 }}
      $isClosed={item.recruitmentStatus === 'CLOSED'}
    >
      <S.HeaderBox>
        <div className="left">
          <div className="left__company">{item.hotelName}</div>
          <address className="left__address">
            {sido} {sigungu}
          </address>
        </div>

        {dateFormat.dateOrToday(item.priorityDate) === 'TODAY' ? (
          <time className="today">TODAY</time>
        ) : (
          <time>{dateFormat.dateOrToday(item.priorityDate)}</time>
        )}
      </S.HeaderBox>

      <StyledTitle $isBold={isBold} $isHighlight={isHighlight}>
        {isTag && <Tag label="급구" type="URGENT" width="32px" margin="0 5px 0 0" fontSize="11px" height="17px" />}

        <h5 className="text">{item.recruitmentTitle}</h5>
      </StyledTitle>

      <S.infoBox>
        <div className="jobs">
          {item.jobs.length > 1 ? (
            <span className="jobs__job">
              {ALL_JOBS[item.jobs[0]]} 외 {item.jobs.length - 1}
            </span>
          ) : (
            <span className="jobs__job">{ALL_JOBS[item.jobs[0]]} </span>
          )}

          <div className="jobs__conditions">
            <span>{EXPERIENCE_CONDITION[item.experienceCondition]}</span>
            <span>{employmentTypeFormat(item.employmentType)}</span>
          </div>
        </div>

        <div>
          <RecruitPrice fonSize="13px" salary={item.salaryType} salaryAmount={item.salaryAmount} />
        </div>
      </S.infoBox>
    </S.RecruitMobileCard>
  );
}

const StyledTitle = styled.div<{ $isBold: boolean; $isHighlight: boolean }>`
  flex: 1;
  margin-bottom: 15px;
  display: flex;
  align-items: center;
  width: 100%;
  .text {
    width: fit-content;
    color: ${(props) => props.theme.colors.gray800};
    font-weight: ${(props) => (props.$isBold ? 500 : 400)};
    font-size: 14px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    ${(props) =>
      props.$isHighlight &&
      css`
        background-color: #6877ed;
        color: #ffffff;
      `};
  }
`;

const S = {
  RecruitMobileCard: styled(motion.div)<{ $isClosed: boolean }>`
    width: 100%;
    height: 100px;
    display: flex;
    flex-direction: column;
    border-bottom: 1px solid ${(props) => props.theme.colors.gray300};
    padding: 15px 10px;
    ${(props) =>
      props.$isClosed &&
      css`
        background-color: ${props.theme.colors.gray};
      `};
  `,
  HeaderBox: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 13px;
    font-weight: 500;
    color: ${(props) => props.theme.colors.gray700};
    .left {
      display: flex;
      align-items: center;
      &__company {
        font-size: 14px;
        font-weight: 400;
        color: ${(props) => props.theme.colors.black100};
        &::after {
          content: '·';
          display: inline-block;
          color: ${(props) => props.theme.colors.black100};
          margin: 0 6px;
        }
      }
      &__address {
        font-size: 13px;
        font-weight: 300;
        color: ${(props) => props.theme.colors.gray700};
      }
    }
    .today {
      color: ${(props) => props.theme.colors.blue500};
      font-weight: 500;
    }
  `,
  infoBox: styled.div`
    display: flex;
    justify-content: space-between;
    .jobs {
      display: flex;
      align-items: center;
      white-space: nowrap;
      font-size: 13px;
      &__job {
        &::after {
          content: '';
          display: inline-block;
          width: 1px;
          height: 10px;
          background-color: ${(props) => props.theme.colors.gray500};
          margin: 0 6px;
        }
        ${(props) => props.theme.media.mobile`
        text-overflow: ellipsis;
        word-break: break-all;
        white-space: nowrap;
        overflow: hidden;
        max-width: 100px;
        
        `};
      }
      &__conditions {
        display: flex;
        align-items: center;
        color: ${(props) => props.theme.colors.gray600};
        & > span {
          margin-right: 5px;
        }
      }
    }
  `,
};

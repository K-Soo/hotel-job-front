import React from 'react';
import styled, { css } from 'styled-components';
import RecruitPrice from '@/components/recruit/RecruitPrice';
import { RecruitListItem } from '@/types';
import { addressFormat, dateFormat, employmentTypeFormat } from '@/utils';
import { EXPERIENCE_CONDITION, WORKING_DAY_LIST } from '@/constants/recruitment';
import { ALL_JOBS } from '@/constants/job';
import { useRouter } from 'next/router';
import Tag from '@/components/common/Tag';
import DragScroll from '@/components/common/DragScroll';
import { motion, useAnimationControls } from 'framer-motion';
import Icon from '@/icons/Icon';
import { EDUCATION_LEVEL } from '@/constants';
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
        <span className="company">{item.hotelName}</span>

        {dateFormat.dateOrToday(item.priorityDate) === 'TODAY' ? (
          <time className="today">TODAY</time>
        ) : (
          <time className="priority">{dateFormat.dateOrToday(item.priorityDate)}</time>
        )}
      </S.HeaderBox>

      <S.ContentBox>
        <StyledTitle $isBold={isBold} $isHighlight={isHighlight}>
          {isTag && <Tag label="급구" type="URGENT" width="32px" margin="0 5px 0 0" fontSize="11px" height="17px" />}
          <h5 className="text">{item.recruitmentTitle}</h5>
        </StyledTitle>

        <div className="description">
          <Icon name="LocationA24x24" width="16px" height="16px" margin="0 1px 0 0" />

          <address className="description__address">
            {sido} {sigungu}
          </address>

          <RecruitPrice fonSize="13px" salary={item.salaryType} salaryAmount={item.salaryAmount} />
        </div>
      </S.ContentBox>

      <S.infoBox>
        <DragScroll>
          <Tag
            label={item.jobs.length > 1 ? `${ALL_JOBS[item.jobs[0]]} 외 ${item.jobs.length - 1}` : ALL_JOBS[item.jobs[0]]}
            type="JOB"
            margin="0 8px 0 0"
          />
          <Tag label={EXPERIENCE_CONDITION[item.experienceCondition]} type="CONDITION" />
          {item.workingDay && <Tag label={WORKING_DAY_LIST[item.workingDay]} type="CONDITION" />}
          <Tag label={employmentTypeFormat(item.employmentType)} type="CONDITION" />
          <Tag label={EDUCATION_LEVEL[item.educationCondition]} type="CONDITION" />
          {item.roomCount < 0 && <Tag label={`객실 수 ${item.roomCount}`} type="CONDITION" />}
          {item.workingTime.start && item.workingTime.end && (
            <Tag label={dateFormat.timeRange(item.workingTime.start, item.workingTime.end)} type="CONDITION" />
          )}
        </DragScroll>
      </S.infoBox>
    </S.RecruitMobileCard>
  );
}

const StyledTitle = styled.div<{ $isBold: boolean; $isHighlight: boolean }>`
  display: flex;
  align-items: center;
  width: 100%;
  margin-bottom: 15px;
  .text {
    width: fit-content;
    font-weight: ${(props) => (props.$isBold ? 500 : 400)};
    color: ${(props) => (props.$isBold ? '#000000' : '#222222')};
    font-size: 16px;
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
    margin: 0 auto;
    width: 100%;
    height: 130px;
    display: flex;
    flex-direction: column;
    border: 1px solid ${(props) => props.theme.colors.gray200};
    padding: 15px;
    background-color: ${(props) => props.theme.colors.white};
    margin-bottom: 10px;
    border-radius: 15px;
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
    color: ${(props) => props.theme.colors.gray700};
    font-size: 13px;
    font-weight: 500;
    margin-bottom: 5px;
    .company {
      font-size: 14px;
      font-weight: 400;
      color: ${(props) => props.theme.colors.black700};
    }
    .priority {
      color: ${(props) => props.theme.colors.black800};
    }
    .today {
      color: ${(props) => props.theme.colors.blue500};
      font-weight: 500;
    }
  `,
  ContentBox: styled.div`
    flex: 1;
    .description {
      color: ${(props) => props.theme.colors.black500};
      font-size: 13px;
      text-align: start;
      display: flex;
      align-items: center;
      &__address {
        &::after {
          content: '·';
          margin: 0 5px;
          color: ${(props) => props.theme.colors.gray600};
        }
      }
    }
  `,
  infoBox: styled.div`
    /* margin-top: 15px; */
    display: flex;
  `,
};

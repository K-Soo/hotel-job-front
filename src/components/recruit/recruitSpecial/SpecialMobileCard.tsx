import React from 'react';
import styled, { css } from 'styled-components';
import { motion } from 'framer-motion';
import Icon from '@/icons/Icon';
import RecruitPrice from '@/components/recruit/RecruitPrice';
import { useRouter } from 'next/router';
import { RecruitListItem } from '@/types';
import { ALL_JOBS } from '@/constants/job';
import { EXPERIENCE_CONDITION, WORKING_DAY_LIST } from '@/constants/recruitment';
import { addressFormat, dateFormat, employmentTypeFormat } from '@/utils';
import IconDimmed from '@/components/common/IconDimmed';
import Tag from '@/components/common/Tag';
import useResponsive from '@/hooks/useResponsive';
import DragScroll from '@/components/common/DragScroll';
import { EDUCATION_LEVEL } from '@/constants';

interface SpecialMobileCardProps {
  item: RecruitListItem;
  index: number;
}

const GRADIENT_COLORS = [
  ['#3182f6', '#b485c6'],
  ['#34d399', '#3b82f6'],
  ['#f97316', '#f43f5e'],
  ['#a855f7', '#6366f1'],
  ['#06b6d4', '#3b82f6'],
];

export default function SpecialMobileCard({ item, index }: SpecialMobileCardProps) {
  const [isBold, setIsBold] = React.useState(false);
  const [isHighlight, setIsHighlight] = React.useState(false);
  const [isTag, setIsTag] = React.useState(false);

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

  return (
    <S.SpecialMobileCard index={index}>
      <S.HeaderBox>
        {isTag && <Tag label="급구" type="URGENT" width="32px" margin="0 5px 0 0" fontSize="11px" height="17px" />}
        <Tag label="주목" type="ATTENTION" width="44px" margin="0 5px 0 0" fontSize="11px" height="17px" />

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
          <Icon name="LocationB24x24" width="16px" height="16px" margin="0 1px 0 0" />

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
          {/* {item.workingTime.start && item.workingTime.end && (
            <Tag label={dateFormat.timeRange(item.workingTime.start, item.workingTime.end)} type="CONDITION" />
          )} */}
        </DragScroll>
      </S.infoBox>
    </S.SpecialMobileCard>
  );
}

const StyledTitle = styled.div<{ $isBold: boolean; $isHighlight: boolean }>`
  margin-bottom: 10px;
  display: flex;
  width: 100%;
  .text {
    width: fit-content;
    padding: 1px 0;
    color: ${(props) => props.theme.colors.gray800};
    font-weight: ${(props) => (props.$isBold ? 500 : 400)};
    width: fit-content;
    line-height: 1.35;
    text-align: start;
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
  SpecialMobileCard: styled(motion.div)<{ index: number }>`
    ${({ index }) => {
      const colors = GRADIENT_COLORS[index % GRADIENT_COLORS.length];
      return css`
        background-image: linear-gradient(white, white), linear-gradient(to right, ${colors[0]}, ${colors[1]});
      `;
    }}
    padding: 15px;
    cursor: pointer;
    user-select: none;
    background-color: white;
    position: relative;
    border-radius: 5px;
    border-top-right-radius: 50px;
    border-top: 2px solid transparent;
    background-origin: border-box;
    background-clip: padding-box, border-box;
    box-shadow: 0 1px 5px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    margin-bottom: 15px;
    height: 135px;
  `,
  HeaderBox: styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 15px;

    .priority {
      color: ${(props) => props.theme.colors.black800};
    }
    .today {
      color: ${(props) => props.theme.colors.blue500};
      font-weight: 500;
    }
    margin-bottom: 4px;
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
        font-size: 13px;
        color: ${(props) => props.theme.colors.gray600};
        margin-top: 8px;
        ${(props) => props.theme.media.laptop`
        font-size: 12px;
      `};
        /* & > span {
        margin-right: 5px;
      } */
        &--condition {
          display: flex;
          align-items: center;
          &::after {
            content: '';
            display: inline-block;
            width: 1px;
            height: 10px;
            background-color: ${(props) => props.theme.colors.gray500};
            margin: 0 6px;
          }
        }
      }
    }
    .price-wrapper {
      margin-top: 5px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  `,
};

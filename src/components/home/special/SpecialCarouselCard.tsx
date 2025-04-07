import React from 'react';
import styled, { css } from 'styled-components';
import { motion, useAnimationControls } from 'framer-motion';
import Icon from '@/icons/Icon';
import RecruitPrice from '@/components/recruit/RecruitPrice';
import { RecruitListItem } from '@/types';
import { ALL_JOBS } from '@/constants/job';
import { EXPERIENCE_CONDITION, WORKING_DAY_LIST } from '@/constants/recruitment';
import { addressFormat, dateFormat, employmentTypeFormat } from '@/utils';
import Tag from '@/components/common/Tag';
import DragScroll from '@/components/common/DragScroll';
import { EDUCATION_LEVEL } from '@/constants';
import { useRouter } from 'next/router';

interface SpecialCarouselCardProps {
  item: RecruitListItem;
  index: number;
}

export default function SpecialCarouselCard({ item, index }: SpecialCarouselCardProps) {
  const [isBold, setIsBold] = React.useState(false);
  const [isHighlight, setIsHighlight] = React.useState(false);
  const [isTag, setIsTag] = React.useState(false);

  const router = useRouter();
  const { sido, sigungu } = addressFormat(item.address);
  const controls = useAnimationControls();

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
    <S.SpecialCarouselCard index={index} animate={controls} initial={{ scale: 1 }} onClick={handleClickRecruit}>
      <S.HeaderBox>
        <div className="flex items-center">
          {isTag && <Tag label="급구" type="URGENT" width="32px" margin="0 5px 0 0" fontSize="11px" height="17px" />}
          <span className="text-[15px]">{item.hotelName}</span>
        </div>

        {dateFormat.dateOrToday(item.priorityDate) === 'TODAY' ? (
          <time className="today">TODAY</time>
        ) : (
          <time className="priority">{dateFormat.dateOrToday(item.priorityDate)}</time>
        )}
      </S.HeaderBox>

      <S.ContentBox>
        <StyledTitle $isBold={isBold} $isHighlight={isHighlight}>
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

          {item.workingTime.start && item.workingTime.end && (
            <Tag label={dateFormat.timeRange(item.workingTime.start, item.workingTime.end)} type="CONDITION" />
          )}
        </DragScroll>
      </S.infoBox>
    </S.SpecialCarouselCard>
  );
}

const StyledTitle = styled.div<{ $isBold: boolean; $isHighlight: boolean }>`
  display: flex;
  align-items: center;
  width: 100%;
  margin-bottom: 10px;
  .text {
    width: fit-content;
    padding: 1px 0;
    color: ${(props) => props.theme.colors.gray800};
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
  SpecialCarouselCard: styled(motion.div)<{ index: number }>`
    padding: 15px;
    cursor: pointer;
    user-select: none;
    background-color: white;
    border-radius: 10px;
    overflow: hidden;
    border: 1px solid ${(props) => props.theme.colors.gray300};
    margin-bottom: 15px;
    height: 135px;
    display: flex;
    flex-direction: column;
  `,
  HeaderBox: styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 13px;
    padding-right: 15px;
    .priority {
      color: ${(props) => props.theme.colors.gray500};
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

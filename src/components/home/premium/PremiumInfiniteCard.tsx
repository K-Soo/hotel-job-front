import React from 'react';
import styled, { css } from 'styled-components';
import { motion } from 'framer-motion';
import Icon from '@/icons/Icon';
import RecruitPrice from '@/components/recruit/RecruitPrice';
import { useRouter } from 'next/router';
import { RecruitListItem } from '@/types';
import { ALL_JOBS } from '@/constants/job';
import { EXPERIENCE_CONDITION, WORKING_DAY_LIST } from '@/constants/recruitment';
import { addressFormat, employmentTypeFormat } from '@/utils';
import IconDimmed from '@/components/common/IconDimmed';
import Tag from '@/components/common/Tag';
import useResponsive from '@/hooks/useResponsive';

interface PremiumInfiniteCardProps {
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

export default function PremiumInfiniteCard({ item, index }: PremiumInfiniteCardProps) {
  const [isBold, setIsBold] = React.useState(false);
  const [isHighlight, setIsHighlight] = React.useState(false);
  const [isTag, setIsTag] = React.useState(false);

  const router = useRouter();

  const { sido, sigungu } = addressFormat(item.address);
  const { isTablet } = useResponsive();

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

  const handleClickBlank = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    window.open(`/recruit/${item.id}`, '_blank');
  };

  return (
    <S.PremiumInfiniteCard
      whileTap={{ scale: 0.98 }}
      onClick={() => router.push(`/recruit/${item.id}`)}
      index={index}
      whileHover={{ y: -5 }}
    >
      <S.HeaderBox>
        {isTag && <Tag label="급구" type="URGENT" width="32px" margin="0 5px 0 0" fontSize="11px" height="17px" />}
        <strong className="text-[15px]">{item.hotelName}</strong>
      </S.HeaderBox>

      <S.ContentBox>
        <StyledTitle $isBold={isBold} $isHighlight={isHighlight}>
          <h5 className="text">{item.recruitmentTitle}</h5>
        </StyledTitle>

        <div className="flex items-center text-[14px] text-gray-700">
          <Icon name="LocationA24x24" width="16px" height="16px" />
          <address className="pr-1">{sido}</address>
          <address>{sigungu}</address>
        </div>
      </S.ContentBox>

      <S.infoBox>
        <div>
          <Tag
            label={item.jobs.length > 1 ? `${ALL_JOBS[item.jobs[0]]} 외 ${item.jobs.length - 1}` : ALL_JOBS[item.jobs[0]]}
            type="JOB"
            margin="0 8px 0 0"
          />

          <Tag label={EXPERIENCE_CONDITION[item.experienceCondition]} type="CONDITION" />
        </div>

        <div className="mt-2 flex items-center justify-between">
          <RecruitPrice fonSize="13px" salaryAmount={item.salaryAmount} salary={item.salaryType} />
          {!isTablet && (
            <IconDimmed onClick={handleClickBlank} padding="1px">
              <Icon name="ExternalLinkB50x50" width="22px" height="22px" />
            </IconDimmed>
          )}
        </div>
      </S.infoBox>
    </S.PremiumInfiniteCard>
  );
}

const StyledJob = styled.span`
  margin-bottom: 8px;
  font-size: 15px;
`;

const StyledTitle = styled.div<{ $isBold: boolean; $isHighlight: boolean }>`
  margin-bottom: 10px;
  width: fit-content;
  .text {
    padding: 1px 0;
    color: ${(props) => props.theme.colors.gray800};
    font-weight: ${(props) => (props.$isBold ? 500 : 400)};
    width: fit-content;
    display: inline;
    line-height: 1.1;
    font-size: 18px;
    ${(props) =>
      props.$isHighlight &&
      css`
        background-color: #6877ed;
        color: #ffffff;
      `};
  }
`;

const S = {
  PremiumInfiniteCard: styled(motion.div)<{ index: number }>`
    ${({ index }) => {
      const colors = GRADIENT_COLORS[index % GRADIENT_COLORS.length];
      return css`
        background-image: linear-gradient(white, white), linear-gradient(to right, ${colors[0]}, ${colors[1]});
      `;
    }}
    width: calc(25% - 12px);
    aspect-ratio: 1;
    border-radius: 10px;
    padding: 15px;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    max-height: 230px;
    background-color: white;
    position: relative;
    border-radius: 12px;
    border-top: 3px solid transparent;
    border-bottom: 1px solid transparent;
    border-right: 1px solid transparent;
    border-left: 1px solid transparent;
    background-clip: padding-box, border-box;
    overflow: hidden;
    ${(props) => props.theme.media.laptop`
      width: calc(33.3% - 10px);
    `};
    ${(props) => props.theme.media.tablet`
      width: calc(50% - 9px);
      max-height: 220px;
    `};
  `,
  HeaderBox: styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 4px;
  `,
  ContentBox: styled.div`
    flex: 1;
  `,
  infoBox: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  `,
};

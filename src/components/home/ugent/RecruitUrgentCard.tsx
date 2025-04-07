import React from 'react';
import styled, { css } from 'styled-components';
import Icon from '@/icons/Icon';
import RecruitPrice from '@/components/recruit/RecruitPrice';
import Tag from '@/components/common/Tag';
import { motion } from 'framer-motion';
import { RecruitListItem } from '@/types';
import { ALL_JOBS } from '@/constants/job';
import { EXPERIENCE_CONDITION } from '@/constants/recruitment';
import { addressFormat, employmentTypeFormat } from '@/utils';
import IconDimmed from '@/components/common/IconDimmed';
import { useRouter } from 'next/router';
import useResponsive from '@/hooks/useResponsive';

interface RecruitUrgentCardProps {
  item: RecruitListItem;
}

export default function RecruitUrgentCard({ item }: RecruitUrgentCardProps) {
  const [isBold, setIsBold] = React.useState(false);
  const [isHighlight, setIsHighlight] = React.useState(false);
  const [isTag, setIsTag] = React.useState(false);

  const router = useRouter();
  const { isTablet } = useResponsive();
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

  const handleClickBlank = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    window.open(`/recruit/${item.id}`, '_blank');
  };

  return (
    <S.RecruitUrgentCard
      whileTap={{ scale: 0.98 }}
      whileHover={{ boxShadow: 'inset 0 0 1px 1px #3182f6' }}
      onClick={() => router.push(`/recruit/${item.id}`)}
    >
      <S.HeaderBox>
        {isTag && <Tag label="급구" type="URGENT" width="32px" margin="0 5px 0 0" fontSize="11px" height="17px" />}
        <strong className="text-[15px]">{item.hotelName}</strong>
      </S.HeaderBox>

      <S.ContentBox>
        <StyledTitle $isBold={isBold} $isHighlight={isHighlight}>
          <h5 className="recruitment-title">{item.recruitmentTitle}</h5>
        </StyledTitle>

        <div className="flex items-center text-[14px] text-gray-700">
          <Icon name="LocationA24x24" width="16px" height="16px" />
          <address className="pr-1">{sido}</address>
          <address>{sigungu}</address>
        </div>

        <strong className="mt-[5px] text-[15px] text-gray-800">
          {item.jobs.length > 1 ? `${ALL_JOBS[item.jobs[0]]} 외 ${item.jobs.length - 1}` : ALL_JOBS[item.jobs[0]]}
        </strong>
      </S.ContentBox>

      <S.JobDetailBox>
        <div className="flex items-center overflow-hidden">
          <Tag label={EXPERIENCE_CONDITION[item.experienceCondition]} type="CONDITION" />
        </div>

        <div className="mt-[10px] flex items-center justify-between">
          <RecruitPrice fonSize="13px" salaryAmount={item.salaryAmount} salary={item.salaryType} />

          {!isTablet && (
            <IconDimmed padding="1px" onClick={handleClickBlank}>
              <Icon className="title__icon" name="ExternalLinkB50x50" width="20px" height="20px" />
            </IconDimmed>
          )}
        </div>
      </S.JobDetailBox>
    </S.RecruitUrgentCard>
  );
}

const StyledTitle = styled.div<{ $isBold: boolean; $isHighlight: boolean }>`
  margin-top: 3px;
  margin-bottom: 8px;
  .recruitment-title {
    display: inline;
    line-height: 1.1;
    vertical-align: bottom;
    color: ${(props) => props.theme.colors.gray800};
    font-weight: ${(props) => (props.$isBold ? 500 : 400)};
    font-size: 16px;
    width: fit-content;
    ${(props) =>
      props.$isHighlight &&
      css`
        background-color: #6877ed;
        color: #ffffff;
      `};
  }
  ${(props) => props.theme.media.mobile`
    .recruitment-title {
      margin-top: 4px;
     }
  `};
`;

const S = {
  RecruitUrgentCard: styled(motion.div)`
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    padding: 10px;
    border: 1px solid ${(props) => props.theme.colors.gray200};
    margin: -1px;
    cursor: pointer;
    user-select: none;
    background-color: #fff;
  `,
  HeaderBox: styled.div`
    display: flex;
    align-items: center;
    font-size: 13px;
    font-weight: 500;
    color: ${(props) => props.theme.colors.gray700};
    margin-bottom: 2px;
  `,
  ContentBox: styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  `,
  JobDetailBox: styled.div`
    margin-top: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    max-width: 180px;
  `,
};

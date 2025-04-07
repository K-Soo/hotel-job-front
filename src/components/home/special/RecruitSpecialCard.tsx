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

interface RecruitSpecialCardProps {
  item: RecruitListItem;
  index: number;
}

export default function RecruitSpecialCard({ item, index }: RecruitSpecialCardProps) {
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
    <S.RecruitSpecialCard
      whileTap={{ scale: 0.98 }}
      onClick={() => router.push(`/recruit/${item.id}`)}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.1 }}
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
          <Tag label={employmentTypeFormat(item.employmentType)} type="CONDITION" />
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
    </S.RecruitSpecialCard>
  );
}

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
  RecruitSpecialCard: styled(motion.div)`
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
    overflow: hidden;
    border: 1px solid ${(props) => props.theme.colors.gray200};
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

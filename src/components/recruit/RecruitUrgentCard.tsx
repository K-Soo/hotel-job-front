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
      whileHover={{ border: '1px solid #b0b8c1' }}
      onClick={() => router.push(`/recruit/${item.id}`)}
    >
      <S.ContentBox>
        <StyledTitle $isBold={isBold} $isHighlight={isHighlight}>
          {isTag && <Tag label="급구" type="URGENT" width="32px" margin="0 5px 0 0" fontSize="11px" height="17px" />}
          <h5 className="recruitment-title">{item.recruitmentTitle}</h5>
        </StyledTitle>

        <div className="info-box">
          <div className="info-box__company">{item.hotelName}</div>
          <address className="info-box__address">
            {sido} {sigungu}
          </address>
        </div>
      </S.ContentBox>

      <S.JobDetailBox>
        <div className="jobs">
          {item.jobs.length > 1 ? (
            <span className="jobs__text">
              {ALL_JOBS[item.jobs[0]]} 외 {item.jobs.length - 1}
            </span>
          ) : (
            <span className="jobs__text">{ALL_JOBS[item.jobs[0]]}</span>
          )}
          <div className="jobs__conditions">
            <span className="jobs__conditions--condition">{EXPERIENCE_CONDITION[item.experienceCondition]}</span>
            <span>{employmentTypeFormat(item.employmentType)}</span>
          </div>
        </div>
        <div className="price-wrapper">
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
  margin-bottom: 8px;
  .recruitment-title {
    display: inline;
    line-height: 1.1;
    vertical-align: bottom;
    color: ${(props) => props.theme.colors.gray800};
    font-weight: ${(props) => (props.$isBold ? 600 : 400)};
    font-size: 15px;
    width: fit-content;
    ${(props) =>
      props.$isHighlight &&
      css`
        background-color: #6877ed;
        color: #ffffff;
      `};
  }
  ${(props) => props.theme.media.mobile`
    display: flex;
    flex-direction: column;
    .recruitment-title {
      margin-top: 4px;
     }
  `};
`;

const S = {
  RecruitUrgentCard: styled(motion.div)`
    width: calc(25% - 7.5px);
    aspect-ratio: 4 / 3;
    max-height: 165px;
    display: flex;
    flex-direction: column;
    padding: 10px;
    border: 1px solid ${(props) => props.theme.colors.gray200};
    cursor: pointer;
    border-radius: 8px;
    user-select: none;
    ${(props) => props.theme.media.tablet`
      aspect-ratio: 5 / 3;
      width: calc(50% - 5px);
    `};
    ${(props) => props.theme.media.mobile`
      max-height: 220px;
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
  `,
  ContentBox: styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .info-box {
      display: flex;
      align-items: center;
      margin-bottom: 15px;
      &__company {
        font-size: 13px;
        font-weight: 400;
        color: ${(props) => props.theme.colors.black100};
        &::after {
          content: '·';
          display: inline-block;
          color: ${(props) => props.theme.colors.black100};
          margin: 0 5px;
        }
      }
      &__address {
        font-size: 13px;
        font-weight: 300;
        color: ${(props) => props.theme.colors.gray700};
      }
    }
  `,
  JobDetailBox: styled.div`
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
      margin-top: 10px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
  `,
};

import React from 'react';
import styled, { css } from 'styled-components';
import { motion } from 'framer-motion';
import Icon from '@/icons/Icon';
import RecruitPrice from '@/components/recruit/RecruitPrice';
import { useRouter } from 'next/router';
import { RecruitListItem } from '@/types';
import { ALL_JOBS } from '@/constants/job';
import { EXPERIENCE_CONDITION } from '@/constants/recruitment';
import { addressFormat, employmentTypeFormat } from '@/utils';
import IconDimmed from '@/components/common/IconDimmed';
import Tag from '@/components/common/Tag';
import useResponsive from '@/hooks/useResponsive';

interface RecruitSpecialCardProps {
  item: RecruitListItem;
}

export default function RecruitSpecialCard({ item }: RecruitSpecialCardProps) {
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
      whileHover={{
        boxShadow: 'inset 0 0 0 1px #3182f6',
      }}
      whileTap={{ scale: 0.98 }}
      onClick={() => router.push(`/recruit/${item.id}`)}
    >
      <S.HeaderBox>
        {isTag && <Tag label="급구" type="URGENT" width="32px" margin="0 5px 0 0" fontSize="11px" height="17px" />}
        <Tag label="주목" type="ATTENTION" width="44px" margin="0 5px 0 0" fontSize="11px" height="17px" />
      </S.HeaderBox>

      <S.ContentBox>
        <StyledTitle $isBold={isBold} $isHighlight={isHighlight}>
          <h5 className="text">{item.recruitmentTitle}</h5>
        </StyledTitle>

        <div className="company">
          <div className="company__hotel">호텔 더 아무무</div>
          <address className="company__address">
            {sido} {sigungu}
          </address>
        </div>
      </S.ContentBox>

      <S.infoBox>
        <div className="jobs">
          {item.jobs.length > 1 ? (
            <span className="jobs__text">
              {ALL_JOBS[item.jobs[0]]} 외 {item.jobs.length - 1}
            </span>
          ) : (
            <span className="jobs__text">{ALL_JOBS[item.jobs[0]]}</span>
          )}
          <div className="jobs__conditions">
            <span>{EXPERIENCE_CONDITION[item.experienceCondition]}</span>
            <span>{employmentTypeFormat(item.employmentType)}</span>
          </div>
        </div>

        <div className="price-wrapper">
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
    font-weight: ${(props) => (props.$isBold ? 600 : 400)};
    width: fit-content;
    display: inline;
    line-height: 1.35;
    ${(props) =>
      props.$isHighlight &&
      css`
        background-color: #ffee07;
      `};
    &:hover {
      color: ${(props) => props.theme.colors.black};
    }
  }
`;

const S = {
  RecruitSpecialCard: styled(motion.div)`
    width: calc(33.333% - 6.7px);
    aspect-ratio: 5/3;
    border-radius: 10px;
    padding: 15px;
    border: 1px solid ${(props) => props.theme.colors.blue400};
    cursor: pointer;
    display: flex;
    user-select: none;
    flex-direction: column;
    max-height: 180px;
    ${(props) => props.theme.media.tablet`
      aspect-ratio: 5 / 3;
      width: calc(50% - 5px);
    `};

    ${(props) => props.theme.media.mobile`
      width: calc(100%);
      aspect-ratio: 2 / 1;
    `};
  `,
  HeaderBox: styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 4px;
  `,
  ContentBox: styled.div`
    flex: 1;
    .company {
      display: flex;
      font-size: 14px;
      &__hotel {
        color: ${(props) => props.theme.colors.black100};
        &::after {
          content: '|';
          margin: 0 6px;
          color: ${(props) => props.theme.colors.gray700};
        }
      }
      &__address {
        color: ${(props) => props.theme.colors.gray700};
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
        margin-top: 5px;
        ${(props) => props.theme.media.laptop`
          font-size: 12px;
        `};
        & > span {
          margin-right: 5px;
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

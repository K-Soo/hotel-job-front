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

interface RecruitSpecialCardProps {
  item: RecruitListItem;
}

export default function RecruitSpecialCard({ item }: RecruitSpecialCardProps) {
  const [isBold, setIsBold] = React.useState(false);
  const [isHighlight, setIsHighlight] = React.useState(false);
  const [isTag, setIsTag] = React.useState(false);

  const router = useRouter();

  const { sido, sigungu } = addressFormat(item.address);

  const { hasBoldEffect, hasHighlightEffect, hasTagEffect } = React.useMemo(() => {
    const currentDate = new Date();
    let hasBoldEffect = false;
    let hasHighlightEffect = false;
    let hasTagEffect = false;

    item.paymentRecruitment?.[0]?.options?.forEach((option) => {
      const postingEndDate = option.postingEndDate ? new Date(option.postingEndDate) : null;

      if (postingEndDate && currentDate <= postingEndDate) {
        if (option.name === 'LIST_UP') hasBoldEffect = true;
        if (option.name === 'HIGHLIGHT') hasHighlightEffect = true;
        if (option.name === 'TAG') hasHighlightEffect = true;
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
        border: '1px solid #4593fc',
      }}
      whileTap={{ scale: 0.98 }}
      onClick={() => router.push(`/recruit/${item.id}`)}
    >
      <S.HeaderBox>
        <div className="tags">
          {true && <Tag label="급구" type="URGENT" width="32px" margin="0 5px 0 0" fontSize="11px" height="17px" />}
        </div>
      </S.HeaderBox>

      <S.ContentBox>
        <div className="info-box">
          <StyledTitle $isBold={isBold} $isHighlight={isHighlight}>
            <h5 className="text">{item.recruitmentTitle}</h5>
          </StyledTitle>

          <div className="info-box__detail">
            <div className="info-box__detail--company">호텔 더 아무무</div>
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
          <IconDimmed onClick={handleClickBlank} padding="1px">
            <Icon name="ExternalLinkB50x50" width="22px" height="22px" />
          </IconDimmed>
        </div>
      </S.infoBox>
    </S.RecruitSpecialCard>
  );
}

const StyledTitle = styled.div<{ $isBold: boolean; $isHighlight: boolean }>`
  margin-bottom: 5px;
  width: fit-content;
  .text {
    padding: 1px 3px 1px 0;
    color: ${(props) => props.theme.colors.gray800};
    font-weight: ${(props) => (props.$isBold ? 600 : 400)};
    width: fit-content;
    display: inline;
    line-height: 1.35;
    ${(props) =>
      props.$isHighlight &&
      css`
        background: linear-gradient(135deg, #c9e2ff 30%, transparent 70%), linear-gradient(-45deg, #e8f3ff 30%, transparent 70%);
        background-blend-mode: multiply;
        border-radius: 2px;
      `};
    &:hover {
      color: ${(props) => props.theme.colors.black};
    }
  }
`;

const RecruitTag = styled.span`
  height: 18px;
  width: fit-content;
  display: flex;
  align-items: center;
  padding: 0px 5px;
  border-radius: 3px;
  margin-right: 8px;
  background-color: ${(props) => props.theme.colors.blue50};
  font-size: 13px;
  font-weight: 300;
  color: ${(props) => props.theme.colors.blue800};
  letter-spacing: 0.8px;
  &:hover {
    background-color: ${(props) => props.theme.colors.blue100};
  }
`;

const S = {
  RecruitSpecialCard: styled(motion.div)`
    width: calc(33.333% - 6.7px);
    aspect-ratio: 5/3;
    border-radius: 10px;
    padding: 15px;
    border: 1px solid ${(props) => props.theme.colors.blue100};
    cursor: pointer;
    display: flex;
    user-select: none;
    flex-direction: column;
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
    justify-content: space-between;
    align-items: center;
    margin-bottom: 4px;
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
        display: flex;
        align-items: center;
        margin-bottom: 10px;
        &--text {
          color: ${(props) => props.theme.colors.gray800};
          font-size: 16px;
          font-weight: 500;
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
      }
      &__detail {
        display: flex;
        flex-direction: column;
        &--company {
          font-size: 14px;
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

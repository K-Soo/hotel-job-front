import React from 'react';
import styled, { css } from 'styled-components';
import { useAnimationControls } from 'framer-motion';
import Icon from '@/icons/Icon';
import Tag from '@/components/common/Tag';
import RecruitPrice from '@/components/recruit/RecruitPrice';
import { RecruitListItem } from '@/types';
import { addressFormat, employmentTypeFormat } from '@/utils';
import { EXPERIENCE_CONDITION } from '@/constants/recruitment';
import { ALL_JOBS } from '@/constants/job';
import { useRouter } from 'next/router';
import IconDimmed from '@/components/common/IconDimmed';
import { dateFormat } from '@/utils';
import { CITY_KOREAN_MAP } from '@/constants/location';

interface RecruitDesktopCardProps {
  item: RecruitListItem;
}

export default function RecruitDesktopCard({ item }: RecruitDesktopCardProps) {
  const [isBold, setIsBold] = React.useState(false);
  const [isHighlight, setIsHighlight] = React.useState(false);
  const [isTag, setIsTag] = React.useState(false);
  const [isExpanded, setIsExpanded] = React.useState(false);

  const { sido, sigungu } = addressFormat(item.address);
  const router = useRouter();

  const expansionContentRef = React.useRef(null);
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

  const handleClickBlank = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    window.open(`/recruit/${item.id}`, '_blank');
  };

  const handleClickExpansion = () => {
    setIsExpanded((prev) => !prev);
    controls.start({
      height: isExpanded ? 80 : 0,
      transition: { duration: 0.1 },
    });
  };

  return (
    <S.RecruitDesktopCard onClick={() => router.push(`/recruit/${item.id}`)} $isClosed={item.recruitmentStatus === 'CLOSED'}>
      <S.Body>
        <S.LocationRow>
          <div className="location-box">
            <span className="city">{CITY_KOREAN_MAP[sido as keyof typeof CITY_KOREAN_MAP]}</span>
            <span className="suburbs">{sigungu}</span>
          </div>
        </S.LocationRow>

        <S.Summary>
          <StyledTitle $isBold={isBold} $isHighlight={isHighlight}>
            {isTag && <Tag label="급구" type="URGENT" width="32px" margin="0 5px 0 0" fontSize="11px" height="17px" />}
            <h5 className="text">{item.recruitmentTitle}</h5>
          </StyledTitle>
          <div className="company">{item.hotelName}</div>
        </S.Summary>

        <S.Utils>
          <IconDimmed padding="2px">
            <Icon className="icon" name="ExternalLinkB50x50" onClick={handleClickBlank} width="22px" height="22px" />
          </IconDimmed>

          {/*  TODO : 드롭다운
          <Icon
            className="icon"
            name="SearchPlusA24x24"
            width="18px"
            height="18px"
            onClick={(event: React.MouseEvent<HTMLElement>) => {
              event.stopPropagation();
              handleClickExpansion();
            }}
          /> */}
        </S.Utils>

        <S.JobRow>
          {item.jobs.length > 1 ? (
            <span>
              {ALL_JOBS[item.jobs[0]]} 외 {item.jobs.length - 1}
            </span>
          ) : (
            <span>{ALL_JOBS[item.jobs[0]]}</span>
          )}
        </S.JobRow>

        <S.InfoRow>
          <span className="text">{EXPERIENCE_CONDITION[item.experienceCondition]}</span>
          <span className="text">{employmentTypeFormat(item.employmentType)}</span>
        </S.InfoRow>

        <S.PayRow>
          <RecruitPrice salary={item.salaryType} salaryAmount={item.salaryAmount} />
        </S.PayRow>

        <S.DateRow>
          {dateFormat.dateOrToday(item.priorityDate) === 'TODAY' ? (
            <span className="today">TODAY</span>
          ) : (
            <span>{dateFormat.dateOrToday(item.priorityDate)}</span>
          )}
        </S.DateRow>
      </S.Body>
      {/* TODO - 드롭다운 */}
      {/* <ExpansionContent initial={{ height: 0, opacity: 0 }} animate={controls} ref={expansionContentRef}>
        asd
      </ExpansionContent> */}
    </S.RecruitDesktopCard>
  );
}

const StyledTitle = styled.div<{ $isBold: boolean; $isHighlight: boolean }>`
  width: fit-content;
  margin-bottom: 4px;
  display: flex;
  align-items: center;
  .text {
    padding: 1px 3px 1px 2px;
    color: ${(props) => props.theme.colors.gray800};
    font-weight: ${(props) => (props.$isBold ? 600 : 400)};
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
  RecruitDesktopCard: styled.article<{ $isClosed: boolean }>`
    width: 100%;
    font-size: 14px;
    display: flex;
    flex-direction: column;
    user-select: none;
    color: ${(props) => props.theme.colors.black100};
    border-bottom: 1px solid ${(props) => props.theme.colors.gray300};
    height: auto;
    cursor: pointer;
    &:hover {
      /* background-color: ${(props) => props.theme.colors.gray}; */
      background-color: ${(props) => (props.$isClosed ? 'none' : props.theme.colors.gray)};
    }
    ${(props) =>
      props.$isClosed &&
      css`
        background-color: ${props.theme.colors.gray};
      `};
  `,
  Body: styled.div`
    display: flex;
    align-items: center;
    height: 80px;
  `,
  LocationRow: styled.div`
    flex: 1 1 8%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding-left: 5px;
    position: relative;
    height: 100%;
    .location-box {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      .city {
        margin-bottom: 5px;
        color: ${(props) => props.theme.colors.gray800};
      }
      .suburbs {
        color: ${(props) => props.theme.colors.gray700};
      }
    }
  `,
  Summary: styled.div`
    flex: 1 1 50%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100%;
    position: relative;
    padding-left: 10px;
    .icon {
      position: absolute;
      right: 5px;
      bottom: 0;
      fill: ${(props) => props.theme.colors.gray300};
    }
    .company {
      font-size: 14px;
      font-weight: 300;
      color: ${(props) => props.theme.colors.gray800};
      padding-left: 2px;
    }
  `,
  Utils: styled.div`
    flex: 1 0 7%;
    height: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    cursor: pointer;
    svg {
      color: #777;
    }
  `,
  JobRow: styled.div`
    flex: 1 1 10%;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    font-size: 13px;
    span {
      text-align: center;
    }
  `,
  InfoRow: styled.div`
    flex: 1 1 8%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: 13px;
    color: #475067;
    height: 100%;
    .text {
      padding: 1px 0;
    }
  `,
  PayRow: styled.div`
    flex: 1 0 15%;
    display: flex;
    flex-shrink: 0;
    align-items: center;
    justify-content: flex-end;
    flex-wrap: wrap;
    height: 100%;
    padding-right: 15px;
  `,
  DateRow: styled.div`
    flex: 1 1 8%;
    height: 100%;
    display: flex;
    flex-direction: column;
    display: flex;
    align-items: center;
    justify-content: center;
    letter-spacing: 0.2px;
    color: #475067;
    font-size: 13px;
    font-weight: 400;
    .today {
      color: ${(props) => props.theme.colors.blue500};
      font-weight: 500;
    }
  `,
};

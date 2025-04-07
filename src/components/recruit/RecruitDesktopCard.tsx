import React from 'react';
import styled, { css } from 'styled-components';
import { useAnimationControls } from 'framer-motion';
import Icon from '@/icons/Icon';
import Tag from '@/components/common/Tag';
import RecruitPrice from '@/components/recruit/RecruitPrice';
import { RecruitListItem } from '@/types';
import { addressFormat, employmentTypeFormat } from '@/utils';
import { EXPERIENCE_CONDITION, WORKING_DAY_LIST } from '@/constants/recruitment';
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
            <span className="mb-1 text-gray-800">{CITY_KOREAN_MAP[sido as keyof typeof CITY_KOREAN_MAP]}</span>
            <span className="text-gray-800">{sigungu}</span>
          </div>
        </S.LocationRow>

        <S.Summary>
          <div className="mb-2 flex items-center">
            {isTag && <Tag label="급구" type="URGENT" width="32px" margin="0 5px 0 0" fontSize="11px" height="17px" />}
            <div className="text-[14px] font-light text-black">{item.hotelName}</div>
          </div>

          <StyledTitle $isBold={isBold} $isHighlight={isHighlight}>
            <h5 className="text">{item.recruitmentTitle}</h5>
          </StyledTitle>
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
          <span>{employmentTypeFormat(item.employmentType)}</span>
          <span>{EXPERIENCE_CONDITION[item.experienceCondition]}</span>
          {item.workingDay && <span>{WORKING_DAY_LIST[item.workingDay]}</span>}
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
    color: ${(props) => props.theme.colors.gray800};
    font-weight: ${(props) => (props.$isBold ? 500 : 400)};
    font-size: 16px;
    ${(props) =>
      props.$isHighlight &&
      css`
        background-color: #6877ed;
        color: #ffffff;
      `};
  }
`;

const S = {
  RecruitDesktopCard: styled.article<{ $isClosed: boolean }>`
    width: 100%;
    font-size: 14px;
    display: flex;
    flex-direction: column;
    user-select: none;
    border-bottom: 1px solid ${(props) => props.theme.colors.gray200};
    height: auto;
    cursor: pointer;
    &:hover {
      background-color: ${(props) => (props.$isClosed ? 'none' : props.theme.colors.blue)};
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
    flex: 1 1 15%;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    font-size: 15px;
    font-weight: 500;
    padding: 0 5px;
    color: ${(props) => props.theme.colors.black400};
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
    font-size: 14px;
    color: ${(props) => props.theme.colors.gray800};
    height: 100%;
    gap: 3px;
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

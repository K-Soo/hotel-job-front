import React from 'react';
import styled from 'styled-components';
import { motion, useAnimationControls } from 'framer-motion';
import Icon from '@/icons/Icon';
import Tag from '@/components/common/Tag';
import RecruitPrice from '@/components/recruit/RecruitPrice';
import { RecruitListItem } from '@/types';
import { addressFormat, employmentTypeFormat } from '@/utils';
import { EXPERIENCE_CONDITION } from '@/constants/recruitment';
import { ALL_JOBS } from '@/constants/job';
import { useRouter } from 'next/router';
import IconDimmed from '@/components/common/IconDimmed';

interface RecruitDesktopCardProps {
  recruitType: 'URGENT' | 'NORMAL';
  item: RecruitListItem;
}

export default function RecruitDesktopCard({ recruitType, item }: RecruitDesktopCardProps) {
  const [isExpanded, setIsExpanded] = React.useState(false);

  const { sido, sigungu } = addressFormat(item.address);
  const router = useRouter();

  const expansionContentRef = React.useRef(null);
  const controls = useAnimationControls();

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
    <S.RecruitDesktopCard
      onClick={(event) => {
        event.stopPropagation();
      }}
    >
      <S.Body>
        <S.LocationRow>
          <div className="location-box">
            <span className="city">{sido}</span>
            <span className="suburbs">{sigungu}</span>
          </div>
        </S.LocationRow>

        <S.Summary onClick={() => router.push(`/recruit/${item.id}`)}>
          <div style={{ display: 'flex' }}>
            {recruitType === 'URGENT' && <Tag label="급구" type="URGENT" />}
            {/* <RecruitTag>숙식제공</RecruitTag> */}
            {/* <RecruitTag>식대제공</RecruitTag> */}
          </div>
          <div className="title">
            <h5 className="title__text">{item.recruitmentTitle}</h5>
          </div>
          <div className="company">{item.hotelName}</div>
        </S.Summary>

        <S.Utils>
          <IconDimmed padding="2px">
            <Icon className="icon" name="ExternalLinkB50x50" onClick={handleClickBlank} width="22px" height="22px" />
          </IconDimmed>

          <Icon
            className="icon"
            name="SearchPlusA24x24"
            width="18px"
            height="18px"
            onClick={(event: React.MouseEvent<HTMLElement>) => {
              event.stopPropagation();
              handleClickExpansion();
            }}
          />
        </S.Utils>

        {item.jobs.length > 1 ? (
          <S.JobRow>
            {ALL_JOBS[item.jobs[0]]} 외 {item.jobs.length - 1}
          </S.JobRow>
        ) : (
          <S.JobRow>{ALL_JOBS[item.jobs[0]]}</S.JobRow>
        )}

        <S.InfoRow>
          <span className="text">{EXPERIENCE_CONDITION[item.experienceCondition]}</span>
          <span className="text">{employmentTypeFormat(item.employmentType)}</span>
        </S.InfoRow>

        <S.PayRow>
          <RecruitPrice salary={item.salaryType} salaryAmount={item.salaryAmount} />
        </S.PayRow>

        <S.DateRow>
          <span>TODAY</span>
        </S.DateRow>
      </S.Body>
      <ExpansionContent initial={{ height: 0, opacity: 0 }} animate={controls} ref={expansionContentRef}>
        asd
      </ExpansionContent>
    </S.RecruitDesktopCard>
  );
}

const ExpansionContent = styled(motion.div)``;

const RecruitTag = styled.span`
  height: 18px;
  width: fit-content;
  display: flex;
  align-items: center;
  padding: 0px 5px;
  border-radius: 3px;
  margin: 0 10px 5px 0;
  background-color: ${(props) => props.theme.colors.blue50};
  font-size: 13px;
  font-weight: 300;
  color: ${(props) => props.theme.colors.blue800};
  /* color: gray; */
  letter-spacing: 0.8px;
`;

const S = {
  RecruitDesktopCard: styled.article`
    width: 100%;
    font-size: 14px;
    display: flex;
    flex-direction: column;
    user-select: none;
    color: ${(props) => props.theme.colors.black100};
    border-bottom: 1px solid ${(props) => props.theme.colors.gray300};
    height: auto;
    &:hover {
      background-color: ${(props) => props.theme.colors.gray};
    }
  `,
  Body: styled.div`
    display: flex;
    align-items: center;
    height: 100px;
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
        padding-bottom: 5px;
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
    cursor: pointer;
    padding-left: 10px;
    .icon {
      position: absolute;
      right: 5px;
      bottom: 0;
      fill: ${(props) => props.theme.colors.gray300};
    }
    .title {
      font-weight: 500;
      font-size: 16px;
      margin-bottom: 3px;
      color: ${(props) => props.theme.colors.gray800};
      display: flex;
      align-items: center;
      &:hover {
        text-decoration: underline;
      }
      &__text {
        color: ${(props) => props.theme.colors.gray800};
      }
      &__icon {
        margin-left: 8px;
        fill: ${(props) => props.theme.colors.gray500};
      }
    }
    .company {
      font-size: 14px;
      font-weight: 300;
      color: ${(props) => props.theme.colors.gray800};
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
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    height: 100%;

    .pay-wrapper {
      background-color: ${(props) => props.theme.colors.gray100};
      padding: 5px 8px;
      border-radius: 5px;
      &__type {
        letter-spacing: 1px;
        padding-right: 5px;
        color: #ff501b; //월급
        /* color: #00b0a6; //시급 */
        /* color: #8050c8; //일급 */
        /* color: #00a1ef; //연봉 */
      }
      &__price {
        letter-spacing: 0.3px;
        font-weight: 500;
      }
    }
  `,
  DateRow: styled.div`
    flex: 1 1 8%;
    height: 100%;
    display: flex;
    flex-direction: column;
    display: flex;
    align-items: center;
    justify-content: center;
  `,
};

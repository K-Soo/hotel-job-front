import React from 'react';
import styled from 'styled-components';
import { motion, useAnimationControls } from 'framer-motion';
import Icon from '@/icons/Icon';
import Tag from '@/components/common/Tag';
import RecruitPrice from '@/components/recruit/RecruitPrice';

interface RecruitDesktopCardProps {
  recruitType: 'URGENT' | 'NORMAL';
}

export default function RecruitDesktopCard({ recruitType }: RecruitDesktopCardProps) {
  const [isExpanded, setIsExpanded] = React.useState(false);

  const expansionContentRef = React.useRef(null);
  const controls = useAnimationControls();

  const handleClickCard = () => {
    window.open('/recruit/1', '_blank');
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
            <span className="city">서울</span>
            <span className="suburbs">송파구</span>
          </div>
        </S.LocationRow>

        <S.Summary>
          <div style={{ display: 'flex' }}>
            {recruitType === 'URGENT' && <Tag label="급구" type="URGENT" />}
            {/* <RecruitTag>숙식제공</RecruitTag> */}
            {/* <RecruitTag>식대제공</RecruitTag> */}
          </div>
          <div className="title">
            <h5 className="title__text">분당 격일제 당번 채용공고입니다.</h5>
            <Icon className="title__icon" name="ExternalLinkB50x50" width="24px" height="24px" />
          </div>
          <div className="company">영주온천 관광호텔</div>
        </S.Summary>

        <S.Utils
          onClick={(event) => {
            event.stopPropagation();
            handleClickExpansion();
          }}
        >
          <Icon className="icon" name="SearchPlusA24x24" width="24px" height="24px" margin="0" />
        </S.Utils>

        <S.JobRow>지배인,당번</S.JobRow>

        <S.InfoRow>
          <span className="text">경력 무관</span>
          <span className="text">정규직</span>
          <span className="text">외국인 무관</span>
        </S.InfoRow>

        <S.PayRow>
          <RecruitPrice />
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

const ExpansionContent = styled(motion.div)`
  border: 1px solid red;
`;

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
    cursor: pointer;
    &:hover {
      /* transition: 0.3s; */
      background-color: ${(props) => props.theme.colors.gray};
    }
  `,
  Body: styled.div`
    display: flex;
    align-items: center;
    height: 100px;
  `,
  LocationRow: styled.div`
    flex: 1 0 12%;
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
      &__text {
        &:hover {
          text-decoration: underline;
        }
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
    flex: 1 0 4%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    svg {
      width: 22px;
      height: 22px;
      color: ${(props) => props.theme.colors.gray400};
    }
  `,
  JobRow: styled.div`
    flex: 1 1 10%;
    display: flex;
    align-items: center;
    justify-content: center;
  `,
  InfoRow: styled.div`
    flex: 1 1 8%;
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 13px;
    color: #475067;
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
    flex: 1 1 5%;
    display: flex;
    flex-direction: column;
    display: flex;
    align-items: center;
    justify-content: center;
  `,
};

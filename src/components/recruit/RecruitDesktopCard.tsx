import React from 'react';
import styled from 'styled-components';
import { motion, useAnimationControls } from 'framer-motion';
import Icon from '@/icons/Icon';

interface RecruitDesktopCardProps {}

export default function RecruitDesktopCard({}: RecruitDesktopCardProps) {
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
    });
  };

  return (
    <S.RecruitDesktopCard onClick={() => {}}>
      <S.Body>
        <S.LocationRow>
          <Icon name="Star24x24" width="20px" height="20px" margin="0 13px 0 0" />
          <div className="location-box">
            <span className="city">서울</span>
            <span className="suburbs">송파구</span>
          </div>
        </S.LocationRow>

        <S.Summary>
          <Icon
            className="icon"
            name="maximizeSquareA24x24"
            width="24px"
            height="24px"
            margin="0 13px 0 0"
            onClick={handleClickExpansion}
          />

          <div style={{ display: 'flex' }}>
            <RecruitTag>숙식제공</RecruitTag>
            <RecruitTag>식대제공</RecruitTag>
          </div>
          <h6 className="title">분당 격일제 당번 채용공고입니다.</h6>
          <div className="company">영주온천 관광호텔</div>
        </S.Summary>

        <S.JobRow>지배인,당번</S.JobRow>

        <S.InfoRow>
          <span className="text">경력 무관</span>
          <span className="text">정규직</span>
          <span className="text">외국인 무관</span>
        </S.InfoRow>

        <S.PayRow>
          <div className="pay-wrapper">
            <span className="pay-wrapper__type">월급</span>
            <span className="pay-wrapper__price">5,200,000</span>
          </div>
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
    cursor: pointer;
    font-size: 14px;
    display: flex;
    flex-direction: column;
    user-select: none;
    color: ${(props) => props.theme.colors.black100};
    border-bottom: 1px solid ${(props) => props.theme.colors.gray300};
    height: auto;
    &:hover {
      /* transition: 0.3s; */
      /* background-color: ${(props) => props.theme.colors.blue100}; */
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
    svg {
      fill: ${(props) => props.theme.colors.gray400};
      position: absolute;
      top: 10px;
      left: 10px;
    }
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
    /* border: 1px solid gray; */
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
      &:hover {
        text-decoration: underline;
      }
    }
    .company {
      font-size: 14px;
      font-weight: 300;
      color: ${(props) => props.theme.colors.gray800};
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

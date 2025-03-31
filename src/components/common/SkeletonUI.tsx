import styled, { css } from 'styled-components';

export const SkeletonAnimation = css`
  width: 100%;
  height: 30px;
  background-color: ${(props) => props.theme.colors.gray100};
  position: relative;
  overflow: hidden;
  border-radius: 4px;
  animation: skeleton-gradient 1.5s infinite ease-in-out;
  opacity: 0.7;

  @keyframes skeleton-gradient {
    0%,
    100% {
      background-color: ${(props) => props.theme.colors.gray100};
    }
    50% {
      background-color: ${(props) => props.theme.colors.gray};
    }
  }

  /* // 오른쪽으로 갈수록 투명
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(to right, rgba(255, 255, 255, 0) 70%, rgba(255, 255, 255, 1) 100%);
  } */
`;

const Line = ({ style }: { style?: React.CSSProperties }) => {
  return <StyledLine style={style} />;
};

const StyledLine = styled.div`
  ${SkeletonAnimation}
  width: 100%;
  height: 50px;
  border-radius: 10px;
`;

const Document = ({ style }: { style?: React.CSSProperties }) => {
  return (
    <StyledDocument style={style}>
      <div className="container">
        <Line style={{ height: '50px', margin: '0 0 15px 0' }} />
        <Line style={{ height: '50px', margin: '0 0 15px 0' }} />
        <Line style={{ height: '50px', margin: '0 0 15px 0' }} />
        <Line style={{ height: '50px', margin: '0 0 15px 0' }} />
        <Line style={{ height: '50px', margin: '0 0 15px 0' }} />
        <Line style={{ height: '50px', margin: '0 0 15px 0' }} />
        <Line style={{ height: '50px', margin: '0 0 15px 0' }} />
      </div>
    </StyledDocument>
  );
};

const StyledDocument = styled.section`
  height: auto;
  max-width: 100%;
  margin: 0 auto;
  .container {
    max-width: 1024px;
  }
`;

const Table = ({ style }: { style?: React.CSSProperties }) => {
  return (
    <StyledTable style={style}>
      <div className="container">
        <Line style={{ height: '50px', borderRadius: '0', borderBottom: '1px solid #f5f5f5' }} />
        <Line style={{ height: '50px', borderRadius: '0', borderBottom: '1px solid #f5f5f5' }} />
        <Line style={{ height: '50px', borderRadius: '0', borderBottom: '1px solid #f5f5f5' }} />
        <Line style={{ height: '50px', borderRadius: '0', borderBottom: '1px solid #f5f5f5' }} />
        <Line style={{ height: '50px', borderRadius: '0', borderBottom: '1px solid #f5f5f5' }} />
        <Line style={{ height: '50px', borderRadius: '0', borderBottom: '1px solid #f5f5f5' }} />
        <Line style={{ height: '50px', borderRadius: '0', borderBottom: '1px solid #f5f5f5' }} />
        <Line style={{ height: '50px', borderRadius: '0', borderBottom: '1px solid #f5f5f5' }} />
        <Line style={{ height: '50px', borderRadius: '0', borderBottom: '1px solid #f5f5f5' }} />
      </div>
    </StyledTable>
  );
};

const StyledTable = styled.section`
  height: auto;
  max-width: 100%;
  margin: 0 auto;
  border-top: 1px solid ${(props) => props.theme.colors.gray700};
  border-bottom: 1px solid ${(props) => props.theme.colors.gray700};
`;

const Tabs = ({ style }: { style?: React.CSSProperties }) => {
  return (
    <StyledTabs style={style}>
      {new Array(6).fill('').map((_, index) => (
        <div className="item" key={index}>
          <span className="item__text"></span>
        </div>
      ))}
    </StyledTabs>
  );
};

const StyledTabs = styled.div`
  display: flex;
  .item {
    width: 100px;
    height: 50px;
    margin-right: 5px;
    display: flex;
    align-items: center;
    &__text {
      display: inline-block;
      ${SkeletonAnimation}
      height: 30px;
      width: 80px;
    }
  }
`;

const Recruitment = ({ style }: { style?: React.CSSProperties }) => {
  return (
    <StyleRecruitment>
      <div className="recruitment-container">
        <div className="content">
          <Line style={{ height: '50px', borderRadius: '5px', marginBottom: '15px' }} />
          <Line style={{ height: '50px', borderRadius: '5px', marginBottom: '15px' }} />
          <Line style={{ height: '50px', borderRadius: '5px', marginBottom: '15px' }} />
          <Line style={{ height: '50px', borderRadius: '5px', marginBottom: '15px' }} />
          <Line style={{ height: '50px', borderRadius: '5px', marginBottom: '15px' }} />
          <Line style={{ height: '50px', borderRadius: '5px', marginBottom: '15px' }} />
          <Line style={{ height: '50px', borderRadius: '5px', marginBottom: '15px' }} />
        </div>
        <div className="side">
          <Line style={{ height: '50px', borderRadius: '5px', marginBottom: '15px' }} />
          <Line style={{ height: '50px', borderRadius: '5px' }} />
        </div>
      </div>
    </StyleRecruitment>
  );
};

const StyleRecruitment = styled.section`
  .recruitment-container {
    margin: 0 auto;
    max-width: 1024px;
    display: flex;
    height: 100%;
    .content {
      flex: 1;
    }
    .side {
      width: 250px;
      margin-left: 30px;
    }
  }
`;

const ResumeListItems = () => {
  return (
    <StyleResumeListItems>
      <StyledLine style={{ height: '120px', borderRadius: '15px', margin: '10px 0' }} />
      <StyledLine style={{ height: '120px', borderRadius: '15px', margin: '10px 0' }} />
    </StyleResumeListItems>
  );
};

const StyleResumeListItems = styled.div``;

const RecruitMentProductPreview = () => {
  return (
    <StyledRecruitMentProductPreview>
      <div className="tabs" />
      <div className="image" />
    </StyledRecruitMentProductPreview>
  );
};

const StyledRecruitMentProductPreview = styled.div`
  .tabs {
    ${SkeletonAnimation}
    height: 50px;
    margin-bottom: 15px;
    border-radius: 5px;
  }
  .image {
    ${SkeletonAnimation}
    border-radius: 5px;
    width: 370px;
    height: 730px;
  }
`;

const RecruitMentProductList = () => {
  return (
    <StyledRecruitMentProductList>
      <div className="item" />
      <div className="item" />
      <div className="item" />
    </StyledRecruitMentProductList>
  );
};

const StyledRecruitMentProductList = styled.div`
  width: 100%;
  margin-left: 30px;
  .item {
    ${SkeletonAnimation}
    border-radius: 10px;
    padding: 20px;
    width: 100%;
    margin-bottom: 30px;
    height: 216px;
  }
`;

const RecruitSpecialList = ({ count }: { count: number }) => {
  return (
    <StyledRecruitSpecialList>
      {Array.from({ length: count }, (_, index) => (
        <div key={index} className="item"></div>
      ))}
    </StyledRecruitSpecialList>
  );
};

const StyledRecruitSpecialList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  margin-bottom: 50px;
  .item {
    ${SkeletonAnimation}
    width: calc(33.333% - 14px);
    border-radius: 10px;
    aspect-ratio: 5/3;
    height: 100%;
    ${(props) => props.theme.media.tablet`
      width: 100%;
      height: 135px;
    `};
  }
`;

const RecruitUrgentList = ({ count }: { count: number }) => {
  return (
    <StyledRecruitUrgentList>
      {Array.from({ length: count }, (_, index) => (
        <div key={index} className="item"></div>
      ))}
    </StyledRecruitUrgentList>
  );
};

const StyledRecruitUrgentList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 50px;
  .item {
    ${SkeletonAnimation}
    width: calc(25% - 7.5px);
    aspect-ratio: 4 / 3;
    height: 100%;
    ${(props) => props.theme.media.tablet`
      aspect-ratio: 5 / 3;
      width: calc(50% - 5px);
    `};
  }
`;

const RecruitBasicList = ({ count }: { count: number }) => {
  return (
    <StyledRecruitBasicList>
      {Array.from({ length: count }, (_, index) => (
        <div key={index} className="item" />
      ))}
    </StyledRecruitBasicList>
  );
};

const StyledRecruitBasicList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 50px;
  .item {
    ${SkeletonAnimation}
    height: 80px;
    ${(props) => props.theme.media.tablet`
      height: 160px;
    `};
  }
`;

const Icon = ({ style, margin }: { style?: React.CSSProperties; margin?: string }) => {
  return <StyledIcon style={style} $margin={margin}></StyledIcon>;
};

const StyledIcon = styled.div<{ $margin?: string }>`
  ${SkeletonAnimation} width: 40px;
  margin: ${(props) => props.$margin};
  height: 40px;
  border-radius: 50%;
`;

const RecruitmentDetail = () => {
  return (
    <StyledRecruitmentDetail>
      <div className="content">
        <div className="header">
          <Line style={{ height: '20px', width: '200px', marginBottom: '5px' }} />
          <div className="header__icons">
            <Icon style={{ marginRight: '10px' }} />
            <Icon />
          </div>
        </div>
        <Line style={{ height: '27px', width: '300px', marginBottom: '50px' }} />

        {/* 근무조건 */}
        <Line style={{ height: '22px', width: '100px', marginBottom: '15px' }} />
        <Line style={{ height: '100px', width: '100%', marginBottom: '50px' }} />

        {/* 모집내용 */}
        <Line style={{ height: '22px', width: '100px', marginBottom: '15px' }} />
        <Line style={{ height: '100px', width: '100%', marginBottom: '50px' }} />

        {/* 상세내용 */}
        <Line style={{ height: '22px', width: '100px', marginBottom: '15px' }} />
        <Line style={{ height: '100px', width: '100%', marginBottom: '20px' }} />
        <Line style={{ height: '100px', width: '100%', marginBottom: '20px' }} />
      </div>
      <div className="side">
        <Line style={{ height: '50px' }} />
      </div>
    </StyledRecruitmentDetail>
  );
};

const StyledRecruitmentDetail = styled.section`
  display: flex;
  height: 100%;
  .content {
    flex: 1;
    .header {
      display: flex;
      align-items: flex-end;
      justify-content: space-between;
      margin-bottom: 8px;
      &__icons {
        display: flex;
        align-items: center;
        justify-content: flex-end;
      }
    }
  }
  .side {
    flex: 0 1 330px;
    margin-left: 30px;
    ${(props) => props.theme.media.tablet`
      display: none;
    `};
  }
`;

const SkeletonUI = {
  ResumeListItems,
  Document,
  Line,
  Table,
  Tabs,
  Icon,
  Recruitment,
  RecruitMentProductPreview,
  RecruitMentProductList,
  RecruitSpecialList,
  RecruitUrgentList,
  RecruitBasicList,
  RecruitmentDetail,
};

export default SkeletonUI;

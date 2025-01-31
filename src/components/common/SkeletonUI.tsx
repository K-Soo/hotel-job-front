import styled, { css } from 'styled-components';

export const SkeletonAnimation = css`
  width: 100%;
  height: 30px;
  background-color: #f2f2f2;
  position: relative;
  overflow: hidden;
  border-radius: 4px;
  animation: skeleton-gradient 1.5s infinite ease-in-out;
  @keyframes skeleton-gradient {
    0%,
    100% {
      background-color: rgba(165, 165, 165, 0.1);
    }
    50% {
      background-color: rgba(165, 165, 165, 0.3);
    }
  }
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
    margin: 0 auto;
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
      <StyledLine style={{ height: '100px', borderRadius: '15px', margin: '10px 0' }} />
      <StyledLine style={{ height: '100px', borderRadius: '15px', margin: '10px 0' }} />
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

const SkeletonUI = {
  ResumeListItems,
  Document,
  Line,
  Table,
  Tabs,
  Recruitment,
  RecruitMentProductPreview,
  RecruitMentProductList,
};

export default SkeletonUI;

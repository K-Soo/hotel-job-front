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

const SkeletonUI = {
  Document,
  Line,
};

export default SkeletonUI;

import styled from 'styled-components';
import Image from 'next/image';

interface AdvantageProps {}

export default function Advantage({}: AdvantageProps) {
  return (
    <S.Advantage>
      <div className="advantage-container">
        <StyledDimmed />
        <div className="image-box">
          <Image src="/images/landing/landing1.png" fill alt="landing" quality={100} />
        </div>
      </div>
    </S.Advantage>
  );
}

const StyledDimmed = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 1;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.02), rgba(0, 0, 0, 0));
  border-radius: inherit;
  top: 0;
  left: 0;
`;

const S = {
  Advantage: styled.div`
    padding: 0 20px 100px 0;
    min-height: 400px;
    background-color: #f4f8ff;
    ${(props) => props.theme.media.tablet`
      padding: 50px 20px;
    `};
    .advantage-container {
      margin: 0 auto;
      max-width: 1024px;
      padding: 20px;
      border-radius: 20px;
      background-color: ${(props) => props.theme.colors.gray100};
      position: relative;
      .image-box {
        position: relative;
        aspect-ratio: 16 / 9;
        width: 100%;
        overflow: hidden;
        font-size: 0;
        border-radius: 10px;
        background-color: ${(props) => props.theme.colors.gray100};
      }
    }
  `,
};

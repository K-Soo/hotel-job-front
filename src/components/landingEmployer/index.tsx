import styled from 'styled-components';
import Image from 'next/image';
import RecruitFlow from '@/components/landingEmployer/RecruitFlow';
import Announcement from '@/components/landingEmployer/Announcement';
import Benefit from '@/components/landingEmployer/Benefit';
import DifferencePoint from '@/components/landingEmployer/DifferencePoint';
import Advantage from '@/components/landingEmployer/Advantage';

export default function LandingEmployer() {
  return (
    <S.LandingEmployer>
      <Announcement />

      <Benefit />

      <DifferencePoint />

      <Advantage />

      {/* <S.Advantage>
        <S.AdvantageItem>
          <div className="image-box">
            <Image src="/images/landing/landing1.png" fill alt="landing" quality={100} />
          </div>
          <div className="description">
            <p className="description__text">✅ 빠른 채용: 효과적인 채용 공고로 즉시 지원자 확보!</p>
            <p className="description__text">✅ 간단한 절차: 누구나 손쉽게 공고 등록 가능!</p>
          </div>
        </S.AdvantageItem>
      </S.Advantage> */}

      <RecruitFlow />
    </S.LandingEmployer>
  );
}

const S = {
  LandingEmployer: styled.div`
    width: 100%;
    height: 100%;
  `,
  Advantage: styled.article`
    padding: 100px 20px;
    min-height: 500px;
    position: relative;
  `,
  AdvantageItem: styled.div`
    display: flex;
    justify-content: center;
    /* border: 1px solid red; */
    .image-box {
      position: relative;
      width: 560px;
      max-height: 380px;
      height: 100%;
      aspect-ratio: 16 / 9;
      /* border: 1px solid red; */
      margin-right: 30px;
      font-size: 0;
      border-radius: 10px;
      background-color: ${(props) => props.theme.colors.gray100};
      overflow: hidden;
      img {
        /* scale: 1.2; */
        /* border: 1px solid red; */
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
    .description {
      /* flex: 1; */
      border: 1px solid red;
    }
  `,
};

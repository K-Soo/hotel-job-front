import styled from 'styled-components';
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

      <RecruitFlow />
    </S.LandingEmployer>
  );
}

const S = {
  LandingEmployer: styled.div`
    width: 100%;
    height: 100%;
  `,
};

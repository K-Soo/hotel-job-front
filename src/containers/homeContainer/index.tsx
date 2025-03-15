import React from 'react';
import Home from '@/components/home';
import RecruitSearch from '@/components/recruit/recruitSearch';
// import LocationSearch from '@/components/recruit/recruitSearch/LocationSearch';
import JobSearch from '@/components/recruit/recruitSearch/JobSearch';
import MainSpecialListContainer from '@/containers/homeContainer/MainSpecialListContainer';
// import PremiumListContainer from '@/containers/homeContainer/PremiumListContainer';
import { ErrorBoundary } from '@/error';

export default function HomeContainer() {
  return (
    <Home>
      <RecruitSearch>
        <JobSearch />
        {/* <LocationSearch /> */}
      </RecruitSearch>

      {/* TODO - 프리미엄 상품 */}
      {/* <ErrorBoundary fallback={null}>
        <PremiumListContainer />
      </ErrorBoundary> */}

      <ErrorBoundary fallback={null}>
        <MainSpecialListContainer />
      </ErrorBoundary>
    </Home>
  );
}

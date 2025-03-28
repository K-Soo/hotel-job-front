import React from 'react';
import Home from '@/components/home';
// import LocationSearch from '@/components/recruit/recruitSearch/LocationSearch';
import MainSpecialListContainer from '@/containers/homeContainer/MainSpecialListContainer';
// import PremiumListContainer from '@/containers/homeContainer/PremiumListContainer';
import MainTopPanel from '@/components/home/MainTopPanel';
import ContentPanel from '@/components/home/ContentPanel';
import { ErrorBoundary } from '@/error';

export default function HomeContainer() {
  return (
    <Home>
      <MainTopPanel />

      <ContentPanel>
        {/* TODO - 프리미엄 상품 */}
        {/* <ErrorBoundary fallback={null}>
        <PremiumListContainer />
        </ErrorBoundary> */}

        <ErrorBoundary fallback={null}>
          <MainSpecialListContainer />
        </ErrorBoundary>
      </ContentPanel>
    </Home>
  );
}

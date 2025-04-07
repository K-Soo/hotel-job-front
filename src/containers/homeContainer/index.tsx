import React from 'react';
import Home from '@/components/home';
// import LocationSearch from '@/components/recruit/recruitSearch/LocationSearch';
// import PremiumListContainer from '@/containers/homeContainer/PremiumListContainer';
import { useInView } from 'react-intersection-observer';

import MainTopPanel from '@/components/home/MainTopPanel';
import ContentPanel from '@/components/home/ContentPanel';
import Sidebar from '@/components/home/Sidebar';
import RecruitSpecialInfiniteContainer from '@/containers/homeContainer/RecruitSpecialInfiniteContainer';
import RecruitSpecialCarouselContainer from '@/containers/homeContainer/RecruitSpecialCarouselContainer';

import RecruitPremiumInfiniteContainer from '@/containers/homeContainer/RecruitPremiumInfiniteContainer';
import RecruitPremiumCarouselContainer from '@/containers/homeContainer/RecruitPremiumCarouselContainer';

import RecruitUrgentListContainer from '@/containers/homeContainer/RecruitUrgentListContainer';

import { ErrorBoundary } from '@/error';
import dynamic from 'next/dynamic';

const RecruitNoSSRBasicPaginateContainer = dynamic(() => import('@/containers/recruitContainer/RecruitBasicPaginateContainer'), {
  ssr: false,
});
const DynamicNoSSRRecruitBasicMobileContainer = dynamic(() => import('@/containers/recruitContainer/RecruitBasicMobileContainer'), {
  ssr: false,
});

export default function HomeContainer() {
  const [active, setActive] = React.useState<string>('premium-recruit');

  const options = {
    threshold: 0.5,
    triggerOnce: false,
  };

  const [premiumRef, premiumInView] = useInView(options);
  const [specialRef, specialInView] = useInView(options);
  const [urgentRef, urgentInView] = useInView(options);
  const [basicRef, basicInView] = useInView(options);

  React.useEffect(() => {
    if (premiumInView) setActive('premium-recruit');
    if (specialInView) setActive('special-recruit');
    if (urgentInView) setActive('urgent-recruit');
    if (basicInView) setActive('basic-recruit');
  }, [premiumInView, specialInView, urgentInView, basicInView]);

  return (
    <Home>
      <Sidebar active={active} />
      <MainTopPanel />

      <ContentPanel>
        {/* 프리미엄 */}
        <article id="premium-recruit" ref={premiumRef}>
          <div className="hidden sm:block">
            <ErrorBoundary fallback={null}>
              <RecruitPremiumInfiniteContainer />
            </ErrorBoundary>
          </div>
          <div className="block sm:hidden">
            <ErrorBoundary fallback={null}>
              <RecruitPremiumCarouselContainer />
            </ErrorBoundary>
          </div>
        </article>

        {/* 스페셜 */}
        <article id="special-recruit" ref={specialRef}>
          <div className="hidden sm:block">
            <ErrorBoundary fallback={null}>
              <RecruitSpecialInfiniteContainer />
            </ErrorBoundary>
          </div>
          <div className="sm:hidden">
            <ErrorBoundary fallback={null}>
              <RecruitSpecialCarouselContainer />
            </ErrorBoundary>
          </div>
        </article>

        {/* 급구 */}
        <article id="urgent-recruit" ref={urgentRef}>
          <ErrorBoundary fallback={null}>
            <RecruitUrgentListContainer />
          </ErrorBoundary>
        </article>

        {/* 기본 */}
        <article id="basic-recruit" ref={basicRef}>
          <div className="hidden sm:block">
            <ErrorBoundary fallback={null}>
              <RecruitNoSSRBasicPaginateContainer />
            </ErrorBoundary>
          </div>

          <div className="sm:hidden">
            <ErrorBoundary fallback={null}>
              <DynamicNoSSRRecruitBasicMobileContainer />
            </ErrorBoundary>
          </div>
        </article>
      </ContentPanel>
    </Home>
  );
}

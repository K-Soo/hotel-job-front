import React from 'react';
import Recruit from '@/components/recruit';
import RecruitFilterPanel from '@/components/recruit/RecruitFilterPanel';
import RecruitSearch from '@/components/recruit/recruitSearch';
import LocationSearch from '@/components/recruit/recruitSearch/LocationSearch';
import JobSearch from '@/components/recruit/recruitSearch/JobSearch';
import RecruitUrgentListContainer from '@/containers/recruitContainer/RecruitUrgentListContainer';
import RecruitSpecialListContainer from '@/containers/recruitContainer/RecruitSpecialListContainer';

import RecruitBasicPcContainer from '@/containers/recruitContainer/RecruitBasicPcContainer';
import RecruitBasicMobileContainer from '@/containers/recruitContainer/RecruitBasicMobileContainer';

import Line from '@/components/common/Line';
import { ErrorBoundary, ErrorComponent } from '@/error';
import useResponsive from '@/hooks/useResponsive';

export default function RecruitContainer() {
  const { isTablet } = useResponsive();

  const handleClickFilterButton = (event: React.MouseEvent<HTMLButtonElement>) => {};

  return (
    <Recruit>
      <RecruitSearch>
        <JobSearch />
        {/* <LocationSearch /> */}
      </RecruitSearch>

      <RecruitFilterPanel handleClickFilterButton={handleClickFilterButton} />

      <Line margin="20px 0" color="#e5e8eb" />

      {/* TODO - ERROR 높이값 */}
      <ErrorBoundary fallback={null}>
        <RecruitSpecialListContainer />
      </ErrorBoundary>

      {/* TODO - ERROR 높이값 */}
      <ErrorBoundary fallback={null}>
        <RecruitUrgentListContainer />
      </ErrorBoundary>

      {/* TODO - ERROR 높이값 */}
      <ErrorBoundary fallback={<ErrorComponent visibleBackButton={false} height="200px" />}>
        {!isTablet && <RecruitBasicPcContainer />}
        {isTablet && <RecruitBasicMobileContainer />}
      </ErrorBoundary>
    </Recruit>
  );
}

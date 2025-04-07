import React from 'react';
import Recruit from '@/components/recruit';
import RecruitFilterPanel from '@/components/recruit/RecruitFilterPanel';
import RecruitSearch from '@/components/recruit/recruitSearch';
import JobSearch from '@/components/recruit/recruitSearch/JobSearch';
import Line from '@/components/common/Line';
import { ErrorBoundary, ErrorComponent } from '@/error';
import useResponsive from '@/hooks/useResponsive';
import RecruitBasicPaginateContainer from '@/containers/recruitContainer/RecruitBasicPaginateContainer';
// import LocationSearch from '@/components/recruit/recruitSearch/LocationSearch';

export default function RecruitContainer() {
  const { isTablet } = useResponsive();

  // TODO - 필터 고도화
  const handleClickFilterButton = (event: React.MouseEvent<HTMLButtonElement>) => {};

  return (
    <Recruit>
      <RecruitSearch>
        <JobSearch />
        {/* TODO - 지도 검색 필터 */}
        {/* <LocationSearch /> */}
      </RecruitSearch>

      <RecruitFilterPanel handleClickFilterButton={handleClickFilterButton} />

      <Line margin="30px 0" color="#e5e8eb" />

      {/* TODO - ERROR 높이값 */}
      <ErrorBoundary fallback={<ErrorComponent visibleBackButton={false} height="200px" />}>
        <RecruitBasicPaginateContainer />
      </ErrorBoundary>
    </Recruit>
  );
}

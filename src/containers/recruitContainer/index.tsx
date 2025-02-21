import React from 'react';
import Recruit from '@/components/recruit';
import RecruitFilterPanel from '@/components/recruit/RecruitFilterPanel';
import RecruitSearch from '@/components/recruit/recruitSearch';
import LocationSearch from '@/components/recruit/recruitSearch/LocationSearch';
import JobSearch from '@/components/recruit/recruitSearch/JobSearch';
import RecruitListContainer from '@/containers/recruitContainer/RecruitListContainer';
import RecruitUrgentListContainer from '@/containers/recruitContainer/RecruitUrgentListContainer';
import RecruitSpecialListContainer from '@/containers/recruitContainer/RecruitSpecialListContainer';
import Line from '@/components/common/Line';
import { ErrorBoundary, ErrorComponent } from '@/error';

export default function RecruitContainer() {
  const handleClickFilterButton = (event: React.MouseEvent<HTMLButtonElement>) => {};

  return (
    <>
      <Recruit>
        <RecruitSearch>
          <JobSearch />
          {/* <LocationSearch /> */}
        </RecruitSearch>

        <RecruitFilterPanel handleClickFilterButton={handleClickFilterButton} />

        <Line margin="20px 0" />

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
          <RecruitListContainer />
        </ErrorBoundary>
      </Recruit>
    </>
  );
}

import React from 'react';
import Recruit from '@/components/recruit';
import RecruitFilterPanel from '@/components/recruit/RecruitFilterPanel';
import RecruitListContainer from '@/containers/recruitContainer/RecruitListContainer';
import RecruitUrgentListContainer from '@/containers/recruitContainer/RecruitUrgentListContainer';
import RecruitSpecialListContainer from '@/containers/recruitContainer/RecruitSpecialListContainer';
import RecruitSearchPanel from '@/components/common/RecruitSearchPanel';
import Line from '@/components/common/Line';
import { ErrorBoundary, ErrorComponent } from '@/error';

export default function RecruitContainer() {
  return (
    <Recruit>
      <RecruitSearchPanel />

      <RecruitFilterPanel />

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
  );
}

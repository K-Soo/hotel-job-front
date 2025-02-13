import React from 'react';
import Home from '@/components/home';
import RecruitSearch from '@/components/recruit/recruitSearch';
import LocationSearch from '@/components/recruit/recruitSearch/LocationSearch';
import JobSearch from '@/components/recruit/recruitSearch/JobSearch';
import MainSpecialListContainer from '@/containers/homeContainer/MainSpecialListContainer';
import MainUrgentListContainer from '@/containers/homeContainer/MainUrgentListContainer';
import { ErrorBoundary, ErrorComponent } from '@/error';

export default function HomeContainer() {
  return (
    <Home>
      <RecruitSearch>
        <JobSearch />
        <LocationSearch />
      </RecruitSearch>

      <ErrorBoundary fallback={null}>
        <MainSpecialListContainer />
      </ErrorBoundary>

      <ErrorBoundary fallback={null}>
        <MainUrgentListContainer />
      </ErrorBoundary>
    </Home>
  );
}

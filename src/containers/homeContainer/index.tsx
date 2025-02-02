import React from 'react';
import Home from '@/components/home';
import RecruitSearch from '@/components/recruit/recruitSearch';
import LocationSearch from '@/components/recruit/recruitSearch/LocationSearch';
import JobSearch from '@/components/recruit/recruitSearch/JobSearch';

export default function HomeContainer() {
  return (
    <Home>
      <RecruitSearch>
        <JobSearch />
        <LocationSearch />
      </RecruitSearch>
    </Home>
  );
}

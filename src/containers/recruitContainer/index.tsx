import React from 'react';
import Recruit from '@/components/recruit';
import RecruitListContainer from '@/containers/recruitContainer/RecruitListContainer';
import RecruitCategory from '@/components/recruit/RecruitCategory';
import SearchForm from '@/components/common/SearchForm';
import PopularKeyword from '@/components/common/PopularKeyword';

export default function RecruitContainer() {
  return (
    <Recruit>
      <SearchForm />
      <PopularKeyword />
      <RecruitCategory />
      <RecruitListContainer />
    </Recruit>
  );
}

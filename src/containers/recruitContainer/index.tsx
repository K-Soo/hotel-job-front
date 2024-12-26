import React from 'react';
import Recruit from '@/components/recruit';
import RecruitSectionTitle from '@/components/recruit/RecruitSectionTitle';
import RecruitFilterButton from '@/components/recruit/RecruitFilterButton';
import RecruitFilterPanel from '@/components/recruit/RecruitFilterPanel';
import RecruitListContainer from '@/containers/recruitContainer/RecruitListContainer';
import RecruitSearchPanel from '@/components/common/RecruitSearchPanel';
import { recruitOrderFilterOptions } from '@/constants/tabs';
import Tabs from '@/components/common/Tabs';
import Line from '@/components/common/Line';

export default function RecruitContainer() {
  return (
    <Recruit>
      <RecruitSearchPanel />

      <RecruitFilterPanel />

      <Line margin="20px 0" />

      <div style={{ display: 'flex', justifyContent: 'flex-end', margin: '0 0 20px 0' }}>
        <Tabs
          tabsOptions={recruitOrderFilterOptions}
          width="200px"
          height="35px"
          fontSize="13px"
          fontColor="gray"
          backgroundColor="#FFFFFF"
        />
      </div>

      <RecruitSectionTitle title="일반 채용" count={0} />
      <RecruitListContainer />
    </Recruit>
  );
}

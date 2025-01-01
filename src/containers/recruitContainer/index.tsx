import React from 'react';
import Recruit from '@/components/recruit';
import RecruitSectionTitle from '@/components/recruit/RecruitSectionTitle';
import RecruitFilterButton from '@/components/recruit/RecruitFilterButton';
import RecruitFilterPanel from '@/components/recruit/RecruitFilterPanel';
import RecruitListContainer from '@/containers/recruitContainer/RecruitListContainer';
import RecruitUrgentListContainer from '@/containers/recruitContainer/RecruitUrgentListContainer';
import RecruitPremiumListContainer from '@/containers/recruitContainer/RecruitPremiumListContainer';
import RecruitSearchPanel from '@/components/common/RecruitSearchPanel';
import { recruitOrderFilterTabOptions } from '@/constants/tabs';
import Tabs from '@/components/common/Tabs';
import Line from '@/components/common/Line';

export default function RecruitContainer() {
  return (
    <Recruit>
      <RecruitSearchPanel />

      <RecruitFilterPanel />

      <Line margin="20px 0" />

      <RecruitSectionTitle title="프리미엄 채용" count={0} />
      <RecruitPremiumListContainer />

      <RecruitSectionTitle title="🔥 급구채용" count={0} />
      <RecruitUrgentListContainer />

      <div style={{ display: 'flex', justifyContent: 'flex-end', margin: '0' }}>
        <Tabs
          tabsOptions={recruitOrderFilterTabOptions}
          width="180px"
          height="35px"
          fontSize="13px"
          fontColor="gray"
          backgroundColor="#FFFFFF"
        />
      </div>

      <RecruitSectionTitle title="일반채용" count={0} />
      <RecruitListContainer />
    </Recruit>
  );
}

import React from 'react';
import Talent from '@/components/talent';
import TalentListContainer from '@/containers/talentContainer/TalentListContainer';
import TalentFilter from '@/components/talent/TalentFilter';

export default function TalentContainer() {
  return (
    <Talent>
      <TalentFilter />
      <TalentListContainer />
    </Talent>
  );
}

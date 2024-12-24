import React from 'react';
import Talent from '@/components/talent';
import TalentListContainer from '@/containers/talentContainer/TalentListContainer';
import TalentFilter from '@/components/talent/TalentFilter';
import Button from '@/components/common/style/Button';

export default function TalentContainer() {
  return (
    <Talent>
      <TalentFilter />
      <TalentListContainer />
    </Talent>
  );
}

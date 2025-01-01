import React from 'react';
import Talent from '@/components/talent';
import TalentListContainer from '@/containers/talentContainer/TalentListContainer';
import Button from '@/components/common/style/Button';

export default function TalentContainer() {
  return (
    <Talent>
      <TalentListContainer />
    </Talent>
  );
}

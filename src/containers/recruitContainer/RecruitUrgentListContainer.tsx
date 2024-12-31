import React from 'react';
import RecruitUrgentCard from '@/components/recruit/RecruitUrgentCard';
import RecruitUrgentList from '@/components/recruit/RecruitUrgentList';

export default function RecruitUrgentListContainer() {
  const recruitArray = Array.from({ length: 10 });

  return (
    <RecruitUrgentList>
      {recruitArray.map((el, index) => {
        return <RecruitUrgentCard />;
      })}
    </RecruitUrgentList>
  );
}

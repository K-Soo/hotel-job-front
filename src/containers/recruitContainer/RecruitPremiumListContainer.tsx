import React from 'react';
import useResponsive from '@/hooks/useResponsive';
import RecruitPremiumList from '@/components/recruit/RecruitPremiumList';
import RecruitPremiumCard from '@/components/recruit/RecruitPremiumCard';

export default function RecruitPremiumListContainer() {
  const recruitArray = Array.from({ length: 9 });
  const { isTablet } = useResponsive();

  return (
    <RecruitPremiumList>
      {recruitArray.map((el, index) => {
        return <RecruitPremiumCard key={index} />;
      })}
    </RecruitPremiumList>
  );
}

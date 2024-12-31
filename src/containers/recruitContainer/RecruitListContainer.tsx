import React from 'react';
import RecruitDesktopCard from '@/components/recruit/RecruitDesktopCard';
import RecruitMobileCard from '@/components/recruit/RecruitMobileCard';
import useResponsive from '@/hooks/useResponsive';

export default function RecruitListContainer() {
  const recruitArray = Array.from({ length: 10 });
  const { isTablet } = useResponsive();

  return (
    <>
      {recruitArray.map((el, index) => {
        if (isTablet) {
          return <RecruitMobileCard />;
        }
        return <RecruitDesktopCard recruitType="NORMAL" />;
      })}
    </>
  );
}

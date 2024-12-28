import React from 'react';
import styled from 'styled-components';
import RecruitDesktopCard from '@/components/recruit/RecruitDesktopCard';
import RecruitMobileCard from '@/components/recruit/RecruitMobileCard';
import { motion } from 'framer-motion';
import useResponsive from '@/hooks/useResponsive';

interface RecruitListProps {}

export default function RecruitList({}: RecruitListProps) {
  const recruitArray = Array.from({ length: 5 });
  const scrollRef = React.useRef(null);
  const { isTablet } = useResponsive();

  return (
    <S.RecruitList ref={scrollRef}>
      {recruitArray.map((_, index) => (
        <motion.div key={index} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ root: scrollRef, once: true }}>
          {isTablet ? <RecruitMobileCard /> : <RecruitDesktopCard />}
        </motion.div>
      ))}
    </S.RecruitList>
  );
}

const S = {
  RecruitList: styled.div``,
};

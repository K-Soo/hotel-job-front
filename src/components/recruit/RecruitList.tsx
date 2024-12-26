import React from 'react';
import styled from 'styled-components';
import RecruitCard from '@/components/recruit/RecruitCard';
import { motion } from 'framer-motion';

interface RecruitListProps {}

export default function RecruitList({}: RecruitListProps) {
  const recruitArray = Array.from({ length: 100 });
  const scrollRef = React.useRef(null);

  return (
    <S.RecruitList ref={scrollRef}>
      {recruitArray.map((_, index) => (
        <motion.div key={index} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ root: scrollRef, once: true }}>
          <RecruitCard />
        </motion.div>
      ))}
    </S.RecruitList>
  );
}

const S = {
  RecruitList: styled.div``,
};

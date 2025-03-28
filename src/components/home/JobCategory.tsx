import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { allJobsKeyValuesKeys, hotelJobKeyValues, otherJobsKeyValues } from '@/constants/job';
import { useRouter } from 'next/router';
import path from '@/constants/path';

const variants = {
  initial: { backgroundColor: 'white' },
  hover: { backgroundColor: '#f9fafb' },
};

const JOB_CATEGORY_LIST = [
  { label: '당번', icon: '🛎️', value: hotelJobKeyValues.DUTY_OFFICER },
  { label: '캐셔', icon: '👩‍💼', value: hotelJobKeyValues.CASHIER },
  { label: '베팅', icon: '🛏️', value: hotelJobKeyValues.BEDDING },
  { label: '룸메이드', icon: '🧺', value: hotelJobKeyValues.CLEANING },
  { label: '부부팀', icon: '👫', value: hotelJobKeyValues.CLEANING_TEAM },
  { label: '지배인', icon: '💼', value: hotelJobKeyValues.MANAGER },
  { label: '시설관리', icon: '🪜', value: otherJobsKeyValues.MAINTENANCE },
  { label: '주방', icon: '👨‍🍳', value: hotelJobKeyValues.CHEF },
];

export default React.memo(function JobCategory() {
  const router = useRouter();

  const handleClickCategory = (job: string) => {
    router.push(`${path.RECRUIT}?job=${job.toLocaleLowerCase()}`);
  };

  return (
    <article className="max-w-full shrink-1 basis-[290px] rounded-[20px] bg-white p-[20px] shadow-md lg:basis-[340px] lg:p-[30px]">
      <h2 className="mb-3 text-[18px] font-semibold md:mb-4 md:text-[20px] lg:text-[22px]">직업별</h2>

      <div className="flex flex-wrap gap-[5px]">
        {JOB_CATEGORY_LIST.map((category) => (
          <S.CategoryItem
            key={category.value}
            variants={variants}
            initial="initial"
            whileHover="hover"
            onClick={() => handleClickCategory(category.value)}
          >
            <i className="icon-wrapper">{category.icon}</i>
            <span className="text">{category.label}</span>
          </S.CategoryItem>
        ))}
      </div>
    </article>
  );
});

const S = {
  CategoryItem: styled(motion.div)`
    flex-basis: calc(25% - 5px);
    display: flex;
    flex-direction: column;
    align-items: center;
    cursor: pointer;
    border-radius: 10px;
    padding: 6px 0;
    .icon-wrapper {
      border-radius: 50%;
      width: 40px;
      height: 40px;
      background-color: ${(props) => props.theme.colors.gray100};
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 22px;
    }
    .text {
      padding-top: 8px;
      font-size: 13px;
      color: ${(props) => props.theme.colors.gray900};
      ${(props) => props.theme.media.laptop``};
    }
  `,
};

import React from 'react';
import styled, { css } from 'styled-components';
import Icon from '@/icons/Icon';
import { motion } from 'framer-motion';
import CircleCheckbox from '@/components/common/style/CircleCheckbox';
import IconDimmed from '@/components/common/IconDimmed';
import { useRouter } from 'next/router';
import useToast from '@/hooks/useToast';
import { ParsedUrlQuery } from 'querystring';
import { HOTEL_JOBS, TOURIST_HOTEL_JOBS, OTHER_JOBS, allJobsKeyValues, AllJobsKeyValuesKeys, ALL_JOBS } from '@/constants/job';

interface JobContentFormProps {
  tabIndex: number;
  selectedJob: AllJobsKeyValuesKeys[];
  businessType: [string, string][];
  handleCloseJobModal: () => void;
  handleClickBusiness: (value: string) => void;
  handleClickJobItem: (value: string) => void;
  setSelectedJob: React.Dispatch<React.SetStateAction<AllJobsKeyValuesKeys[]>>;
}

const BUSINESS_DATA = [
  { label: '전체', value: 'all' },
  { label: '호텔', value: 'hotel' },
  { label: '관광호텔', value: 'touristHotel' },
  { label: '기타', value: 'other' },
];

export default function JobContentForm({
  tabIndex,
  businessType,
  handleClickBusiness,
  handleClickJobItem,
  selectedJob,
}: JobContentFormProps) {
  console.log('businessType: ', businessType);
  const [jobCounts, setJobCounts] = React.useState({
    hotel: 0,
    touristHotel: 0,
    other: 0,
  });

  React.useEffect(() => {
    setJobCounts({
      hotel: selectedJob.filter((job) => Object.keys(HOTEL_JOBS).includes(job)).length,
      touristHotel: selectedJob.filter((job) => Object.keys(TOURIST_HOTEL_JOBS).includes(job)).length,
      other: selectedJob.filter((job) => Object.keys(OTHER_JOBS).includes(job)).length,
    });
  }, [selectedJob]);

  return (
    <S.JobContentForm>
      <S.Tab>
        {BUSINESS_DATA.map((item, index) => (
          <motion.div
            className="item"
            key={item.value}
            onClick={() => handleClickBusiness(item.value)}
            initial={{ color: '#b0b8c1' }}
            animate={tabIndex === index ? { color: '#444444' } : { color: '#b0b8c1' }}
          >
            <motion.h6 whileTap={{ scale: 0.99 }}>{item.label}</motion.h6>
            {index !== 0 && jobCounts[item.value as keyof typeof jobCounts] !== 0 && (
              <StyledCountText className="item__count" $active={jobCounts[item.value as keyof typeof jobCounts] !== 0}>
                {`${jobCounts[item.value as keyof typeof jobCounts]}`}
              </StyledCountText>
            )}

            {tabIndex === index && <span className="item__underline" />}
          </motion.div>
        ))}
      </S.Tab>
      <S.JobList>
        {businessType.length === 0 && (
          <StyledEmpty>
            업종을 선택해서 <br />
            직무를 확인할 수 있습니다.
          </StyledEmpty>
        )}
        {businessType.map(([key, value]) => (
          <motion.div
            className="item"
            key={value}
            whileTap={{ scale: 0.99 }}
            onClick={() => handleClickJobItem(key)}
            initial={{ backgroundColor: '#ffffff', color: '#444444' }}
            whileHover={{
              backgroundColor: '#f2f4f6',
              color: '#000000',
            }}
          >
            <h6>{value}</h6>
            <CircleCheckbox
              checked={selectedJob.includes(key as AllJobsKeyValuesKeys)}
              name={key}
              onChange={() => {}}
              value={key}
              style={{ pointerEvents: 'none' }}
              margin="0 0 0 8px"
            />
          </motion.div>
        ))}
      </S.JobList>
    </S.JobContentForm>
  );
}
const StyledCountText = styled.span<{ $active: boolean }>`
  margin-left: 3px;
  width: 14px;
  text-align: center;
  ${(props) =>
    props.$active &&
    css`
      color: ${(props) => props.theme.colors.blue400};
    `};
`;

const StyledEmpty = styled.p`
  padding-top: 80px;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 1.4;
  color: ${(props) => props.theme.colors.gray600};
`;

const S = {
  JobContentForm: styled.div``,
  Tab: styled.div`
    display: flex;
    align-items: center;
    height: 50px;
    margin-bottom: 15px;
    border-bottom: 1px solid ${(props) => props.theme.colors.gray400};
    .item {
      width: 80px;
      margin: 0 5px;
      position: relative;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      color: ${(props) => props.theme.colors.gray400};
      ${(props) => props.theme.media.mobile`
        width: 80px;
      `};
      &__underline {
        position: absolute;
        bottom: -1px;
        left: 0;
        width: 100%;
        border-bottom: 2px solid #444444;
      }
    }
  `,
  JobList: styled.div`
    display: flex;
    flex-wrap: wrap;
    padding: 0 15px;
    .item {
      flex-basis: 50%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 50px;
      padding: 0 15px;
      border-radius: 5px;
      cursor: pointer;
      ${(props) => props.theme.media.mobile`
        font-size: 14px;
      `};
    }
  `,
};

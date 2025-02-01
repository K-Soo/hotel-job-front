import React from 'react';
import styled from 'styled-components';
import Icon from '@/icons/Icon';
import { motion } from 'framer-motion';
import JobModalForm from '@/components/recruit/recruitSearch/JobModalForm';
import { ParsedUrlQuery } from 'querystring';
import { allJobsKeyValues, AllJobsKeyValuesKeys, ALL_JOBS } from '@/constants/job';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import useResponsive from '@/hooks/useResponsive';
import Modal from '@/components/common/modal';
import useModal from '@/hooks/useModal';
import Button from '@/components/common/style/Button';

const DynamicJobModalForm = dynamic(() => import('@/components/recruit/recruitSearch/JobModalForm'), { ssr: false });

interface Query extends ParsedUrlQuery {
  job?: AllJobsKeyValuesKeys | AllJobsKeyValuesKeys[];
}

interface JobSearchProps {}

const getJobObject = (job: string | string[] | undefined): Record<AllJobsKeyValuesKeys, string> => {
  if (!job) return {} as Record<AllJobsKeyValuesKeys, string>;

  const jobsArray = Array.isArray(job) ? job.map((item) => item.toLocaleUpperCase()) : [job.toLocaleUpperCase()];

  const jobObject = jobsArray.reduce((acc, key) => {
    const value = ALL_JOBS[key as AllJobsKeyValuesKeys];
    if (value) {
      acc[key as AllJobsKeyValuesKeys] = value;
    }
    return acc;
  }, {} as Record<AllJobsKeyValuesKeys, string>);

  return jobObject;
};

const getJobArray = (job: string | string[] | undefined): AllJobsKeyValuesKeys[] => {
  if (!job) return [];

  const jobsArray = Array.isArray(job) ? job.map((item) => item.toLocaleUpperCase()) : [job.toLocaleUpperCase()];

  const data = jobsArray.filter((j): j is AllJobsKeyValuesKeys => Object.values(allJobsKeyValues).includes(j as AllJobsKeyValuesKeys));

  const translatedJobs = jobsArray
    .map((key) => ALL_JOBS[key as AllJobsKeyValuesKeys]) // `key`가 `ALL_JOBS`에 있는 경우 value 반환
    .filter(Boolean); // undefined 제거

  console.log('매핑된 한글 job 리스트:', translatedJobs);

  return data;
};

export default function JobSearch({}: JobSearchProps) {
  const [isOpenJobModal, setIsOpenJobModal] = React.useState(false);

  const router = useRouter();
  const { job } = router.query as Query;

  const selectedJobs = getJobArray(job);
  const jobObj = getJobObject(job);
  const { modalAtomState, setModalAtomState } = useModal();

  const { isTablet } = useResponsive();

  const handleCloseJobModal = () => setIsOpenJobModal(false);

  return (
    <S.JobSearch>
      <S.JobSearchButton>
        <motion.div className="wrapper" onClick={() => setIsOpenJobModal((prev) => !prev)}>
          <motion.div whileTap={{ scale: 0.99 }} whileHover={{ color: '#000000' }}>
            {Object.values(jobObj).length > 0 ? (
              <div>
                <span>{Object.values(jobObj)[0]}</span>
                {Object.values(jobObj).length > 1 && <span>&nbsp;외&nbsp;{Object.values(jobObj).length - 1}</span>}
              </div>
            ) : (
              <span>업종 · 직무</span>
            )}
          </motion.div>
          <S.ArrowBottomIcon>
            <Icon name="ArrowRight16x16" width="16px" height="16px" />
          </S.ArrowBottomIcon>
        </motion.div>

        {!isTablet && isOpenJobModal && <DynamicJobModalForm handleCloseJobModal={handleCloseJobModal} />}
      </S.JobSearchButton>
    </S.JobSearch>
  );
}

const S = {
  JobSearch: styled.div``,
  JobSearchButton: styled(motion.div)`
    position: relative;
    .wrapper {
      display: flex;
      align-items: center;
      cursor: pointer;
      font-weight: 600;
      font-size: 26px;
      ${(props) => props.theme.media.mobile`
      font-size: 18px;
    `};
    }
  `,
  ArrowBottomIcon: styled.i`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 8px;
    background-color: #ffffff;
    width: 30px;
    height: 30px;
    border: 1px solid ${({ theme }) => theme.colors.gray200};
    margin-left: 8px;
    font-size: 0;
    cursor: pointer;
    svg {
      padding-left: 1px;
      transform: rotate(90deg);
    }
  `,
};

import React from 'react';
import styled from 'styled-components';
import Icon from '@/icons/Icon';
import { motion } from 'framer-motion';
import JobContentForm from '@/components/recruit/recruitSearch/JobContentForm';
import { ParsedUrlQuery } from 'querystring';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import useResponsive from '@/hooks/useResponsive';
import Modal from '@/components/common/modal';
import Button from '@/components/common/style/Button';
import { HOTEL_JOBS, OTHER_JOBS, AllJobsKeyValuesKeys, ALL_JOBS } from '@/constants/job';
import useToast from '@/hooks/useToast';
import path from '@/constants/path';

const DynamicJobModalForm = dynamic(() => import('@/components/recruit/recruitSearch/JobModalForm'), { ssr: false });
const DynamicNoSSRModal = dynamic(() => import('@/components/common/modal'), { ssr: false });
interface Query extends ParsedUrlQuery {
  job?: AllJobsKeyValuesKeys | AllJobsKeyValuesKeys[];
}

const getJobObject = (job: string | string[] | undefined): Record<AllJobsKeyValuesKeys, string> => {
  if (!job) return {} as Record<AllJobsKeyValuesKeys, string>;

  const jobsArray = Array.isArray(job) ? job.map((item) => item.toUpperCase()) : [job.toUpperCase()];

  const jobObject = jobsArray.reduce(
    (acc, key) => {
      const value = ALL_JOBS[key as AllJobsKeyValuesKeys];
      if (value) {
        acc[key as AllJobsKeyValuesKeys] = value;
      }
      return acc;
    },
    {} as Record<AllJobsKeyValuesKeys, string>,
  );

  return jobObject;
};

export default function JobSearch() {
  const [isOpenModal, setIsOpenModal] = React.useState(false);
  const [isOpenJobModal, setIsOpenJobModal] = React.useState(false);
  const [selectedJob, setSelectedJob] = React.useState<AllJobsKeyValuesKeys[]>([]);
  const [businessType, setBusinessType] = React.useState<[string, string][]>(Object.entries(HOTEL_JOBS));
  const [tabIndex, setTabIndex] = React.useState(1);

  const { isTablet, isMobile } = useResponsive();
  const { addToast } = useToast();

  const router = useRouter();
  const { job } = router.query as Query;

  React.useEffect(() => {
    if (!job) return;

    const jobsArray = Array.isArray(job) ? job.map((item) => item.toUpperCase()) : [job.toUpperCase()];
    setSelectedJob(jobsArray as AllJobsKeyValuesKeys[]);
  }, [job]);

  const jobObj = getJobObject(job);

  const handleCloseJobModal = () => setIsOpenJobModal(false);

  const handleClickBusiness = (value: string) => {
    if (value === 'all') {
      setTabIndex(0);
      setSelectedJob([]);
      setBusinessType([]);
    }
    if (value === 'hotel') {
      setTabIndex(1);
      setBusinessType(Object.entries(HOTEL_JOBS));
    }
    if (value === 'other') {
      setTabIndex(3);
      setBusinessType(Object.entries(OTHER_JOBS));
    }
  };

  const handleClickJobItem = (value: string) => {
    const existJob = selectedJob.find((item) => item === (value as AllJobsKeyValuesKeys));

    if (existJob) {
      setSelectedJob((prev) => prev.filter((item) => item !== value));
    }

    if (!existJob) {
      if (selectedJob.length >= 3) {
        return addToast({ message: '최대 3개까지 선택가능합니다.', type: 'info' });
      }
      setSelectedJob((prev) => [...prev, value as AllJobsKeyValuesKeys]);
    }
  };

  const handleApplyJobs = () => {
    if (selectedJob.length === 0) {
      const params = new URLSearchParams();

      params.delete('job');
      router.replace(
        {
          pathname: path.RECRUIT,
          query: { ...router.query, job: [] },
        },
        undefined,
        { shallow: true },
      );

      handleCloseJobModal();
      return;
    }

    const params = new URLSearchParams();
    selectedJob.forEach((job) => params.append('job', job.toLocaleLowerCase()));

    router.replace(
      {
        pathname: path.RECRUIT,
        query: {
          ...router.query,
          job: params.getAll('job'), // 배열 형태 유지
        },
      },
      undefined,
      { shallow: true },
    );

    handleCloseJobModal();
  };

  return (
    <S.JobSearch>
      <S.JobSearchButton
        onClick={() => {
          setIsOpenJobModal((prev) => !prev);
          if (isTablet) {
            setIsOpenModal(true);
          }
        }}
      >
        <motion.div className="wrapper">
          <motion.div whileTap={{ scale: 0.99 }} whileHover={{ color: '#000000' }}>
            {isMobile && <Icon name="Search24x24" width="24px" height="24px" margin="0 10px 0 0" />}
            {Object.values(jobObj).length > 0 ? (
              <div>
                <span>{Object.values(jobObj)[0]}</span>
                {Object.values(jobObj).length > 1 && <span>&nbsp;외&nbsp;{Object.values(jobObj).length - 1}</span>}
              </div>
            ) : (
              <span className="placeholder">업종 · 직무</span>
            )}
          </motion.div>

          <S.ArrowBottomIcon>
            <Icon name="ArrowRight16x16" width="16px" height="16px" />
          </S.ArrowBottomIcon>
        </motion.div>
      </S.JobSearchButton>

      {/* PC 모달 */}
      {!isTablet && isOpenJobModal && (
        <DynamicJobModalForm
          tabIndex={tabIndex}
          handleCloseJobModal={handleCloseJobModal}
          setSelectedJob={setSelectedJob}
          selectedJob={selectedJob}
          businessType={businessType}
          handleClickBusiness={handleClickBusiness}
          handleClickJobItem={handleClickJobItem}
        >
          <Button label="초기화" variant="tertiary" height="40px" width="100px" margin="0 15px 0 0" onClick={() => setSelectedJob([])} />
          <Button label="적용" variant="primary" height="40px" width="215px" type="button" onClick={handleApplyJobs} />
        </DynamicJobModalForm>
      )}

      {/* MOBILE 모달 */}
      {isTablet && isOpenModal && (
        <DynamicNoSSRModal handleCloseModal={() => setIsOpenModal(false)}>
          <Modal.Header title="업종 · 직무" handleCloseModal={() => setIsOpenModal(false)} />
          <Modal.Content padding="0">
            <JobContentForm
              tabIndex={tabIndex}
              handleCloseJobModal={handleCloseJobModal}
              setSelectedJob={setSelectedJob}
              selectedJob={selectedJob}
              businessType={businessType}
              handleClickBusiness={handleClickBusiness}
              handleClickJobItem={handleClickJobItem}
            />
          </Modal.Content>
          <Modal.Footer>
            <Button label="초기화" variant="tertiary" height="40px" margin="0 15px 0 0" onClick={() => setSelectedJob([])} />
            <Button
              label="적용"
              variant="primary"
              height="40px"
              type="button"
              onClick={() => {
                handleApplyJobs();
                setIsOpenModal(false);
              }}
            />
          </Modal.Footer>
        </DynamicNoSSRModal>
      )}
    </S.JobSearch>
  );
}

const S = {
  JobSearch: styled.div`
    position: relative;
    width: 100%;
    ${(props) => props.theme.media.mobile`
      border-radius: 8px;
      padding-left: 15px;
      height: 50px;
      border: 1px solid ${props.theme.colors.gray500};
      background-color: white;
    `};

    /* TODO - 지역검색 이후 */
    /* ${(props) => props.theme.media.mobile`
      border-top-left-radius: 8px;
      border-top-right-radius: 8px;
      padding-left: 15px;
      height: 50px;
      border-top: 1px solid ${props.theme.colors.gray500};
      border-left: 1px solid ${props.theme.colors.gray500};
      border-right: 1px solid ${props.theme.colors.gray500};
    `}; */
  `,
  JobSearchButton: styled(motion.div)`
    height: 100%;
    border-radius: inherit;
    .wrapper {
      height: 100%;
      display: flex;
      flex-wrap: nowrap;
      align-items: center;
      cursor: pointer;
      font-weight: 600;
      font-size: 26px;
      ${(props) => props.theme.media.mobile`
        font-weight: 400;
        font-size: 16px;
      `};
      & > div {
        display: flex;
        align-items: center;
        height: 100%;
      }
      .placeholder {
        ${(props) => props.theme.media.mobile`
          color: ${props.theme.colors.gray600};
        `};
      }
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
    ${(props) => props.theme.media.mobile`
      display: none;
    `};
  `,
};

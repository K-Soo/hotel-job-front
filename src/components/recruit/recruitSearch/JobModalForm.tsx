import React from 'react';
import styled, { css } from 'styled-components';
import Button from '@/components/common/style/Button';
import { HOTEL_JOBS, TOURIST_HOTEL_JOBS, OTHER_JOBS, allJobsKeyValues, AllJobsKeyValuesKeys } from '@/constants/job';
import Icon from '@/icons/Icon';
import { motion } from 'framer-motion';
import CircleCheckbox from '@/components/common/style/CircleCheckbox';
import IconDimmed from '@/components/common/IconDimmed';
import { useRouter } from 'next/router';
import useToast from '@/hooks/useToast';
import { ParsedUrlQuery } from 'querystring';

const getJobArray = (job: string | string[] | undefined): AllJobsKeyValuesKeys[] => {
  if (!job) return [];

  const jobsArray = Array.isArray(job) ? job.map((item) => item.toLocaleUpperCase()) : [job.toLocaleUpperCase()];

  return jobsArray.filter((j): j is AllJobsKeyValuesKeys => Object.values(allJobsKeyValues).includes(j as AllJobsKeyValuesKeys));
};

interface JobModalFormProps {
  handleCloseJobModal: () => void;
}

const BUSINESS_DATA = [
  { label: '업종 전체', value: 'all' },
  { label: '호텔', value: 'hotel' },
  { label: '관광호텔', value: 'touristHotel' },
  { label: '기타', value: 'other' },
];

interface Query extends ParsedUrlQuery {
  job?: string | string[];
}

export default function JobModalForm({ handleCloseJobModal }: JobModalFormProps) {
  const [businessType, setBusinessType] = React.useState<[string, string][]>([]);
  const [selectedJob, setSelectedJob] = React.useState<AllJobsKeyValuesKeys[]>([]);

  const router = useRouter();
  console.log('router: ', router.query);

  const { job } = router.query as Query;

  const modalRef = React.useRef<HTMLDivElement>(null);

  const { addToast } = useToast();

  React.useEffect(() => {
    const selectedJobs = getJobArray(job);

    if (selectedJobs.length > 0) {
      setSelectedJob(selectedJobs);
    }
  }, []);

  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (modalRef.current && !modalRef.current.contains(event.target as Node) && !(event.target as HTMLElement).closest('.wrapper')) {
        handleCloseJobModal();
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [handleCloseJobModal]);

  const handleClickBusiness = (value: string) => {
    if (value === 'all') {
      return;
    }
    if (value === 'hotel') return setBusinessType(Object.entries(HOTEL_JOBS));
    if (value === 'touristHotel') return setBusinessType(Object.entries(TOURIST_HOTEL_JOBS));
    if (value === 'other') return setBusinessType(Object.entries(OTHER_JOBS));
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
      const params = new URLSearchParams(router.query as any);

      params.delete('job');
      router.replace(
        {
          pathname: router.pathname,
          query: params.toString(),
        },
        undefined,
        { shallow: true },
      );

      handleCloseJobModal();
      return;
    }

    const params = new URLSearchParams(router.query as any);
    console.log('params: ', params.toString());

    params.delete('job');
    selectedJob.forEach((job) => params.append('job', job.toLocaleLowerCase()));
    console.log('Object.fromEntries(params): ', Object.fromEntries(params));

    router.replace(
      {
        pathname: router.pathname,
        query: params.toString(),
      },
      undefined,
      { shallow: true },
    );

    handleCloseJobModal();
  };

  const handleInitializeJobs = () => {
    setSelectedJob([]);
  };

  return (
    <S.JobModalForm ref={modalRef}>
      <S.Header>
        <h5>업종 · 직무</h5>
        <IconDimmed width="36px" height="36px" onClick={handleCloseJobModal}>
          <Icon name="CloseA24x24" width="24px" height="24px" />
        </IconDimmed>
      </S.Header>
      <S.Content>
        <div className="business">
          {BUSINESS_DATA.map((item) => (
            <motion.div
              className="business__item"
              key={item.value}
              initial={{ backgroundColor: '#ffffff', color: '#444444' }}
              whileHover={{
                backgroundColor: '#f2f4f6',
                color: '#000000',
              }}
              onClick={() => handleClickBusiness(item.value)}
            >
              <h6>{item.label}</h6>
              {item.value !== 'all' && <Icon name="ArrowRight16x16" width="16px" height="16px" />}
            </motion.div>
          ))}
        </div>
        <div className="job">
          {businessType.map(([key, value]) => (
            <motion.div
              className="job__item"
              key={value}
              initial={{ backgroundColor: '#ffffff', color: '#444444' }}
              whileHover={{
                backgroundColor: '#f2f4f6',
                color: '#000000',
              }}
              onClick={() => handleClickJobItem(key)}
            >
              <h6>{value}</h6>
              <CircleCheckbox
                checked={selectedJob.includes(key as AllJobsKeyValuesKeys)}
                name={key}
                onChange={() => {}}
                value={key}
                style={{ pointerEvents: 'none' }}
              />
            </motion.div>
          ))}
        </div>
      </S.Content>
      <S.Bottom>
        <StyledCountText active={selectedJob.length !== 0}>선택 {selectedJob.length}</StyledCountText>
        <div className="wrapper">
          <Button label="초기화" variant="tertiary" height="40px" width="100px" margin="0 15px 0 0" onClick={handleInitializeJobs} />
          <Button label="적용" variant="primary" height="40px" width="215px" type="button" onClick={handleApplyJobs} />
        </div>
      </S.Bottom>
    </S.JobModalForm>
  );
}

const StyledCountText = styled.span<{ active: boolean }>`
  font-size: 15px;
  color: ${({ theme }) => theme.colors.gray500};
  ${(props) =>
    props.active &&
    css`
      color: ${({ theme }) => theme.colors.blue500};
    `};
`;

const S = {
  JobModalForm: styled.div`
    position: absolute;
    top: 50px;
    width: 600px;
    height: 500px;
    background-color: #ffffff;
    z-index: 5;
    box-shadow: 0 4px 30px 10px rgba(0, 0, 0, 0.06);
    border-radius: 15px;
    display: flex;
    flex-direction: column;
  `,
  Header: styled.div`
    display: flex;
    align-items: center;
    height: 60px;
    justify-content: space-between;
    padding: 0 20px;
    font-size: 20px;
    font-weight: 500;
  `,
  Content: styled.div`
    flex: 1;
    display: flex;
    justify-content: space-between;
    overflow: hidden;
    font-size: 16px;
    font-weight: 400;
    .business {
      flex-basis: 250px;
      border-right: 1px solid ${({ theme }) => theme.colors.gray200};
      &__item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 45px;
        margin: 5px;
        padding: 0 15px;
        border-radius: 8px;
        cursor: pointer;
        svg {
          color: gray;
        }
      }
    }
    .job {
      flex-grow: 1;
      overflow-y: auto;
      &__item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 45px;
        margin: 5px;
        padding: 0 15px;
        border-radius: 8px;
        cursor: pointer;
      }
    }
  `,
  Bottom: styled.div`
    border-top: 1px solid ${({ theme }) => theme.colors.gray200};
    height: 60px;
    padding: 0 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .wrapper {
      display: flex;
      align-items: center;
    }
  `,
};

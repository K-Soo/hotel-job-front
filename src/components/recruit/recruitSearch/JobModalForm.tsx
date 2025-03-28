import React from 'react';
import styled, { css } from 'styled-components';
import { AllJobsKeyValuesKeys } from '@/constants/job';
import Icon from '@/icons/Icon';
import { motion } from 'framer-motion';
import CircleCheckbox from '@/components/common/style/CircleCheckbox';
import IconDimmed from '@/components/common/IconDimmed';
import { ParsedUrlQuery } from 'querystring';

interface JobModalFormProps {
  tabIndex: number;
  selectedJob: AllJobsKeyValuesKeys[];
  businessType: [string, string][];
  handleCloseJobModal: () => void;
  handleClickBusiness: (value: string) => void;
  handleClickJobItem: (value: string) => void;
  setSelectedJob: React.Dispatch<React.SetStateAction<AllJobsKeyValuesKeys[]>>;
  children: React.ReactNode;
}

const BUSINESS_DATA = [
  { label: '전체', value: 'all' },
  { label: '호텔', value: 'hotel' },
  { label: '관광호텔', value: 'touristHotel' },
  { label: '기타', value: 'other' },
];

export default function JobModalForm({
  tabIndex,
  handleCloseJobModal,
  selectedJob,
  businessType,
  handleClickBusiness,
  handleClickJobItem,
  children,
}: JobModalFormProps) {
  const modalRef = React.useRef<HTMLDivElement>(null);

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
          {BUSINESS_DATA.map((item, index) => (
            <motion.div
              className="business__item"
              key={item.value}
              initial={{ backgroundColor: '#ffffff', color: '#444444' }}
              whileHover={{
                backgroundColor: '#f2f4f6',
                color: '#000000',
              }}
              animate={tabIndex === index ? { color: '#222222', backgroundColor: '#f2f4f6' } : { color: '#555555' }}
              onClick={() => handleClickBusiness(item.value)}
            >
              <h6>{item.label}</h6>
              {item.value !== 'all' && <Icon name="ArrowRight16x16" width="16px" height="16px" />}
            </motion.div>
          ))}
        </div>

        <div className="job">
          {businessType.length === 0 && (
            <StyledEmpty>
              업종을 선택해서 <br />
              직무를 확인할 수 있습니다.
            </StyledEmpty>
          )}
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
        <div className="wrapper">{children}</div>
      </S.Bottom>
    </S.JobModalForm>
  );
}

const StyledEmpty = styled.p`
  padding-top: 80px;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  line-height: 1.4;
  color: ${(props) => props.theme.colors.gray600};
`;

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

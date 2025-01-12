import React from 'react';
import styled from 'styled-components';
import Portal from '@/components/common/Portal';
import Background from '@/components/common/Background';
import Button from '@/components/common/style/Button';
import {
  allJobs,
  hotelJobs,
  touristHotelJobs,
  otherJobs,
  hotelJobKeyValues,
  touristHotelJobsKeyValues,
  otherJobsKeyValues,
  allJobsKeyValues,
  AllJobsKeyValuesKeys,
} from '@/constants/job';
import ChipsCheckbox from '@/components/common/style/ChipsCheckbox';
import { FieldValues, useFormContext } from 'react-hook-form';
import { motion } from 'framer-motion';
import useToast from '@/hooks/useToast';

const jobModalTabOptions = [
  { label: '전체', value: 'all' },
  { label: '호텔', value: 'hotel' },
  { label: '관광호텔', value: 'touristHotel' },
  { label: '기타', value: 'other' },
];

export interface JobModalProps {
  name: string;
  setIsOpenJobModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function JobModal<T extends FieldValues>({ name, setIsOpenJobModal }: JobModalProps) {
  const [selectedJob, setSelectedJob] = React.useState<AllJobsKeyValuesKeys[]>([]);
  const [tab, setTab] = React.useState('all');

  const { addToast } = useToast();

  const { watch, setValue } = useFormContext();

  const watchValue = watch(name) || [];

  React.useEffect(() => {
    setSelectedJob(watchValue);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChangeCheckbox = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { checked, value } = event.target;

    if (checked) {
      if (selectedJob.length >= 3) {
        return addToast({ message: '직무는 최대 3개까지 선택 가능합니다.', type: 'warning' });
      }

      return setSelectedJob((prev) => [...prev, value as AllJobsKeyValuesKeys]);
    }
    setSelectedJob((prev) => prev.filter((item) => item !== value));
  };

  const handleSaveSelectedJobs = () => {
    setValue(name, [...selectedJob]);
    setIsOpenJobModal(false);
  };

  return (
    <Portal>
      <Background>
        <S.JobModal>
          <S.Title>
            <h2>직무 선택</h2>
          </S.Title>
          {/* <S.Search>
            <Icon className="search-icon" name="Search24x24" width="24px" height="24px" />
            <input className="search-filed" type="text" placeholder="Search" maxLength={20} />
          </S.Search> */}

          <S.Category>
            {jobModalTabOptions.map((option) => (
              <motion.button
                key={option.value}
                type="button"
                className="item"
                name={option.value}
                onClick={() => setTab(option.value)}
                animate={{ color: tab === option.value ? '#000' : '#666' }}
                whileHover={{ color: '#000' }}
              >
                <span>{option.label}</span>
                {tab === option.value && <span className="underline" />}
              </motion.button>
            ))}
          </S.Category>

          <S.Content>
            {tab === 'all' &&
              Object.entries(allJobsKeyValues).map(([key, value]) => (
                <div key={`all-${key}`} className="content-item all">
                  <ChipsCheckbox
                    onChange={handleChangeCheckbox}
                    name={value}
                    label={allJobs[value]}
                    value={key}
                    checked={selectedJob.includes(key as AllJobsKeyValuesKeys)}
                  />
                </div>
              ))}

            {tab === 'hotel' &&
              Object.entries(hotelJobKeyValues).map(([key, value]) => (
                <div key={`hotel-${key}`} className="content-item hotel">
                  <ChipsCheckbox
                    onChange={handleChangeCheckbox}
                    name={value}
                    label={hotelJobs[value]}
                    value={key}
                    checked={selectedJob.includes(key as AllJobsKeyValuesKeys)}
                  />
                </div>
              ))}

            {tab === 'touristHotel' &&
              Object.entries(touristHotelJobsKeyValues).map(([key, value]) => (
                <div key={key} className="content-item touristHotel">
                  <ChipsCheckbox
                    onChange={handleChangeCheckbox}
                    name={value}
                    label={touristHotelJobs[value]}
                    value={key}
                    checked={selectedJob.includes(key as AllJobsKeyValuesKeys)}
                  />
                </div>
              ))}

            {tab === 'other' &&
              Object.entries(otherJobsKeyValues).map(([key, value]) => (
                <div key={key} className="content-item other">
                  <ChipsCheckbox
                    onChange={handleChangeCheckbox}
                    name={value}
                    label={otherJobs[value]}
                    value={key}
                    checked={selectedJob.includes(key as AllJobsKeyValuesKeys)}
                  />
                </div>
              ))}
          </S.Content>

          <S.SelectedBox>
            {selectedJob.map((item: AllJobsKeyValuesKeys) => (
              <ChipsCheckbox
                key={item}
                onChange={() => {}}
                name={item}
                label={allJobs[item]}
                value={Object.keys(item)[0]}
                checked={selectedJob.includes(item as AllJobsKeyValuesKeys)}
                margin="0 15px 0 0"
              />
            ))}
          </S.SelectedBox>

          <S.ButtonBox>
            <Button
              label="취소"
              variant="secondary"
              width="100px"
              height="40px"
              margin="0 30px 0 0"
              onClick={() => setIsOpenJobModal(false)}
            />
            <Button label="선택완료" variant="primary" width="100px" height="40px" onClick={handleSaveSelectedJobs} />
          </S.ButtonBox>
        </S.JobModal>
      </Background>
    </Portal>
  );
}

const S = {
  JobModal: styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 700px;
    z-index: 16;
    background-color: ${({ theme }) => theme.colors.white};
    height: 500px;
    border-radius: 5px;
    padding: 20px;
    display: flex;
    flex-direction: column;
  `,
  Title: styled.div`
    font-size: 22px;
    color: ${(props) => props.theme.colors.gray800};
    font-weight: 500;
    margin-bottom: 15px;
  `,
  Search: styled.div`
    height: 40px;
    margin-bottom: 10px;
    position: relative;
    .search-icon {
      position: absolute;
      top: 50%;
      left: 4%;
      transform: translate(-50%, -50%);
      color: gray;
    }
    .search-filed {
      all: unset;
      box-sizing: border-box;
      border: 1px solid ${({ theme }) => theme.colors.gray500};
      width: 60%;
      max-width: 400px;
      height: 100%;
      border-radius: 30px;
      padding-left: 45px;
      padding-right: 15px;
    }
  `,
  Category: styled.div`
    height: 40px;
    border-bottom: 1px solid ${({ theme }) => theme.colors.gray500};
    .item {
      width: 100px;
      height: 100%;
      text-align: center;
      cursor: pointer;
      position: relative;
    }
    .underline {
      position: absolute;
      left: 0;
      bottom: -1px;
      width: 100%;
      border-bottom: 2px solid #333;
    }
  `,
  Content: styled.div`
    flex: 1;
    display: flex;
    flex-wrap: wrap;
    overflow-y: auto;
    padding: 15px;
    .content-item {
      /* flex: 0 1 170px; */
      /* height: auto; */
      margin: 5px;
    }
    .all {
      flex: 1 1 200px;
      margin: 10px 5px;
    }
    .touristHotel {
      flex: 1 1 200px;
      margin: 10px 5px;
    }
    .hotel {
      flex: 1 1 120px;
    }

    .other {
      flex: 1 1 120px;
      height: fit-content;
    }
  `,
  SelectedBox: styled.div`
    height: 50px;
    display: flex;
    align-items: center;
    border-top: 1px solid ${({ theme }) => theme.colors.gray400};
  `,
  ButtonBox: styled.div`
    display: flex;
    justify-content: flex-end;
    margin-top: 15px;
  `,
};

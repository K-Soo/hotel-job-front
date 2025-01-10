import React from 'react';
import styled from 'styled-components';
import Portal from '@/components/common/Portal';
import Background from '@/components/common/Background';
import Button from '@/components/common/style/Button';
import { job, hotelJob, otherJob, touristHotel } from '@/constants/job';
import CheckBox from '@/components/common/style/CheckBox';
import Icon from '@/icons/Icon';
import { FieldValues, Path, useFormContext } from 'react-hook-form';
import { motion } from 'framer-motion';
import FormChipsCheckbox from '@/components/common/form/FormChipsCheckbox';
interface JobModalProps<T> {
  name: Path<T>;
  setIsOpenJobModal: React.Dispatch<React.SetStateAction<boolean>>;
}
// TODO : 기능
export default function JobModal<T extends FieldValues>({ name, setIsOpenJobModal }: JobModalProps<T>) {
  const [selectedJob, setSelectedJob] = React.useState<{ label: string; value: string }[]>([]);
  const [tab, setTab] = React.useState('all');

  const { watch } = useFormContext<T>();

  const watchValue = watch(name) || [];

  React.useEffect(() => {
    setSelectedJob(watchValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChangeCheckbox = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked, value } = event.target;
    console.log('value: ', value);

    if (checked) {
      const isProcessing = selectedJob.find((job) => job.value === value);
      if (isProcessing) {
        return;
      }

      setSelectedJob([...selectedJob, { value, label: name }]);
    } else {
      setSelectedJob(selectedJob.filter((item) => item.value !== value));
    }
  };

  return (
    <Portal>
      <Background>
        <S.JobModal>
          <S.Title>
            <h2>직무 선택</h2>
          </S.Title>
          <S.Search>
            <Icon className="search-icon" name="Search24x24" width="24px" height="24px" />
            <input className="search-filed" type="text" placeholder="Search" maxLength={20} />
          </S.Search>

          <S.Category>
            <motion.button
              type="button"
              className="item"
              name="all"
              onClick={() => setTab('all')}
              whileHover={{
                color: '#000',
              }}
            >
              전체
            </motion.button>

            <motion.button
              type="button"
              className="item"
              name="hotel"
              onClick={() => setTab('hotel')}
              whileHover={{
                color: '#000',
              }}
            >
              호텔
            </motion.button>
            <motion.button
              type="button"
              className="item"
              name="touristHotel"
              onClick={() => setTab('touristHotel')}
              whileHover={{
                color: '#000',
              }}
            >
              관광호텔
            </motion.button>
            <motion.button
              type="button"
              className="item"
              name="other"
              onClick={() => setTab('other')}
              whileHover={{
                color: '#000',
              }}
            >
              기타
            </motion.button>
          </S.Category>

          <S.Content>
            {/* {tab === 'all' &&
              Object.entries(job).map(([key, value]) => (
                <div key={`all-${key}`} className="content-item all">
                  <>
                    <CheckBox
                      checked={selectedJob.some((job) => job.value === key)}
                      name={value}
                      label={value}
                      onChange={handleChangeCheckbox}
                      fontSize="15px"
                      value={key}
                    />
                  </>
                </div>
              ))} */}

            {/* {tab === 'hotel' &&
              Object.entries(hotelJob).map(([key, value]) => (
                <div key={`hotel-${key}`} className="content-item hotel">
                  <CheckBox
                    checked={selectedJob.some((job) => job.value === key)}
                    name={key}
                    label={value}
                    onChange={handleChangeCheckbox}
                    fontSize="15px"
                    value={key}
                  />
                </div>
              ))} */}

            {/* {tab === 'touristHotel' &&
              Object.entries(touristHotel).map(([key, value]) => (
                <div key={key} className="content-item touristHotel">
                  <CheckBox
                    checked={selectedJob.some((job) => job.value === key)}
                    name={key}
                    label={value}
                    onChange={handleChangeCheckbox}
                    fontSize="15px"
                    value={key}
                  />
                </div>
              ))} */}

            {tab === 'other' &&
              Object.entries(otherJob).map(([key, value]) => (
                <div key={key} className="content-item other">
                  <FormChipsCheckbox name={value} label={value} />

                  {/* <CheckBox
                    checked={selectedJob.some((job) => job.value === key)}
                    name={key}
                    label={value}
                    onChange={handleChangeCheckbox}
                    value={key}
                  /> */}
                </div>
              ))}
          </S.Content>

          <S.SelectedBox>
            <p>선택한 직군</p>
          </S.SelectedBox>

          <S.ButtonBox>
            <Button
              label="닫기"
              variant="secondary"
              width="100px"
              height="40px"
              margin="0 15px 0 0"
              onClick={() => setIsOpenJobModal(false)}
            />
            <Button label="선택완료" variant="primary" width="100px" height="40px" />
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
    font-size: 18px;
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
      color: ${({ theme }) => theme.colors.gray600};
      width: 100px;
      height: 100%;
      text-align: center;
      cursor: pointer;
    }
  `,
  Content: styled.div`
    flex: 1;
    display: flex;
    flex-wrap: wrap;
    overflow-y: auto;
    padding: 15px;
    .content-item {
      flex: 0 1 170px;
      height: auto;
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
    }
  `,
  SelectedBox: styled.div`
    height: 80px;
    padding: 15px;
    border: 1px solid red;
  `,
  ButtonBox: styled.div`
    display: flex;
    justify-content: flex-end;
  `,
};

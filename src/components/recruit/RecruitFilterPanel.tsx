import React from 'react';
import styled from 'styled-components';
import RecruitTagButton from '@/components/recruit/RecruitTagButton';
import DragScroll from '@/components/common/DragScroll';
import { useRouter } from 'next/router';
import { hotelJobKeyValues } from '@/constants/job';

// TODO - path filter

interface RecruitFilterPanelProps {
  handleClickFilterButton: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function RecruitFilterPanel({ handleClickFilterButton }: RecruitFilterPanelProps) {
  const router = useRouter();
  const [pathname, params] = router.asPath.split('?');

  // const dragScrollRef = React.useRef<HTMLElement>(null);
  // const filterButtonRefs = React.useRef<HTMLLIElement[] | null[]>([]);

  const handleClickTagButton = (event: React.MouseEvent<HTMLButtonElement>) => {
    const { value, name } = event.currentTarget;

    const urlSearchParams = new URLSearchParams(params);

    const existingValues = urlSearchParams.getAll(name);

    if (existingValues.includes(value)) {
      urlSearchParams.delete(name);
      existingValues.filter((item) => item !== value).forEach((item) => urlSearchParams.append(name, item));
    } else {
      urlSearchParams.append(name, value);
    }

    router.replace(
      {
        pathname,
        query: {
          ...router.query,
          [name]: urlSearchParams.getAll(name),
        },
      },
      undefined,
      { scroll: false },
    );
  };

  return (
    <S.RecruitFilterPanel>
      {/* <div>
        <RecruitFilterButton isTag margin="0 15px 0 0" label="전체 태그" />
      </div> */}
      <DragScroll>
        {/* <div className="filters">
          <RecruitFilterButton onClick={handleClickFilterButton} name="salary" margin="0 15px 0 0" label="급여" />
          <RecruitFilterButton onClick={handleClickFilterButton} name="experience" margin="0 15px 0 0" label="경력/신입" />
          <RecruitFilterButton onClick={handleClickFilterButton} name="employmentType" label="고용형태" />
        </div> */}

        {/* <div className="line" /> */}

        <div className="tags">
          <RecruitTagButton
            name="job"
            margin="0 15px 0 0"
            label="당번"
            value={hotelJobKeyValues.DUTY_OFFICER.toLocaleLowerCase()}
            onClick={handleClickTagButton}
          />
          <RecruitTagButton
            name="job"
            margin="0 15px 0 0"
            label="캐셔"
            value={hotelJobKeyValues.CASHIER.toLocaleLowerCase()}
            onClick={handleClickTagButton}
          />
          <RecruitTagButton
            name="job"
            margin="0 15px 0 0"
            label="부부팀"
            value={hotelJobKeyValues.CLEANING_TEAM.toLocaleLowerCase()}
            onClick={handleClickTagButton}
          />
          <RecruitTagButton
            name="job"
            margin="0 15px 0 0"
            label="룸메이드"
            value={hotelJobKeyValues.CLEANING.toLocaleLowerCase()}
            onClick={handleClickTagButton}
          />

          {/* <RecruitTagButton
            name="job"
            margin="0 15px 0 0"
            label="베팅"
            value={hotelJobKeyValues.BEDDING.toLocaleLowerCase()}
            onClick={handleClickTagButton}
          /> */}

          {/* <RecruitTagButton
            name="employmentType"
            margin="0 15px 0 0"
            label="파출"
            value={'CONTRACT'.toLocaleLowerCase()}
            onClick={handleClickTagButton}
          /> */}
          {/* <RecruitTagButton
            name="benefits"
            margin="0 15px 0 0"
            label="숙식제공"
            value={'WORK_LIFE_DORMITORY_OPERATION'.toLocaleLowerCase()}
            onClick={handleClickTagButton}
          /> */}

          {/* <RecruitTagButton
            name="workingDay"
            margin="0 15px 0 0"
            label="주말"
            value={'WEEKEND_DAY'.toLocaleLowerCase()}
            onClick={handleClickTagButton}
          /> */}
        </div>
      </DragScroll>
    </S.RecruitFilterPanel>
  );
}

const S = {
  RecruitFilterPanel: styled.div`
    display: flex;
    align-items: center;
    ${(props) => props.theme.media.laptop`
      padding: 0 15px 0 15px;
    `};
    .filters {
      display: flex;
    }
    .line {
      border-left: 1px solid ${(props) => props.theme.colors.gray200};
      margin: 0 15px;
      height: 30px;
    }
    .tags {
      display: flex;
    }
  `,
};

import React from 'react';
import styled from 'styled-components';
import RecruitFilterButton from '@/components/recruit/RecruitFilterButton';
import RecruitTagButton from '@/components/recruit/RecruitTagButton';
import DragScroll from '@/components/common/DragScroll';
import { useRouter } from 'next/router';
import path from '@/constants/path';

interface RecruitFilterPanelProps {
  handleClickFilterButton: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function RecruitFilterPanel({ handleClickFilterButton }: RecruitFilterPanelProps) {
  const router = useRouter();
  const dragScrollRef = React.useRef<HTMLElement>(null);
  const filterButtonRefs = React.useRef<HTMLLIElement[] | null[]>([]);

  const handleClickTagButton = (event: React.MouseEvent<HTMLButtonElement>) => {
    const { value } = event.currentTarget;
    console.log('value: ', value);
    const { pathname, query } = router;
    const { tag } = query;
    // const tags = tag ? tag.split(',') : [];

    // if (tags.includes(value)) {
    //   const newTags = tags.filter((item) => item !== value);
    //   router.push({
    //     pathname,
    //     query: { ...query, tag: newTags.join(',') },
    //   });
    // } else {
    //   router.push({
    //     pathname,
    //     query: { ...query, tag: [...tags, value].join(',') },
    //   });
    // }
  };

  return (
    <S.RecruitFilterPanel>
      <div>
        <RecruitFilterButton isTag margin="0 15px 0 0" label="전체 태그" />
      </div>
      <DragScroll>
        <div className="filters">
          <RecruitFilterButton onClick={handleClickFilterButton} name="salary" margin="0 15px 0 0" label="급여" />
          <RecruitFilterButton onClick={handleClickFilterButton} name="experience" margin="0 15px 0 0" label="경력/신입" />
          <RecruitFilterButton onClick={handleClickFilterButton} name="employmentType" label="고용형태" />
        </div>

        <div className="line" />

        <div className="tags">
          <RecruitTagButton margin="0 15px 0 0" label="파출" value="AL" onClick={handleClickTagButton} />
          <RecruitTagButton margin="0 15px 0 0" label="부부팀 구인" value="" onClick={handleClickTagButton} />
          <RecruitTagButton margin="0 15px 0 0" label="숙식제공" value="" onClick={handleClickTagButton} />
          <RecruitTagButton margin="0 15px 0 0" label="식대제공" value="" onClick={handleClickTagButton} />
        </div>
      </DragScroll>
    </S.RecruitFilterPanel>
  );
}

const S = {
  RecruitFilterPanel: styled.div`
    display: flex;
    align-items: center;
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

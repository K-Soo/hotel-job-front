import React from 'react';
import styled from 'styled-components';
import RecruitFilterButton from '@/components/recruit/RecruitFilterButton';
import RecruitTagButton from '@/components/recruit/RecruitTagButton';
import DragScroll from '@/components/common/DragScroll';
import { useRouter } from 'next/router';
import path from '@/constants/path';

interface RecruitFilterPanelProps {}

export default function RecruitFilterPanel({}: RecruitFilterPanelProps) {
  const router = useRouter();
  const dragScrollRef = React.useRef<HTMLElement>(null);
  const filterButtonRefs = React.useRef<HTMLLIElement[] | null[]>([]);

  const [pathname, params] = router.asPath.split('?');
  const urlSearchParams = new URLSearchParams(params);

  const handleClickFilterButton = (event: React.MouseEvent<HTMLButtonElement>) => {
    const { name, value } = event.currentTarget;
    const params = Object.fromEntries(urlSearchParams);

    router.replace({
      pathname: path.RECRUIT,
      query: params,
    });
  };

  return (
    <S.RecruitFilterPanel>
      <div>
        <RecruitFilterButton isTag margin="0 15px 0 0" label="전체 태그" />
      </div>
      <DragScroll>
        <div className="filters">
          <RecruitFilterButton onClick={handleClickFilterButton} name="aa" margin="0 15px 0 0" label="직무" />
          <RecruitFilterButton onClick={handleClickFilterButton} name="aaaa" margin="0 15px 0 0" label="급여" />
          <RecruitFilterButton onClick={handleClickFilterButton} name="aaaaa" margin="0 15px 0 0" label="경력/신입" />
          <RecruitFilterButton onClick={handleClickFilterButton} name="aaaaaa" label="고용형태" />
        </div>

        <div className="line" />

        <div className="tags">
          <RecruitTagButton margin="0 15px 0 0" label="파출" />
          <RecruitTagButton margin="0 15px 0 0" label="부부팀 구인" />
          <RecruitTagButton margin="0 15px 0 0" label="숙식제공" />
          <RecruitTagButton margin="0 15px 0 0" label="식대제공" />
          <RecruitTagButton label="수당" />
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

import React from 'react';
import dynamic from 'next/dynamic';
import Recruit from '@/components/recruit';
import RecruitFilterPanel from '@/components/recruit/RecruitFilterPanel';
import RecruitFilterForm from '@/components/recruit/recruitFilterForm';
import RecruitSearch from '@/components/recruit/recruitSearch';
import RecruitListContainer from '@/containers/recruitContainer/RecruitListContainer';
import RecruitUrgentListContainer from '@/containers/recruitContainer/RecruitUrgentListContainer';
import RecruitSpecialListContainer from '@/containers/recruitContainer/RecruitSpecialListContainer';
import Line from '@/components/common/Line';
import { ErrorBoundary, ErrorComponent } from '@/error';
import Modal from '@/components/common/modal';
import useModal from '@/hooks/useModal';

const DynamicNoSSRModal = dynamic(() => import('@/components/common/modal'), { ssr: false });

export default function RecruitContainer() {
  const { modalAtomState, setModalAtomState } = useModal();

  const handleClickFilterButton = (event: React.MouseEvent<HTMLButtonElement>) => {
    setModalAtomState({ isOpen: true });
    // const { name, value } = event.currentTarget;
    // const params = Object.fromEntries(urlSearchParams);
    // router.replace({
    //   pathname: path.RECRUIT,
    //   query: params,
    // });
  };

  return (
    <>
      <Recruit>
        <RecruitSearch />

        <RecruitFilterPanel handleClickFilterButton={handleClickFilterButton} />

        <Line margin="20px 0" />

        {/* TODO - ERROR 높이값 */}
        <ErrorBoundary fallback={null}>
          <RecruitSpecialListContainer />
        </ErrorBoundary>

        {/* TODO - ERROR 높이값 */}
        <ErrorBoundary fallback={null}>
          <RecruitUrgentListContainer />
        </ErrorBoundary>

        {/* TODO - ERROR 높이값 */}
        <ErrorBoundary fallback={<ErrorComponent visibleBackButton={false} height="200px" />}>
          <RecruitListContainer />
        </ErrorBoundary>
      </Recruit>
    </>
  );
}

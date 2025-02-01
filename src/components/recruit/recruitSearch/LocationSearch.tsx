import React from 'react';
import styled from 'styled-components';
import Icon from '@/icons/Icon';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import useResponsive from '@/hooks/useResponsive';
import Modal from '@/components/common/modal';
import useModal from '@/hooks/useModal';
import Button from '@/components/common/style/Button';

interface LocationSearchProps {}

const DynamicLocationModalForm = dynamic(() => import('@/components/recruit/recruitSearch/LocationModalForm'), { ssr: false });
const DynamicNoSSRModal = dynamic(() => import('@/components/common/modal'), { ssr: false });

export default function LocationSearch({}: LocationSearchProps) {
  const [selectedLocations, setSelectedLocations] = React.useState<string[]>(['all']);
  const [sidoIndex, setSidoIndex] = React.useState('seoul.all');
  const [isOpenLocationModal, setIsOpenLocationModal] = React.useState(false);

  const { isTablet } = useResponsive();
  const { modalAtomState, setModalAtomState } = useModal();

  const router = useRouter();

  const handleCloseLocationModal = () => setIsOpenLocationModal(false);

  // 지역 선택 적용
  const handleApplyLocations = () => {
    if (selectedLocations.length === 0) return;

    const params = new URLSearchParams(router.query as any);

    params.delete('location');
    selectedLocations.forEach((location) => params.append('location', location));

    console.log('params 지역: ', params.toString());
    router.replace(
      {
        pathname: router.pathname,
        query: {
          location: params.getAll('location'),
          job: params.getAll('job'),
        },
      },
      undefined,
      { shallow: true },
    );

    if (handleCloseLocationModal) {
      handleCloseLocationModal();
    }
    setModalAtomState({ isOpen: false });
  };

  // 지역 선택 초기화
  const handleClickInitialLocation = React.useCallback(() => {
    setSelectedLocations(['all']);
    setSidoIndex('seoul.all');
  }, []);

  return (
    <>
      {isTablet && modalAtomState.isOpen && (
        <DynamicNoSSRModal>
          <Modal.Header title="지역" />
          <Modal.Content>
            <DynamicLocationModalForm
              selectedLocations={selectedLocations}
              setSelectedLocations={setSelectedLocations}
              handleApplyLocations={handleApplyLocations}
              sidoIndex={sidoIndex}
              setSidoIndex={setSidoIndex}
              handleClickInitialLocation={handleClickInitialLocation}
            />
          </Modal.Content>
          <Modal.Footer>
            <Button label="초기화" variant="tertiary" height="40px" width="100%" margin="0 15px 0 0" onClick={handleClickInitialLocation} />
            <Button label="적용" variant="primary" height="40px" width="100%" type="button" onClick={handleApplyLocations} />
          </Modal.Footer>
        </DynamicNoSSRModal>
      )}
      <S.LocationSearch>
        <S.LocationSearchButton>
          {/* 지역 */}
          <motion.div
            className="location-wrapper"
            onClick={() => {
              setIsOpenLocationModal((prev) => !prev);
              if (isTablet) {
                setModalAtomState({ isOpen: true });
              }
            }}
          >
            <motion.div whileTap={{ scale: 0.99 }} whileHover={{ color: '#000000' }}>
              <span>지역 · 전국</span>
            </motion.div>
            <S.ArrowBottomIcon>
              <Icon name="ArrowRight16x16" width="16px" height="16px" />
            </S.ArrowBottomIcon>
          </motion.div>

          {!isTablet && isOpenLocationModal && (
            <DynamicLocationModalForm
              handleCloseLocationModal={handleCloseLocationModal}
              selectedLocations={selectedLocations}
              setSelectedLocations={setSelectedLocations}
              handleApplyLocations={handleApplyLocations}
              sidoIndex={sidoIndex}
              setSidoIndex={setSidoIndex}
              handleClickInitialLocation={handleClickInitialLocation}
            />
          )}
        </S.LocationSearchButton>
      </S.LocationSearch>
    </>
  );
}

const S = {
  LocationSearch: styled.div`
    position: relative;
    .location-wrapper {
      font-size: 24px;
      font-weight: 600;
      display: flex;
      align-items: center;
      margin-left: 30px;
      cursor: pointer;
      ${(props) => props.theme.media.mobile`
        font-size: 18px;
        margin-top: 8px;
        margin-left: 0;
      `};
    }
  `,
  LocationSearchButton: styled(motion.div)`
    position: relative;
    .location-wrapper {
      font-size: 24px;
      font-weight: 600;
      display: flex;
      align-items: center;
      margin-left: 30px;
      cursor: pointer;
      ${(props) => props.theme.media.mobile`
        font-size: 18px;
        margin-top: 8px;
        margin-left: 0;
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

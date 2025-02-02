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
import { LOCATION, CITY } from '@/constants/location';
import path from '@/constants/path';

const DynamicLocationModalForm = dynamic(() => import('@/components/recruit/recruitSearch/LocationModalForm'), { ssr: false });
const DynamicNoSSRModal = dynamic(() => import('@/components/common/modal'), { ssr: false });

export default function LocationSearch() {
  const [selectedLocations, setSelectedLocations] = React.useState<string[]>(['all']);
  const [sidoIndex, setSidoIndex] = React.useState('seoul.all');
  const [isOpenLocationModal, setIsOpenLocationModal] = React.useState(false);
  const [isOpenModal, setIsOpenModal] = React.useState(false);

  const { isTablet, isMobile } = useResponsive();
  const { modalAtomState, setModalAtomState } = useModal();

  const router = useRouter();
  const { location } = router.query;

  React.useEffect(() => {
    if (!location) return setSelectedLocations(['all']);

    const locationsArray = Array.isArray(location) ? location : [location];

    setSelectedLocations(locationsArray);
  }, [location]);

  const handleCloseLocationModal = () => setIsOpenLocationModal(false);

  const renderSelectedLocationText = () => {
    const queryLocations = Array.isArray(router.query.location)
      ? router.query.location
      : router.query.location
      ? [router.query.location]
      : [];

    // 🔹 쿼리 값이 없거나 "all"이 포함되면 "지역 · 전국"
    if (queryLocations.length === 0 || queryLocations.includes('all')) return '지역 · 전국';

    // 🔹 "서울 전체" 같은 시/도 전체 값 먼저 확인
    for (const [sido, engValue] of Object.entries(CITY)) {
      if (queryLocations.includes(engValue)) {
        return queryLocations.length === 1 ? `${sido} 전체` : `${sido} 전체 외 ${queryLocations.length - 1}건`;
      }
    }

    // 🔹 개별 지역이 하나만 선택된 경우
    if (queryLocations.length === 1) {
      for (const [sido, sigunguObj] of Object.entries(LOCATION)) {
        for (const [sigungu, engValue] of Object.entries(sigunguObj)) {
          if (engValue === queryLocations[0]) {
            return `${sido} ${sigungu}`; // 예: "서울 강남구"
          }
        }
      }
      return '지역 선택';
    }

    // 🔹 여러 개 선택된 경우 (첫 번째 지역 + 외 N)
    let firstSelected = '';
    for (const [sido, sigunguObj] of Object.entries(LOCATION)) {
      for (const [sigungu, engValue] of Object.entries(sigunguObj)) {
        if (engValue === queryLocations[0]) {
          firstSelected = `${sido} ${sigungu}`;
          break;
        }
      }
      if (firstSelected) break;
    }

    return `${firstSelected} 외 ${queryLocations.length - 1}`;
  };

  const handleApplyLocations = () => {
    if (selectedLocations.length === 1 && selectedLocations[0] === 'all') {
      const params = new URLSearchParams();

      params.delete('location');
      router.replace(
        {
          pathname: path.RECRUIT,
          query: { ...router.query, location: [] },
        },
        undefined,
        { shallow: true },
      );

      handleCloseLocationModal();
      setModalAtomState({ isOpen: false });
      return;
    }

    const params = new URLSearchParams(router.query as any);

    params.delete('location');
    selectedLocations.forEach((location) => params.append('location', location));

    router.replace(
      {
        pathname: path.RECRUIT,
        query: {
          ...router.query,
          location: params.getAll('location'),
        },
      },
      undefined,
      { shallow: true },
    );

    handleCloseLocationModal();
    setModalAtomState({ isOpen: false });
  };

  // 지역 선택 초기화
  const handleClickInitialLocation = React.useCallback(() => {
    setSelectedLocations(['all']);
    setSidoIndex('seoul.all');
  }, []);

  return (
    <S.LocationSearch>
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

      {isTablet && isOpenModal && (
        <DynamicNoSSRModal handleCloseModal={() => setIsOpenModal(false)}>
          <Modal.Header title="지역" handleCloseModal={() => setIsOpenModal(false)} />
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

      <S.LocationSearchButton>
        <motion.div
          className="location-wrapper"
          onClick={() => {
            setIsOpenLocationModal((prev) => !prev);
            if (isTablet) {
              setModalAtomState({ isOpen: true });
            }
          }}
        >
          {isMobile && <Icon name="Location24x24" width="24px" height="24px" margin="0 10px 0 0" />}
          <motion.div whileTap={{ scale: 0.99 }} whileHover={{ color: '#000000' }}>
            <span>{renderSelectedLocationText()}</span>
          </motion.div>
          <S.ArrowBottomIcon>
            <Icon name="ArrowRight16x16" width="16px" height="16px" />
          </S.ArrowBottomIcon>
        </motion.div>
      </S.LocationSearchButton>
    </S.LocationSearch>
  );
}

const S = {
  LocationSearch: styled.div`
    position: relative;
    margin-left: 30px;
    ${(props) => props.theme.media.mobile`
      border-bottom-right-radius: 8px;
      border-bottom-left-radius: 8px;
      padding-left: 15px;
      margin-left: 0;
      height: 50px;
      border: 1px solid ${props.theme.colors.gray500};
    `};
  `,
  LocationSearchButton: styled(motion.div)`
    height: 100%;
    border-radius: inherit;
    .location-wrapper {
      font-size: 24px;
      font-weight: 600;
      display: flex;
      align-items: center;
      cursor: pointer;
      height: 100%;
      ${(props) => props.theme.media.mobile`
        font-weight: 400;
        font-size: 16px;
      `};
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

import React from 'react';
import styled from 'styled-components';
import Button from '@/components/common/style/Button';
import Icon from '@/icons/Icon';
import { motion } from 'framer-motion';
import { LOCATION, CITY } from '@/constants/location';
import CircleCheckbox from '@/components/common/style/CircleCheckbox';
import IconDimmed from '@/components/common/IconDimmed';
import DragScroll from '@/components/common/DragScroll';
import useToast from '@/hooks/useToast';

const variants = {
  initial: { backgroundColor: '#ffffff', color: '#444444' },
  hover: { backgroundColor: '#f2f4f6', color: '#000000' },
};
interface LocationModalFormProps {
  selectedLocations: string[];
  sidoIndex: string;
  setSidoIndex: React.Dispatch<React.SetStateAction<string>>;
  setSelectedLocations: React.Dispatch<React.SetStateAction<string[]>>;
  handleCloseLocationModal?: () => void;
  handleApplyLocations: () => void;
  handleClickInitialLocation: () => void;
}

export default function LocationModalForm({
  handleCloseLocationModal,
  selectedLocations,
  setSelectedLocations,
  handleApplyLocations,
  setSidoIndex,
  sidoIndex,
  handleClickInitialLocation,
}: LocationModalFormProps) {
  const modalRef = React.useRef<HTMLDivElement>(null);
  const locationsListRef = React.useRef<HTMLDivElement>(null);
  const sigunguListRef = React.useRef<HTMLDivElement>(null);

  const dragScrollRef = React.useRef<HTMLElement>(null);

  const SIDO_MAPPING = React.useMemo(() => Object.fromEntries(Object.entries(CITY).map(([kor, eng]) => [eng, kor])), []);

  const SIGUNGU_MAPPING = React.useMemo(() => {
    const mapping: Record<string, string> = {};
    for (const [_, sigunguObj] of Object.entries(LOCATION)) {
      for (const [sigunguKor, sigunguEng] of Object.entries(sigunguObj)) {
        mapping[sigunguEng] = sigunguKor;
      }
    }
    return mapping;
  }, []);

  const { addToast } = useToast();

  React.useEffect(() => {
    if (!locationsListRef.current || !dragScrollRef.current) return;

    requestAnimationFrame(() => {
      const scrollWidth = locationsListRef.current?.scrollWidth ?? 0;

      if (scrollWidth > 0 && dragScrollRef.current) {
        dragScrollRef.current.scrollLeft = scrollWidth;
      }
    });
  }, [selectedLocations]);

  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (!handleCloseLocationModal) {
        return;
      }
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node) &&
        !(event.target as HTMLElement).closest('.location-wrapper')
      ) {
        handleCloseLocationModal();
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [handleCloseLocationModal]);

  // 시도
  const handleClickLocationAllItem = (value: string) => {
    // 전국
    if (value === 'all') {
      return setSelectedLocations(['all']);
    }

    const existLocation = selectedLocations.find((item) => item === value);

    if (existLocation) {
      return setSelectedLocations((prev) => prev.filter((item) => item !== value));
    }

    if (!existLocation) {
      if (selectedLocations.length > 10) {
        return addToast({ message: '최대 10개까지 선택가능합니다.', type: 'info' });
      }
      setSelectedLocations((prev) => {
        // 🔹 'all'이 선택된 상태라면 제거 후 추가
        const updatedLocations = [...prev.filter((item) => item !== 'all'), value];

        return updatedLocations;
      });
    }
  };

  // 시군구
  const handleClickLocationItem = (value: string, allValue: string, sigunguCount: number) => {
    const valueArray = value.split('.');
    const sido = valueArray[0];
    const sigungu = valueArray[1];

    // 전체(all) 선택 또는 해제
    if (sigungu === 'all') {
      const isExistLocation = selectedLocations.includes(value);

      if (isExistLocation) {
        // 체크 해제: 전체(all) 선택이 이미 되어 있다면 제거
        setSelectedLocations((prev) => prev.filter((item) => item !== value));
      }

      if (!isExistLocation) {
        // 체크함: 해당 시/도에 해당하는 모든 시/군/구를 제거하고 전체(all) 선택
        setSelectedLocations((prev) =>
          [
            ...prev.filter((item) => {
              const itemArray = item.split('.');
              return itemArray[0] !== sido; // 해당 시도의 모든 시군구 제거
            }),
            value,
          ].filter((item) => item !== 'all'),
        ); // 🔹 전국(all) 자동 해제
      }
      return;
    }

    // 개별 시군구 선택
    const isExistSigungu = selectedLocations.find((item) => item === value);

    if (isExistSigungu) {
      //개별 시군구 해제
      setSelectedLocations((prev) => {
        const updatedLocations = prev.filter((item) => item !== value);

        // 📌 시군구 중 하나라도 해제되면 전체 선택 해제
        if (updatedLocations.includes(allValue)) {
          return updatedLocations.filter((item) => item !== allValue);
        }
        return updatedLocations;
      });
    }

    if (!isExistSigungu) {
      if (selectedLocations.length > 10) {
        return addToast({ message: '최대 10개까지 선택가능합니다.', type: 'info' });
      }

      setSelectedLocations((prev) => {
        const updatedLocations = [...prev, value];

        // 현재 시군구 개수 계산
        const selectedSigunguCount = updatedLocations.filter((item) => item.startsWith(`${sido}.`) && item !== allValue).length;

        // 시군구가 선택되면 sido.all 자동 체크
        if (selectedSigunguCount === sigunguCount) {
          sigunguListRef.current?.scrollTo({ top: 0, behavior: 'smooth' });

          return [...updatedLocations.filter((item) => !item.startsWith(`${sido}.`)), allValue];
        }

        // 선택된 시군구 개수가 전체보다 적으면 sido.all 제거
        const finalLocations = updatedLocations.filter((item) => item !== allValue);

        //전국(all) 자동 해제
        return finalLocations.filter((item) => item !== 'all');
      });
    }
  };

  const handleClickSelectedLocation = (value: string) => setSelectedLocations((prev) => prev.filter((item) => item !== value));

  return (
    <S.LocationModalForm ref={modalRef}>
      <S.Header>
        <h5>지역</h5>
        <IconDimmed width="36px" height="36px" onClick={handleCloseLocationModal}>
          <Icon name="CloseA24x24" width="24px" height="24px" />
        </IconDimmed>
      </S.Header>
      <S.Content>
        <S.LocationContainer>
          <div className="sido-wrapper">
            {Object.entries(CITY).map(([key, value], index) => (
              <motion.div
                key={index}
                className="sido-wrapper__item"
                onClick={() => {
                  setSidoIndex(value);
                  handleClickLocationAllItem(value);
                }}
                variants={variants}
                initial="initial"
                whileHover="hover"
              >
                <span>{key}</span>
              </motion.div>
            ))}
          </div>

          {/* 시군구 */}
          <div className="sigungu-wrapper" ref={sigunguListRef}>
            {selectedLocations?.[0] === 'all' && (
              <StyledEmptyLocationItem>
                지역을 선택해서 <br />
                상세 지역을 확인할 수 있습니다.
              </StyledEmptyLocationItem>
            )}
            {selectedLocations?.[0] !== 'all' &&
              Object.entries(LOCATION).map(([key, value], index) => {
                const sidoAllValue = CITY[key as keyof typeof CITY];

                if (sidoIndex !== sidoAllValue) return null;

                const sigunguCount = Object.keys(value).length;

                return (
                  <React.Fragment key={key + index}>
                    <motion.div
                      className="sigungu-wrapper__item"
                      variants={variants}
                      initial="initial"
                      whileHover="hover"
                      onClick={() => handleClickLocationItem(sidoAllValue, sidoAllValue, sigunguCount)}
                    >
                      <span>{key} 전체</span>
                      <CircleCheckbox
                        onChange={() => {}}
                        value="all"
                        name={sidoAllValue}
                        style={{ pointerEvents: 'none' }}
                        checked={selectedLocations.includes(sidoAllValue)}
                      />
                    </motion.div>
                    {Object.entries(value).map(([key, value], i) => (
                      <motion.div
                        key={i}
                        className="sigungu-wrapper__item"
                        variants={variants}
                        initial="initial"
                        whileHover="hover"
                        onClick={() => handleClickLocationItem(value, sidoAllValue, sigunguCount)}
                      >
                        <span>{key}</span>
                        <CircleCheckbox
                          checked={selectedLocations.includes(value)}
                          name={value}
                          onChange={() => {}}
                          value={value}
                          style={{ pointerEvents: 'none' }}
                        />
                      </motion.div>
                    ))}
                  </React.Fragment>
                );
              })}
          </div>
        </S.LocationContainer>
        <DragScroll ref={dragScrollRef}>
          <S.LocationList ref={locationsListRef}>
            {selectedLocations.map((location, index) => {
              const locationName = location.split('.');
              const sido = locationName[0];
              const sigungu = locationName[1];

              const sidoInKorean = SIDO_MAPPING[location];
              const sigunguKorean = SIGUNGU_MAPPING[`${sido}.${sigungu}`];

              return (
                <StyledLocationItem key={index} onClick={() => handleClickSelectedLocation(location)}>
                  {sidoInKorean && <span>{sidoInKorean === '전국' ? sidoInKorean : `${sidoInKorean} 전체`}</span>}
                  {sigunguKorean && <span>{sigunguKorean}</span>}
                  <Icon className="icon" name="CloseA24x24" width="16px" height="16px" />
                </StyledLocationItem>
              );
            })}
          </S.LocationList>
        </DragScroll>
      </S.Content>
      <S.Bottom>
        <Button label="초기화" variant="tertiary" height="40px" width="100%" margin="0 15px 0 0" onClick={handleClickInitialLocation} />
        <Button label="적용" variant="primary" height="40px" width="100%" type="button" onClick={handleApplyLocations} />
      </S.Bottom>
    </S.LocationModalForm>
  );
}

const StyledLocationItem = styled.button`
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
  background-color: ${({ theme }) => theme.colors.gray200};
  color: ${({ theme }) => theme.colors.gray600};
  font-size: 13px;
  padding: 4px 8px 4px 10px;
  border-radius: 15px;
  margin-right: 10px;
  white-space: nowrap;
  cursor: pointer;
  .icon {
    margin-left: 5px;
  }
  &:hover {
    background-color: ${({ theme }) => theme.colors.gray300};
  }
`;
const StyledEmptyLocationItem = styled.div`
  padding-top: 100px;
  display: flex;
  justify-content: center;
  height: 100%;
  font-size: 15px;
  color: ${({ theme }) => theme.colors.gray600};
  line-height: 1.5;
`;

const S = {
  LocationModalForm: styled.div`
    position: absolute;
    top: 50px;
    width: 500px;
    height: 500px;
    background-color: #ffffff;
    z-index: 5;
    box-shadow: 0 4px 30px 10px rgba(0, 0, 0, 0.06);
    border-radius: 15px;
    display: flex;
    flex-direction: column;
    ${(props) => props.theme.media.tablet`
      box-shadow: none;
      border-radius: 0;
      width: 100%;
      position: static;
      height: 430px;
    `};
    ${(props) => props.theme.media.mobile`
      // max-height: 550px;
      height: 100%;
    `};
  `,
  Header: styled.div`
    display: flex;
    align-items: center;
    height: 60px;
    justify-content: space-between;
    padding: 0 20px;
    font-size: 20px;
    font-weight: 500;
    ${(props) => props.theme.media.tablet`
      display: none;
    `};
  `,
  Content: styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    ${(props) => props.theme.media.tablet`
    `};
  `,
  LocationContainer: styled.div`
    flex: 1;
    display: flex;
    justify-content: space-between;
    overflow: hidden;
    font-size: 15px;
    font-weight: 400;
    border-bottom: 1px solid ${({ theme }) => theme.colors.gray200};
    ${(props) => props.theme.media.tablet`
      border-bottom: none;
    `};
    .sido-wrapper {
      flex-basis: 45%;
      overflow-y: auto;
      border-right: 1px solid ${({ theme }) => theme.colors.gray200};
      &::-webkit-scrollbar {
        display: none;
      }
      &__item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 45px;
        margin: 5px;
        padding-left: 10px;
        border-radius: 8px;
        cursor: pointer;
        svg {
          color: gray;
        }
      }
    }
    .sigungu-wrapper {
      flex-basis: 55%;
      overflow-y: auto;
      scrollbar-color: #b0b8c1 #fafafa;
      &__item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 45px;
        margin: 5px;
        padding: 0 10px;
        border-radius: 8px;
        cursor: pointer;
      }
    }
  `,
  LocationList: styled.div`
    height: 35px;
    display: flex;
    align-items: center;
    width: 100%;
    padding: 0 15px;
    ${(props) => props.theme.media.tablet`
      height: 100%;
      padding: 0;
    `};
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
    ${(props) => props.theme.media.tablet`
      display: none;
    `};
  `,
};

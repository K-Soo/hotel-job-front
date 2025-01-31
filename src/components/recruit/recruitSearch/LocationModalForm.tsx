import React from 'react';
import styled, { css } from 'styled-components';
import Button from '@/components/common/style/Button';
import Icon from '@/icons/Icon';
import { motion } from 'framer-motion';
import { LOCATION, CITY } from '@/constants/location';
import CircleCheckbox from '@/components/common/style/CircleCheckbox';
import IconDimmed from '@/components/common/IconDimmed';
import DragScroll from '@/components/common/DragScroll';
import { useRouter } from 'next/router';
import useToast from '@/hooks/useToast';
import { ParsedUrlQuery } from 'querystring';

interface LocationModalFormProps {
  handleCloseLocationModal?: () => void;
}

export default function LocationModalForm({ handleCloseLocationModal }: LocationModalFormProps) {
  const [selectedLocations, setSelectedLocations] = React.useState<string[]>(['all']);
  const [sidoIndex, setSidoIndex] = React.useState<number>(0);
  const sidoKeys = Object.keys(LOCATION);

  const modalRef = React.useRef<HTMLDivElement>(null);
  const locationsDragScrollRef = React.useRef<HTMLDivElement>(null);
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

  const router = useRouter();
  const { addToast } = useToast();

  React.useEffect(() => {
    if (!locationsDragScrollRef.current || !dragScrollRef.current) return;

    requestAnimationFrame(() => {
      const scrollWidth = locationsDragScrollRef.current?.scrollWidth ?? 0;

      if (scrollWidth > 0 && dragScrollRef.current) {
        dragScrollRef.current.scrollLeft = scrollWidth;
        console.log('스크롤 이동:', scrollWidth);
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

  const handleClickLocationItem = (value: string) => {
    console.log('value: ', value);
    const existJob = selectedLocations.find((item) => item === value);

    if (existJob) {
      setSelectedLocations((prev) => prev.filter((item) => item !== value));
    }

    if (!existJob) {
      // if (selectedLocations.length >= 3) {
      //   return addToast({ message: '최대 3개까지 선택가능합니다.', type: 'info' });
      // }
      setSelectedLocations((prev) => [...prev, value]);
    }
  };
  const handleClickSelectedLocation = (value: string) => setSelectedLocations((prev) => prev.filter((item) => item !== value));

  const handleApplyLocations = () => {
    if (selectedLocations.length === 0) return;

    const params = new URLSearchParams(router.query as any);

    params.delete('location');
    selectedLocations.forEach((job) => params.append('job', job));

    router.replace(
      {
        pathname: router.pathname,
        query: params.toString(),
      },
      undefined,
      { shallow: true },
    );
    if (handleCloseLocationModal) {
      handleCloseLocationModal();
    }
  };

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
            <motion.div
              className="sido-wrapper__item"
              initial={{ backgroundColor: '#ffffff', color: '#444444' }}
              whileHover={{
                backgroundColor: '#f2f4f6',
                color: '#000000',
              }}
            >
              <h6>전국</h6>
            </motion.div>
            {sidoKeys.map((sido, index) => (
              <motion.div
                key={index}
                className="sido-wrapper__item"
                onClick={() => setSidoIndex(index)}
                initial={{ backgroundColor: '#ffffff', color: '#444444' }}
                whileHover={{
                  backgroundColor: '#f2f4f6',
                  color: '#000000',
                }}
              >
                <span>{sido}</span>
              </motion.div>
            ))}
          </div>
          {/* 시군구 */}
          <div className="sigungu-wrapper">
            {Object.entries(LOCATION).map(([key, value], index) => {
              const keyValues = CITY[key as keyof typeof CITY];
              const allKeyValue = keyValues + '.all';
              if (sidoIndex !== index) return null;
              return (
                <>
                  <motion.div
                    className="sigungu-wrapper__item"
                    initial={{ backgroundColor: '#ffffff', color: '#444444' }}
                    whileHover={{
                      backgroundColor: '#f2f4f6',
                      color: '#000000',
                    }}
                    onClick={() => handleClickLocationItem(allKeyValue)}
                  >
                    <span>전체</span>
                    <CircleCheckbox
                      onChange={() => {}}
                      value="all"
                      name={allKeyValue}
                      style={{ pointerEvents: 'none' }}
                      checked={selectedLocations.includes(allKeyValue)}
                    />
                  </motion.div>
                  {Object.entries(value).map(([key, value], i) => (
                    <motion.div
                      key={i}
                      className="sigungu-wrapper__item"
                      initial={{ backgroundColor: '#ffffff', color: '#444444' }}
                      whileHover={{
                        backgroundColor: '#f2f4f6',
                        color: '#000000',
                      }}
                      onClick={() => handleClickLocationItem(value)}
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
                </>
              );
            })}
          </div>
        </S.LocationContainer>
        <DragScroll ref={dragScrollRef}>
          <S.LocationList ref={locationsDragScrollRef}>
            {selectedLocations.map((location, index) => {
              const locationName = location.split('.');
              const sido = locationName[0];
              const sigungu = locationName[1];
              const sidoInKorean = SIDO_MAPPING[sido] || sido;

              const sigunguKorean = SIGUNGU_MAPPING[`${sido}.${sigungu}`] || '';
              return (
                <StyledLocationItem key={index} onClick={() => handleClickSelectedLocation(location)}>
                  <span>
                    {sidoInKorean} {sigunguKorean}
                  </span>
                  <Icon name="CloseA24x24" width="16px" height="16px" />
                </StyledLocationItem>
              );
            })}
          </S.LocationList>
        </DragScroll>
      </S.Content>
      <S.Bottom>
        <Button
          label="초기화"
          variant="tertiary"
          height="40px"
          width="100%"
          margin="0 15px 0 0"
          onClick={() => setSelectedLocations(['all'])}
        />
        <Button label="적용" variant="primary" height="40px" width="100%" type="button" onClick={handleApplyLocations} />
      </S.Bottom>
    </S.LocationModalForm>
  );
}

const StyledLocationItem = styled.button`
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
  background-color: ${({ theme }) => theme.colors.blue300};
  color: ${({ theme }) => theme.colors.white};
  font-size: 14px;
  padding: 5px 8px;
  border-radius: 4px;
  white-space: nowrap;
  cursor: pointer;
  &:hover {
    background-color: ${({ theme }) => theme.colors.blue400};
  }
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
    `};
    ${(props) => props.theme.media.mobile`
      // max-height: 600px;
      // height: 100%;
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
    scrollbar-color: #b0b8c1 #fafafa;
    &::-webkit-scrollbar {
      /* display: none; */
    }
    .sido-wrapper {
      flex-basis: 45%;
      overflow-y: auto;
      border-right: 1px solid ${({ theme }) => theme.colors.gray200};
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
    gap: 15px;
    padding: 0 15px;
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

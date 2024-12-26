import React from 'react';
import styled from 'styled-components';
import Button from '@/components/common/style/Button';
import Icon from '@/icons/Icon';
import useResponsive from '@/hooks/useResponsive';
import { useRouter } from 'next/router';
import path from '@/constants/path';
import DropdownTemplate from '@/components/common/DropdownTemplate';
import { location } from '@/constants/location';
import { motion } from 'framer-motion';

interface RecruitSearchPanelProps {}

export default function RecruitSearchPanel({}: RecruitSearchPanelProps) {
  const [isSearchFocus, setIsSearchFocus] = React.useState(false);
  const [isLocationFocus, setIsLocationFocus] = React.useState(false);
  const [form, setForm] = React.useState({
    search: '',
    location: '',
  });

  const [filteredLocation, setFilteredLocation] = React.useState<string[]>([]);

  const dropdownRef = React.useRef<HTMLDivElement>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const router = useRouter();
  const { isTablet, isLaptop } = useResponsive();

  // "지역-구" 형태로 데이터 초기화
  const getInitialLocations = React.useCallback((): string[] => {
    return Object.entries(location).flatMap(([city, suburbs]) => Object.keys(suburbs).map((suburb) => `${city} ${suburb}`));
  }, []);

  React.useEffect(() => {
    setFilteredLocation(getInitialLocations());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChangeLocationFiled = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name } = event.target;
    const query = event.target.value.toLowerCase();
    if (query) {
      const filtered = getInitialLocations().filter((region) => region.toLowerCase().includes(query));
      setFilteredLocation(filtered);
    } else {
      setFilteredLocation(getInitialLocations());
    }
    setForm((prev) => ({ ...prev, [name]: query }));
  };

  const handleChangeSearchFiled = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // 드롭다운 항목 클릭 처리
  const handleClickDropdownItem = (value: string) => {
    setForm((prev) => ({ ...prev, location: value }));
    setIsLocationFocus(false);
  };

  // 포커스 블러 처리
  const handleBlur = (event: React.FocusEvent) => {
    const relatedTarget = event.relatedTarget as HTMLElement | null;
    // input 또는 dropdown 내부 클릭인 경우 blur 무시
    if (dropdownRef.current?.contains(relatedTarget) || inputRef.current === relatedTarget) {
      return;
    }
    setIsLocationFocus(false);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const encodedText = encodeURIComponent(form.location);

    router.replace({
      pathname: path.RECRUIT,
      query: { location: encodedText },
    });
  };

  return (
    <S.RecruitSearchPanel>
      <S.Form onSubmit={onSubmit}>
        <div className="search">
          <StyledIcon name="Search24x24" width="24px" height="24px" />
          <S.InputFiled
            type="text"
            name="search"
            placeholder="직무, 키워드, 업체명"
            onFocus={() => setIsSearchFocus(true)}
            onBlur={() => setIsSearchFocus(false)}
            onChange={handleChangeSearchFiled}
            value={form.search}
            autoComplete="off"
          />
          {isSearchFocus && (
            <DropdownTemplate
              outStyle={{
                top: 'calc(100% + 15px)',
                left: '-10px',
                width: 'calc(100% + 10px)',
              }}
            >
              <div></div>
            </DropdownTemplate>
          )}
        </div>
        <div className="location">
          <StyledIcon name="Location24x24" width="24px" height="24px" />
          <S.InputFiled
            ref={inputRef}
            type="text"
            name="location"
            placeholder="시, 군, 구"
            onFocus={() => setIsLocationFocus(true)}
            onBlur={handleBlur}
            onChange={handleChangeLocationFiled}
            value={form.location}
            autoComplete="off"
            tabIndex={0}
          />

          {isLocationFocus && (
            <DropdownTemplate
              ref={dropdownRef}
              tabIndex={0}
              outStyle={{
                top: 'calc(100% + 15px)',
                width: 'calc(100% + 10px)',
              }}
            >
              {form.location.length === 0 &&
                Object.entries(location).map(([city]) => {
                  return (
                    <S.CityItem key={city} onClick={() => handleClickDropdownItem(city)}>
                      {city}
                    </S.CityItem>
                  );
                })}

              {form.location.length !== 0 &&
                filteredLocation.map((city) => {
                  return (
                    <S.CityItem key={city} onClick={() => handleClickDropdownItem(city)}>
                      {city}
                    </S.CityItem>
                  );
                })}
            </DropdownTemplate>
          )}
        </div>
        {<Button label="검색" variant="primary" width="80px" margin="0 0 0 10px" type="submit" />}
      </S.Form>
    </S.RecruitSearchPanel>
  );
}

const StyledIcon = styled(Icon)`
  position: absolute;
  top: 50%;
  left: 10px;
  transform: translateY(-50%);
`;

const S = {
  RecruitSearchPanel: styled.article`
    margin-bottom: 30px;
  `,
  Form: styled.form`
    margin: 0 auto;
    height: 60px;
    border: 1px solid ${(props) => props.theme.colors.gray300};
    max-width: 768px;
    padding: 10px;
    display: flex;
    align-items: center;
    border-radius: 5px;
    ${(props) => props.theme.media.tablet`
      flex-direction: column;
      height: 90px;
    `};
    .search {
      flex: 1;
      position: relative;
      height: 100%;
      width: 100%;
      border-right: 1px solid ${(props) => props.theme.colors.gray300};
      ${(props) => props.theme.media.tablet`
        border-right: none;
      `};
    }
    .location {
      flex: 1;
      position: relative;
      height: 100%;
      width: 100%;
    }
  `,
  InputFiled: styled.input`
    all: unset;
    box-sizing: border-box;
    height: 100%;
    width: 100%;
    padding-left: 40px;
  `,
  CityItem: styled(motion.div)`
    min-height: 40px;
    cursor: pointer;
    display: flex;
    align-items: center;
    padding-left: 10px;
    border-radius: 5px;
    color: ${(props) => props.theme.colors.gray600};
    &:hover {
      background-color: ${(props) => props.theme.colors.gray};
      color: ${(props) => props.theme.colors.black100};
    }
  `,
};

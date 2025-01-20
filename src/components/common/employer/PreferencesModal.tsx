import React from 'react';
import styled from 'styled-components';
import Portal from '@/components/common/Portal';
import Background from '@/components/common/Background';
import Button from '@/components/common/style/Button';
import {
  LANGUAGE_PREFERENCES,
  LICENSE_PREFERENCES,
  SKILLS_AND_ABILITIES_PREFERENCES,
  WORKING_CONDITIONS_PREFERENCES,
  PREFERENCES,
  FACILITY_MANAGEMENT_PREFERENCES,
} from '@/constants/preferences';
import ChipsCheckbox from '@/components/common/style/ChipsCheckbox';
import { useFormContext } from 'react-hook-form';
import useToast from '@/hooks/useToast';
import { PreferencesKeys } from '@/types';
import { motion } from 'framer-motion';

interface PreferencesModalProps {
  name: string;
  setIsOpenPreferencesModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const MENU_TABS = [
  { label: '시설관련 자격증', value: 'facilityManagementPreferences' },
  { label: '근무조건', value: 'workingConditionsPreferences' },
  { label: '외국어', value: 'languagePreferences' },
  { label: '자격/능력', value: 'skillsAndAbilitiesPreferences' },
  { label: '일반 자격증', value: 'licensePreferences' },
];

export default function PreferencesModal({ name, setIsOpenPreferencesModal }: PreferencesModalProps) {
  const [selectedItems, setSelectedItems] = React.useState<PreferencesKeys[]>([]);
  const [selectedTab, setSelectedTab] = React.useState<string>('licensePreferences');

  const { addToast } = useToast();

  const { watch, setValue } = useFormContext();

  const watchValue = watch(name) || [];

  React.useEffect(() => {
    setSelectedItems(watchValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClickMenuTab = (value: string) => {
    setSelectedTab(value);
  };

  const handleChangeCheckbox = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { checked, value } = event.target;

    if (checked) {
      return setSelectedItems((prev) => [...prev, value as PreferencesKeys]);
    }
    setSelectedItems((prev) => prev.filter((item) => item !== value));
  };

  const handleSaveSelectedJobs = () => {
    if (selectedItems.length === 0) {
      addToast({ message: '선택 해제됬습니다.', type: 'info' });
    }
    if (selectedItems.length > 0) {
      addToast({ message: '선택사항이 변경되었습니다.', type: 'info' });
    }

    setValue(name, [...selectedItems]);
    setIsOpenPreferencesModal(false);
  };

  return (
    <Portal>
      <Background>
        <S.PreferencesModal>
          <S.Title>
            <h2>복리후생 선택</h2>
          </S.Title>
          {/* <S.Search>
                <Icon className="search-icon" name="Search24x24" width="24px" height="24px" />
                <input className="search-filed" type="text" placeholder="Search" maxLength={20} />
              </S.Search> */}

          <S.Content>
            <div className="menu">
              {MENU_TABS.map((tab) => (
                <motion.button
                  className="menu__item"
                  onClick={() => handleClickMenuTab(tab.value)}
                  key={tab.value}
                  whileTap={{ scale: 0.95 }}
                  animate={{ color: selectedTab === tab.value ? '#3182f6' : '#8b95a1' }}
                >
                  {tab.label}
                </motion.button>
              ))}
            </div>
            <div className="list">
              <div className="list__wrapper">
                {selectedTab === 'licensePreferences' && (
                  <>
                    {Object.entries(LICENSE_PREFERENCES).map(([key, value]) => (
                      <div key={`all-${key}`} className="list__item">
                        <ChipsCheckbox
                          onChange={handleChangeCheckbox}
                          name={key}
                          label={value}
                          value={key}
                          checked={selectedItems.includes(key as PreferencesKeys)}
                        />
                      </div>
                    ))}
                  </>
                )}
              </div>

              <div className="list__wrapper">
                {selectedTab === 'languagePreferences' && (
                  <>
                    {Object.entries(LANGUAGE_PREFERENCES).map(([key, value]) => (
                      <div key={`all-${key}`} className="list__item">
                        <ChipsCheckbox
                          onChange={handleChangeCheckbox}
                          name={key}
                          label={value}
                          value={key}
                          checked={selectedItems.includes(key as PreferencesKeys)}
                        />
                      </div>
                    ))}
                  </>
                )}
              </div>

              <div className="list__wrapper">
                {selectedTab === 'workingConditionsPreferences' && (
                  <>
                    {Object.entries(WORKING_CONDITIONS_PREFERENCES).map(([key, value]) => (
                      <div key={`all-${key}`} className="list__item">
                        <ChipsCheckbox
                          onChange={handleChangeCheckbox}
                          name={key}
                          label={value}
                          value={key}
                          checked={selectedItems.includes(key as PreferencesKeys)}
                        />
                      </div>
                    ))}
                  </>
                )}
              </div>

              <div className="list__wrapper">
                {selectedTab === 'skillsAndAbilitiesPreferences' && (
                  <>
                    {Object.entries(SKILLS_AND_ABILITIES_PREFERENCES).map(([key, value]) => (
                      <div key={`all-${key}`} className="list__item">
                        <ChipsCheckbox
                          onChange={handleChangeCheckbox}
                          name={key}
                          label={value}
                          value={key}
                          checked={selectedItems.includes(key as PreferencesKeys)}
                        />
                      </div>
                    ))}
                  </>
                )}
              </div>

              <div className="list__wrapper">
                {selectedTab === 'facilityManagementPreferences' && (
                  <>
                    {Object.entries(FACILITY_MANAGEMENT_PREFERENCES).map(([key, value]) => (
                      <div key={`all-${key}`} className="list__item">
                        <ChipsCheckbox
                          onChange={handleChangeCheckbox}
                          name={key}
                          label={value}
                          value={key}
                          checked={selectedItems.includes(key as PreferencesKeys)}
                        />
                      </div>
                    ))}
                  </>
                )}
              </div>
            </div>
          </S.Content>

          <S.SelectedBox>
            {selectedItems.map((item) => (
              <ChipsCheckbox
                key={item}
                onChange={() => {}}
                name={item}
                label={PREFERENCES[item]}
                value={item}
                checked={selectedItems.includes(item)}
                margin="0 15px 10px 0"
              />
            ))}
          </S.SelectedBox>

          <S.ButtonBox>
            <Button
              label="취소"
              variant="secondary"
              width="100px"
              height="40px"
              margin="0 30px 0 0"
              onClick={() => setIsOpenPreferencesModal(false)}
            />
            <Button label="선택완료" variant="primary" width="100px" height="40px" onClick={handleSaveSelectedJobs} />
          </S.ButtonBox>
        </S.PreferencesModal>
      </Background>
    </Portal>
  );
}

const S = {
  PreferencesModal: styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    aspect-ratio: 16 / 9;
    height: 550px;
    z-index: 16;
    background-color: ${({ theme }) => theme.colors.white};
    border-radius: 5px;
    padding: 20px;
    display: flex;
    flex-direction: column;
  `,
  Content: styled.div`
    flex: 1;
    display: flex;
    position: relative;
    overflow-y: auto;
    .menu {
      width: 120px;
      position: sticky;
      top: 0;
      display: flex;
      flex-direction: column;
      margin-right: 20px;

      &__item {
        cursor: pointer;
        height: 40px;
        color: ${({ theme }) => theme.colors.gray800};
      }
    }

    .list {
      flex: 1;
      padding-left: 15px;
      border-left: 1px solid ${({ theme }) => theme.colors.gray400};
      &__wrapper {
        display: flex;
        align-items: stretch;
        flex-wrap: wrap;
        gap: 15px;
      }
      &__item {
        height: fit-content;
        flex: 0 1 32%;
      }
    }
  `,
  Title: styled.div`
    font-size: 22px;
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

  SelectedBox: styled.div`
    min-height: 100px;
    max-height: 150px;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    overflow-y: auto;
    padding-top: 15px;
    border-top: 1px solid ${({ theme }) => theme.colors.gray400};
  `,
  ButtonBox: styled.div`
    display: flex;
    justify-content: flex-end;
    margin-top: 15px;
  `,
};

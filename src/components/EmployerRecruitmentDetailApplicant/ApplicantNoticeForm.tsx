import React from 'react';
import styled, { css } from 'styled-components';
import Portal from '@/components/common/Portal';
import Background from '@/components/common/Background';
import Button from '@/components/common/style/Button';
import Radio from '@/components/common/style/Radio';
import Select from '@/components/common/style/Select';
import Input from '@/components/common/style/Input';
import { CreateApplicationsAnnouncementForm, RecruitmentDetailApplicantListItem, ResumeDetail } from '@/types';
import { SEX_CODE } from '@/constants';
import Icon from '@/icons/Icon';
import { REVIEW_STAGE_STATUS } from '@/constants/application';
import DropdownTemplate from '@/components/common/DropdownTemplate';
import DefaultProfileImage from '@/components/common/DefaultProfileImage';
import { parseBirthDateAndCalculateAge } from '@/utils';
import { FAIL_RESULT_NOTIFICATION_STATUS, PASS_RESULT_NOTIFICATION_STATUS } from '@/constants/announcement';

interface ApplicantNoticeFormProps {
  handleCloseNoticeForm: () => void;
  checkedApplicants: RecruitmentDetailApplicantListItem[];
  handleChangeAnnouncementForm: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  announcementForm: CreateApplicationsAnnouncementForm;
  handleClickAnnouncementType: (event: React.MouseEvent<HTMLButtonElement>) => void;
  handleClickApplicationAnnouncement: () => void;
}

export default function ApplicantNoticeForm({
  handleCloseNoticeForm,
  checkedApplicants,
  handleChangeAnnouncementForm,
  announcementForm,
  handleClickAnnouncementType,
  handleClickApplicationAnnouncement,
}: ApplicantNoticeFormProps) {
  const [isOpenDropdown, setIsOpenDropdown] = React.useState(false);

  const dropdownRef = React.useRef<HTMLDivElement>(null);

  const handleBlur = (event: React.FocusEvent) => {
    event.stopPropagation();
    const relatedTarget = event.relatedTarget as HTMLElement | null;
    if (dropdownRef.current?.contains(relatedTarget)) {
      return;
    }
    setIsOpenDropdown(false);
  };

  return (
    <Portal>
      <Background>
        <S.ApplicantNoticeForm>
          <S.Header>
            <Icon name="Close25x25" />
          </S.Header>
          <S.Content>
            <S.ContentHorizontalRow>
              <h6 className="title">대상자</h6>
              <div className="wrapper">
                <p>총 {checkedApplicants.length}명</p>

                <StyledArrowBottom onClick={() => setIsOpenDropdown((prev) => !prev)} onBlur={handleBlur} tabIndex={0}>
                  <Icon className="arrow-icon" name="ArrowRight16x16" width="16px" height="16px" />
                </StyledArrowBottom>

                {isOpenDropdown && checkedApplicants.length !== 0 && (
                  <DropdownTemplate ref={dropdownRef} tabIndex={0} outStyle={{ height: 'auto' }}>
                    {checkedApplicants.map((item) => {
                      const { age, birthYear } = parseBirthDateAndCalculateAge(item.resumeSnapshot.birthday);

                      return (
                        <StyledDropdownItem key={item.id}>
                          <DefaultProfileImage imageUrl={item.resumeSnapshot.profileImage} margin="0 10px 0 0" />
                          <div className="summary">
                            <span className="summary__name">
                              {item.resumeSnapshot.name} {'/'} {SEX_CODE[item.resumeSnapshot.sexCode]}
                            </span>
                            <span className="summary__birth">
                              {birthYear} {`${age}세`}
                            </span>
                          </div>
                        </StyledDropdownItem>
                      );
                    })}
                  </DropdownTemplate>
                )}
              </div>
            </S.ContentHorizontalRow>
            <S.ContentHorizontalRow>
              <h6 className="title">발표 유형</h6>
              <div className="wrapper">
                <StyledStepRadioButton
                  name="announcementType"
                  onClick={handleClickAnnouncementType}
                  value="ACCEPT"
                  $active={announcementForm.announcementType === 'ACCEPT'}
                >
                  <Radio
                    checked={announcementForm.announcementType === 'ACCEPT'}
                    name="announcementType"
                    onChange={() => {}}
                    value="ACCEPT"
                  />
                  <p className="text">합격 안내</p>
                </StyledStepRadioButton>

                <StyledStepRadioButton
                  name="announcementType"
                  onClick={handleClickAnnouncementType}
                  value="REJECT"
                  $active={announcementForm.announcementType === 'REJECT'}
                >
                  <Radio
                    checked={announcementForm.announcementType === 'REJECT'}
                    name="announcementType"
                    onChange={() => {}}
                    value="REJECT"
                  />
                  <p className="text">불합격 안내</p>
                </StyledStepRadioButton>
              </div>
            </S.ContentHorizontalRow>

            <S.ContentHorizontalRow>
              <h6 className="title">전형</h6>
              <div className="wrapper">
                <Select
                  name="resultNotificationStatus"
                  options={
                    announcementForm.announcementType === 'ACCEPT' ? PASS_RESULT_NOTIFICATION_STATUS : FAIL_RESULT_NOTIFICATION_STATUS
                  }
                  onChange={handleChangeAnnouncementForm}
                  value={announcementForm.resultNotificationStatus}
                />
              </div>
            </S.ContentHorizontalRow>

            <S.AnnouncementMessage>
              <h6 className="title">발표 문구</h6>
              <div className="form">
                <textarea
                  className="form__area"
                  onChange={handleChangeAnnouncementForm}
                  name="message"
                  value={announcementForm.message}
                  maxLength={500}
                />
              </div>
            </S.AnnouncementMessage>

            <S.ContentHorizontalRow>
              <h6 className="title">발표명</h6>
              <div className="wrapper">
                <Input onChange={handleChangeAnnouncementForm} name="title" value={announcementForm.title} maxLength={30} />
              </div>
            </S.ContentHorizontalRow>

            <S.ContentHorizontalRow>
              <h6 className="title">발표 일시</h6>
              <div className="wrapper">
                <Radio checked name="aaa" onChange={() => {}} label="즉시발표" fontSize="16px" />
              </div>
            </S.ContentHorizontalRow>
          </S.Content>

          <S.Bottom>
            <Button label="취소" variant="secondary" onClick={handleCloseNoticeForm} type="button" />
            <Button label="알림 보내기" variant="primary" margin="0 0 0 15px" onClick={handleClickApplicationAnnouncement} />
          </S.Bottom>
        </S.ApplicantNoticeForm>
      </Background>
    </Portal>
  );
}

const StyledArrowBottom = styled.i`
  background-color: white;
  border: 1px solid ${({ theme }) => theme.colors.gray300};
  border-radius: 6px;
  display: flex;
  align-items: center;
  padding: 2px;
  .arrow-icon {
    transform: rotate(90deg);
    color: ${({ theme }) => theme.colors.black400};
  }
  &:hover {
    border: 1px solid ${({ theme }) => theme.colors.black400};
  }
`;

const StyledStepRadioButton = styled.button<{ $active: boolean }>`
  flex: 1;
  display: flex;
  align-items: center;
  height: 45px;
  border: 1px solid ${({ theme }) => theme.colors.gray300};
  border-radius: 5px;
  padding: 10px;
  font-size: 14px;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.black800};

  .text {
    padding-left: 3px;
  }
  ${(props) =>
    props.$active &&
    css`
      border: 1px solid ${({ theme }) => theme.colors.blue400};
      color: ${({ theme }) => theme.colors.black400};
    `};
`;

const StyledDropdownItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  &:last-child {
    margin-bottom: 0;
  }

  .summary {
    display: flex;
    flex-direction: column;
    font-size: 14px;
    color: ${({ theme }) => theme.colors.black400};
    &__name {
      padding-bottom: 2px;
    }
  }
`;

const S = {
  ApplicantNoticeForm: styled.div`
    z-index: 20;
    position: fixed;
    top: 0;
    right: 0;
    width: 500px;
    height: 100vh;
    background-color: white;
    display: flex;
    flex-direction: column;
  `,
  Header: styled.div`
    height: 50px;
    border-bottom: 1px solid ${({ theme }) => theme.colors.gray300};
    display: flex;
    align-items: center;
    padding: 0 15px;
  `,
  Content: styled.div`
    flex: 1;
    overflow-y: auto;
    padding: 30px;
  `,
  ContentHorizontalRow: styled.div`
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 25px;
    .title {
      flex-basis: 100px;
      font-weight: 500;
      color: ${({ theme }) => theme.colors.black400};
    }
    .wrapper {
      flex: 1;
      display: flex;
      align-items: center;
      height: 100%;
      gap: 10px;
      position: relative;
    }
  `,
  AnnouncementMessage: styled.div`
    margin-bottom: 25px;
    .title {
      color: ${({ theme }) => theme.colors.black400};
      font-weight: 500;
      margin-bottom: 10px;
    }
    .form {
      &__area {
        width: 100%;
        resize: none;
        height: 250px;
        border: 1px solid ${({ theme }) => theme.colors.gray300};
        padding: 15px;
        border-radius: 5px;
      }
    }
  `,
  Bottom: styled.div`
    border-top: 1px solid ${({ theme }) => theme.colors.gray300};
    height: 70px;
    padding: 15px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  `,
};

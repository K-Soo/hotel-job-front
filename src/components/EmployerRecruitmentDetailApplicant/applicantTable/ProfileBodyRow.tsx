import { RecruitmentDetailApplicantListItem } from '@/types';
import styled, { css } from 'styled-components';
import DefaultProfileImage from '@/components/common/DefaultProfileImage';
import { SEX_CODE } from '@/constants';
import { parseBirthDateAndCalculateAge } from '@/utils';
import Icon from '@/icons/Icon';

interface ProfileBodyRowProps {
  item: RecruitmentDetailApplicantListItem;
  handleClickResumePreview: (item: RecruitmentDetailApplicantListItem) => void;
}

export default function ProfileBodyRow({ item, handleClickResumePreview }: ProfileBodyRowProps) {
  const { age, birthYear } = parseBirthDateAndCalculateAge(item.resumeSnapshot.birthday);

  return (
    <S.ProfileBodyRow onClick={() => handleClickResumePreview(item)}>
      <div className="wrapper">
        <DefaultProfileImage imageUrl={item.resumeSnapshot.profileImage} margin="0 10px 0 0" />

        <S.NameContent $isCancel={item.cancelAt !== null}>
          <span>
            {item.resumeSnapshot.name} {'/'} {SEX_CODE[item.resumeSnapshot.sexCode]}
          </span>
          <span>
            {birthYear} {`${age}세`}
          </span>
        </S.NameContent>
      </div>

      {item.employerReviewStageStatus === 'ACCEPT' && item.announcementRecipients.length === 0 && (
        <StyledNotifyGuide>
          <strong className="complete">
            <Icon name="NoticeA24x24" width="26px" height="26px" />
            최종 합격 전형 이동 완료!
          </strong>
          <span>합격/불합격 발표로 소식을 전해주세요.</span>
        </StyledNotifyGuide>
      )}
    </S.ProfileBodyRow>
  );
}

const StyledNotifyGuide = styled.div`
  margin-top: 2px;
  font-size: 13px;
  display: flex;
  align-items: center;
  height: 24px;
  .complete {
    padding-right: 8px;
    color: ${(props) => props.theme.colors.blue500};
    font-weight: 500;
    display: flex;
    align-items: center;
  }
`;

const S = {
  ProfileBodyRow: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-left: 15px;
    flex-grow: 1;
    height: 100%;
    font-size: 13px;
    cursor: pointer;
    .wrapper {
      display: flex;
      align-items: center;
    }
  `,
  NameContent: styled.div<{ $isCancel: boolean }>`
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-left: 15px;
    flex-grow: 1;
    height: 100%;
    font-size: 13px;
    cursor: pointer;
    &:hover {
      text-decoration: underline;
    }
    ${(props) =>
      props.$isCancel &&
      css`
        color: ${(props) => props.theme.colors.gray500};
        &:hover {
          text-decoration: none;
        }
      `};
  `,
};

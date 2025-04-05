import React from 'react';
import { ResumeDetail } from '@/types';
import styled from 'styled-components';
import { ResumeDetailForm } from '@/types';
import { LOCAL_CODE, SEX_CODE } from '@/constants';
import { CAREER_LEVEL } from '@/constants/resume';
import useResponsive from '@/hooks/useResponsive';
import { parseBirthDateAndCalculateAge } from '@/utils';
import ResumeProfileImage from '@/components/common/resume/ResumeProfileImage';
interface ProfileProps {
  resumePreviewData: ResumeDetail | ResumeDetailForm;
}

export default function Profile({ resumePreviewData }: ProfileProps) {
  const { address, addressDetail, birthday, careerLevel, email, name, phone, localCode, sexCode, profileImage } = resumePreviewData;

  const { age, birthYear } = parseBirthDateAndCalculateAge(birthday);

  const { isTablet } = useResponsive();

  return (
    <S.Profile>
      <article className="profile-preview-container">
        <div className="profile-info">
          <S.NameWithCareerBox>
            <span className="name">{name}</span>
            <span className="career">{CAREER_LEVEL[careerLevel]}</span>
          </S.NameWithCareerBox>

          <S.CertInfoBox>
            {localCode === '02' && (
              <>
                <span>{LOCAL_CODE[localCode]}</span>&nbsp;•&nbsp;
              </>
            )}
            <span>{SEX_CODE[sexCode]}</span>&nbsp;•&nbsp;
            <span>{birthYear}</span>
            <span>{`(${age}세)`}</span>
          </S.CertInfoBox>

          {!isTablet && (
            <>
              <div className="flex py-1">
                <span className="min-w-[70px] text-gray-700">휴대폰</span>
                <p className="text-black">{phone}</p>
              </div>

              <div className="flex py-1">
                <span className="min-w-[70px] text-gray-700">이메일</span>
                <p className="text-black">{email}</p>
              </div>

              <div className="flex py-1">
                <span className="min-w-[70px] text-gray-700">주소</span>
                <p className="text-black">
                  {address} {addressDetail}
                </p>
              </div>
            </>
          )}
        </div>

        {profileImage && (
          <div className="h-[140px] w-[120px] overflow-hidden rounded-[5px]">
            <ResumeProfileImage imageUrl={profileImage} />
          </div>
        )}
      </article>
    </S.Profile>
  );
}

const S = {
  Profile: styled.div`
    margin-bottom: 50px;
    .profile-preview-container {
      display: flex;
      justify-content: space-between;

      ${(props) => props.theme.media.mobile`
        flex-direction: row-reverse;
        justify-content: flex-end;
      `};
    }
  `,
  NameWithCareerBox: styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 5px;
    .name {
      font-weight: 400;
      font-size: 24px;
      color: ${({ theme }) => theme.colors.black400};
      ${(props) => props.theme.media.mobile`
        font-size: 22px;
      `};
    }
    .career {
      display: inline-block;
      margin-left: 8px;
      background-color: ${({ theme }) => theme.colors.black400};
      color: ${({ theme }) => theme.colors.white};
      padding: 2px 8px;
      width: 50px;
      text-align: center;
      border-radius: 10px;
      font-size: 14px;
    }
  `,
  CertInfoBox: styled.div`
    color: ${({ theme }) => theme.colors.black600};
    font-size: 16px;
    margin-bottom: 20px;
  `,
};

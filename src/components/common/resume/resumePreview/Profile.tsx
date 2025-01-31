import React from 'react';
import { ResumeDetail } from '@/types';
import styled from 'styled-components';
import { useFormContext } from 'react-hook-form';
import { ResumeDetailForm } from '@/types';
import { LOCAL_CODE, SEX_CODE } from '@/constants';
import { CAREER_LEVEL } from '@/constants/resume';
import useResponsive from '@/hooks/useResponsive';
import { parseBirthDateAndCalculateAge } from '@/utils';
import Image from 'next/image';

interface ProfileProps {
  resumePreviewData: ResumeDetail & ResumeDetailForm;
}

export default function Profile({ resumePreviewData }: ProfileProps) {
  const { address, addressDetail, birthday, careerLevel, createdAt, email, languages, name, phone, localCode, sexCode, profileImage } =
    resumePreviewData;
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
              <S.PhoneBox>
                <span>📞&nbsp;&nbsp;{phone}</span>
              </S.PhoneBox>

              <S.EmailBox>
                <span>✉️&nbsp;&nbsp;{email}</span>
              </S.EmailBox>

              <S.AddressBox>
                <span>🏠&nbsp;&nbsp;{address}</span>
                <span>{addressDetail}</span>
              </S.AddressBox>
            </>
          )}
        </div>

        {profileImage && (
          <div className="image-info">
            <Image src={profileImage} className="image" alt="프로필 이미지" fill />
          </div>
        )}
      </article>
      {isTablet && (
        <>
          <S.PhoneBox>
            <span>📞&nbsp;&nbsp;{phone}</span>
          </S.PhoneBox>

          <S.EmailBox>
            <span>✉️&nbsp;&nbsp;{email}</span>
          </S.EmailBox>

          <S.AddressBox>
            <span>🏠&nbsp;&nbsp;{address}</span>
            <span>{addressDetail}</span>
          </S.AddressBox>
        </>
      )}
    </S.Profile>
  );
}

const S = {
  Profile: styled.div`
    margin-bottom: 50px;
    .profile-preview-container {
      display: flex;
      justify-content: space-between;
      .profile-info {
      }
      .image-info {
        flex-shrink: 0;
        border: 1px solid ${({ theme }) => theme.colors.gray200};
        border-radius: 10px;
        width: 110px;
        height: 130px;
        position: relative;
        overflow: hidden;
        ${(props) => props.theme.media.mobile`
          margin-right: 15px;
      `};
      }

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
    font-size: 14px;
    margin-bottom: 20px;
  `,
  PhoneBox: styled.div`
    margin: 10px 0;
  `,
  EmailBox: styled.div`
    margin: 10px 0;
    word-break: break-all;
  `,
  AddressBox: styled.div``,
};

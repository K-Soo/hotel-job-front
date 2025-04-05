import React from 'react';
import styled from 'styled-components';
import { useFormContext } from 'react-hook-form';
import { ResumeDetailForm } from '@/types';
import { LOCAL_CODE, SEX_CODE } from '@/constants';
import { CAREER_LEVEL } from '@/constants/resume';
import useResponsive from '@/hooks/useResponsive';
import { parseBirthDateAndCalculateAge } from '@/utils';
import ResumeProfileImage from '@/components/common/resume/ResumeProfileImage';

export default function ResumeProfileSectionPreview() {
  const { getValues } = useFormContext<ResumeDetailForm>();
  const { isTablet } = useResponsive();

  const address = getValues('address');
  const addressDetail = getValues('addressDetail');
  const birthday = getValues('birthday');
  const email = getValues('email');
  const name = getValues('name');
  const careerLevel = getValues('careerLevel');
  const localCode = getValues('localCode');
  const sexCode = getValues('sexCode');
  const phone = getValues('phone');
  const profileImage = getValues('profileImage');
  const summaryValue = getValues('summary');

  const { age, birthYear } = parseBirthDateAndCalculateAge(birthday);

  return (
    <S.ResumeProfileSectionPreview>
      <article className="profile-preview-container">
        <div className="profile-info">
          <S.NameWithCareerBox>
            <span className="name">{name}</span>
            <span className="career">{CAREER_LEVEL[careerLevel]}</span>
          </S.NameWithCareerBox>

          <S.CertInfoBox>
            {/* 외국인 */}
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

      {isTablet && (
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

      {summaryValue.length !== 0 && (
        <div className="mt-15">
          <h5 className="mb-2 text-[18px] font-[500]">자기소개</h5>
          <p className="text-[16px] leading-relaxed text-gray-800">{summaryValue}</p>
        </div>
      )}
    </S.ResumeProfileSectionPreview>
  );
}

const S = {
  ResumeProfileSectionPreview: styled.div`
    background-color: ${({ theme }) => theme.colors.white};
    padding: 30px;
    ${(props) => props.theme.media.mobile`
      padding: 30px 15px;
      `};
    .profile-preview-container {
      display: flex;
      justify-content: space-between;
      .profile-info {
        ${(props) => props.theme.media.mobile`
          margin-left: 15px;
      `};
      }

      ${(props) => props.theme.media.mobile`
        flex-direction: row-reverse;
        justify-content: flex-end;
        margin-bottom: 30px;
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

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
  const [previewImage, setPreviewImage] = React.useState('');

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

  const { age, birthYear } = parseBirthDateAndCalculateAge(birthday);

  React.useEffect(() => {
    if (profileImage) {
      setPreviewImage(profileImage);
    }
  }, [profileImage]);

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

        {previewImage && <ResumeProfileImage imageUrl={previewImage} />}
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
    </S.ResumeProfileSectionPreview>
  );
}

const S = {
  ResumeProfileSectionPreview: styled.div`
    margin-bottom: 50px;
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

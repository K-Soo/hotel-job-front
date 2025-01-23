import styled from 'styled-components';
import { useFormContext } from 'react-hook-form';
import { ResumeDetailForm } from '@/types';
import { LOCAL_CODE, SEX_CODE } from '@/constants';
import { CAREER_LEVEL } from '@/constants/resume';
import useResponsive from '@/hooks/useResponsive';
import { parseBirthDateAndCalculateAge } from '@/utils';

export default function ResumeProfileSectionPreview() {
  const { getValues } = useFormContext<ResumeDetailForm>();

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

  return (
    <S.ResumeProfileSectionPreview>
      <article className="profile-preview-container">
        <div className="profile-info">
          <S.NameWithCareerBox>
            <span className="name">{name}</span>
            <span className="career">{CAREER_LEVEL[careerLevel]}</span>
          </S.NameWithCareerBox>

          <S.CertInfoBox>
            <span>{LOCAL_CODE[localCode]}</span>&nbsp;•&nbsp;
            <span>{SEX_CODE[sexCode]}</span>&nbsp;•&nbsp;
            <span>{birthYear}</span>
            <span>{`(${age}세)`}</span>
          </S.CertInfoBox>

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
        </div>

        {profileImage && <div className="image-info"></div>}
      </article>
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
      }
      .image-info {
        flex-shrink: 0;
        border: 1px solid ${({ theme }) => theme.colors.gray200};
        border-radius: 10px;
        width: 120px;
        height: 150px;
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
    margin-bottom: 12px;
  `,
  EmailBox: styled.div`
    margin-bottom: 12px;
  `,
  AddressBox: styled.div``,
};

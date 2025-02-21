import { LICENSE_STAGE } from '@/constants/resume';
import { ResumeDetail, ResumeDetailForm } from '@/types';
import styled from 'styled-components';

interface LicenseProps {
  resumePreviewData: ResumeDetail | ResumeDetailForm;
}

export default function License({ resumePreviewData }: LicenseProps) {
  const { licenses } = resumePreviewData;
  return (
    <S.License>
      {licenses.map((license, index) => (
        <div key={index} className="item">
          <span className="item__name">{license.licenseName}</span>
          <span className="item__stage">{LICENSE_STAGE[license.licenseStage]}</span>
        </div>
      ))}
    </S.License>
  );
}

const S = {
  License: styled.div`
    margin-bottom: 80px;
    .item {
      height: 35px;
      display: flex;
      align-items: center;
      width: fit-content;
      &__name {
        min-width: 160px;
        color: ${({ theme }) => theme.colors.black400};
      }
      &__stage {
        color: ${({ theme }) => theme.colors.black900};
        font-size: 14px;
      }
    }
  `,
};

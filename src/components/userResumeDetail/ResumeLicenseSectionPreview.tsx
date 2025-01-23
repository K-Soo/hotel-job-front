import styled from 'styled-components';
import { useFormContext } from 'react-hook-form';
import { ResumeDetailForm } from '@/types';
import { LICENSE_STAGE } from '@/constants/resume';

export default function ResumeLicenseSectionPreview() {
  const { getValues } = useFormContext<ResumeDetailForm>();

  const licensesValue = getValues('licenses');

  return (
    <S.ResumeLicenseSectionPreview>
      {licensesValue.map((license, index) => (
        <div key={index} className="item">
          <span className="item__name">{license.licenseName}</span>
          <span className="item__stage">{LICENSE_STAGE[license.licenseStage]}</span>
        </div>
      ))}
    </S.ResumeLicenseSectionPreview>
  );
}

const S = {
  ResumeLicenseSectionPreview: styled.div`
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

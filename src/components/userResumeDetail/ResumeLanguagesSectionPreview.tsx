import styled from 'styled-components';
import { useFormContext } from 'react-hook-form';
import { ResumeDetailForm } from '@/types';
import { LANGUAGE_LEVEL, LANGUAGE } from '@/constants/language';

interface ResumeLanguagesSectionPreviewProps {}

export default function ResumeLanguagesSectionPreview({}: ResumeLanguagesSectionPreviewProps) {
  const { getValues } = useFormContext<ResumeDetailForm>();

  const languagesValue = getValues('languages');

  return (
    <S.ResumeLanguagesSectionPreview>
      {languagesValue.map((languages, index) => (
        <div key={index} className="item">
          {languages.name && <span className="item__name">{LANGUAGE[languages.name]}</span>}
          {languages.level && <span className="item__level">{LANGUAGE_LEVEL[languages.level]}</span>}
        </div>
      ))}
    </S.ResumeLanguagesSectionPreview>
  );
}

const S = {
  ResumeLanguagesSectionPreview: styled.div`
    .item {
      height: 35px;
      display: flex;
      align-items: center;
      width: fit-content;
      &__name {
        min-width: 160px;
        color: ${({ theme }) => theme.colors.black400};
      }
      &__level {
        color: ${({ theme }) => theme.colors.black900};
        font-size: 14px;
      }
    }
  `,
};

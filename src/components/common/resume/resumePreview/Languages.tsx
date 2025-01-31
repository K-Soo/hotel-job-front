import { ResumeDetail, ResumeDetailForm } from '@/types';
import styled from 'styled-components';
import { LANGUAGE_LEVEL, LANGUAGE } from '@/constants/language';

interface LanguagesProps {
  resumePreviewData: ResumeDetail & ResumeDetailForm;
}

export default function Languages({ resumePreviewData }: LanguagesProps) {
  return (
    <S.Languages>
      {resumePreviewData.languages.map((languages, index) => (
        <div key={index} className="item">
          {languages.name && <span className="item__name">{LANGUAGE[languages.name]}</span>}
          {languages.level && <span className="item__level">{LANGUAGE_LEVEL[languages.level]}</span>}
        </div>
      ))}
    </S.Languages>
  );
}

const S = {
  Languages: styled.div`
    margin-bottom: 80px;
    .item {
      height: 35px;
      display: flex;
      align-items: center;
      width: fit-content;
      &__name {
        min-width: 80px;
        color: ${({ theme }) => theme.colors.black400};
      }
      &__level {
        color: ${({ theme }) => theme.colors.black900};
        font-size: 14px;
      }
    }
  `,
};

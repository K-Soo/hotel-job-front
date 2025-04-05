import styled from 'styled-components';

interface ResumePreviewSectionProps {
  title: string;
  children: React.ReactNode;
}

export default function ResumePreviewSection({ title, children }: ResumePreviewSectionProps) {
  return (
    <S.ResumePreviewSection>
      <h3 className="preview-title">{title}</h3>
      <article>{children}</article>
    </S.ResumePreviewSection>
  );
}

const S = {
  ResumePreviewSection: styled.section`
    background-color: white;
    padding: 30px;
    ${(props) => props.theme.media.mobile`
      padding: 30px 15px;
    `};
    .preview-title {
      font-size: 18px;
      font-weight: 500;
      border-bottom: 1px solid ${(props) => props.theme.colors.black400};
      margin-bottom: 5px;
      padding-bottom: 5px;
    }
  `,
};

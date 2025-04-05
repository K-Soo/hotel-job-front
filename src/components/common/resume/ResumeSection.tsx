import styled from 'styled-components';
interface ResumeSectionProps {
  title: string;
  subTitle?: string;
  guide?: string;
  headerBackground?: string;
  isVisibleHeader?: boolean;
  children: React.ReactNode;
}

export default function ResumeSection({ title, guide, children, subTitle, headerBackground, isVisibleHeader = true }: ResumeSectionProps) {
  return (
    <S.ResumeSection>
      {isVisibleHeader && (
        <S.Header $headerBackground={headerBackground}>
          <h2 className="title">{title}</h2>
          {subTitle && <p className="subTitle">{subTitle}</p>}
        </S.Header>
      )}

      {guide && <S.Guide>{guide}</S.Guide>}

      <S.Content>{children}</S.Content>
    </S.ResumeSection>
  );
}

const S = {
  ResumeSection: styled.section<{ $isEditing?: boolean }>`
    background-color: ${(props) => props.theme.colors.gray50};
    background-color: white;
    border-radius: 10px;
    padding: 30px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    margin: 0 0 30px 0;
    ${(props) => props.theme.media.tablet`
      padding: 30px 15px;
      margin: 30px 0;
      border-radius: 0;
    `};
  `,
  Header: styled.div<{ $headerBackground?: string }>`
    background: ${(props) => props.$headerBackground || 'linear-gradient(to right, #2272eb 0%, #2272eb 30%, #64a8ff 100%)'};
    height: 80px;
    border-radius: 10px;
    margin-bottom: 30px;
    color: white;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    line-height: 1.4;
    .title {
      font-size: 20px;
      font-weight: 500;
    }
    .subTitle {
      font-size: 16px;
      font-weight: 300;
    }
    ${(props) => props.theme.media.tablet`
      height: 70px;
      .title {
        font-size: 18px;
        font-weight: 500;
      }
    `};
  `,
  Content: styled.article``,
  Guide: styled.p`
    padding: 10px;
    color: ${(props) => props.theme.colors.gray600};
    padding-top: 30px;
    text-align: center;
    font-size: 14px;
  `,
};

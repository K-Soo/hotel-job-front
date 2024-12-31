import styled from 'styled-components';

interface EmployerTemplateFormProps {
  height: string;
  children?: React.ReactNode;
}

interface EmployerTemplateTitleProps {
  title: string;
}

interface EmployerTemplateContentProps {
  maxWidth?: string;
  children: React.ReactNode;
}

export default function EmployerTemplateForm({ height, children }: EmployerTemplateFormProps) {
  return <S.EmployerTemplateForm $height={height}>{children}</S.EmployerTemplateForm>;
}

function Title({ title }: EmployerTemplateTitleProps) {
  return (
    <S.Title>
      <h2>{title}</h2>
    </S.Title>
  );
}

function Content({ maxWidth, children }: EmployerTemplateContentProps) {
  return <S.Content $maxWidth={maxWidth}>{children}</S.Content>;
}

function SubTitle({ title }: EmployerTemplateTitleProps) {
  return (
    <S.SubTitle>
      <h3>{title}</h3>
    </S.SubTitle>
  );
}

const S = {
  EmployerTemplateForm: styled.div<{ $height: string }>`
    background-color: ${(props) => props.theme.colors.white};
    height: ${(props) => props.$height || 'auto'};
    padding: 20px;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  `,
  Title: styled.div`
    margin-bottom: 15px;
    font-size: 24px;
    color: ${(props) => props.theme.colors.black300};
    width: fit-content;
  `,
  SubTitle: styled.div`
    font-size: 16px;
    color: ${(props) => props.theme.colors.black300};
    width: 100%;
    border-bottom: 1px solid ${(props) => props.theme.colors.black500};
    height: 40px;
    display: flex;
    align-items: center;
  `,
  Content: styled.article<{ $maxWidth?: string }>`
    margin-bottom: 30px;
    max-width: ${(props) => props.$maxWidth || '100%'};
    width: 100%;
  `,
};

EmployerTemplateForm.Title = Title;
EmployerTemplateForm.Content = Content;
EmployerTemplateForm.SubTitle = SubTitle;

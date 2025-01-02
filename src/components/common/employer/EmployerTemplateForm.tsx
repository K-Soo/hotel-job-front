import React from 'react';
import styled, { css } from 'styled-components';

interface EmployerTemplateFormProps {
  height: string;
  children?: React.ReactNode;
}

interface EmployerTemplateTitleProps {
  title: string;
  id?: string;
  width?: string;
  size?: 'small' | 'middle' | 'large';
}

interface EmployerTemplateContentProps {
  maxWidth?: string;
  marginBottom?: string;
  children: React.ReactNode;
}

export default function EmployerTemplateForm({ height, children }: EmployerTemplateFormProps) {
  return <S.EmployerTemplateForm $height={height}>{children}</S.EmployerTemplateForm>;
}

function Title({ size, title, width }: EmployerTemplateTitleProps) {
  return (
    <S.Title $width={width}>
      <h2>{title}</h2>
    </S.Title>
  );
}

function SubTitle({ id, size, title }: EmployerTemplateTitleProps) {
  return (
    <S.SubTitle size={size} id={id}>
      <h3>{title}</h3>
    </S.SubTitle>
  );
}

function Content({ marginBottom, maxWidth, children }: EmployerTemplateContentProps) {
  return (
    <S.Content $maxWidth={maxWidth} $marginBottom={marginBottom}>
      {children}
    </S.Content>
  );
}

const S = {
  EmployerTemplateForm: styled.div<{ $height: string }>`
    background-color: ${(props) => props.theme.colors.white};
    height: ${(props) => props.$height || 'auto'};
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  `,
  Title: styled.div<{ $width?: string }>`
    margin-bottom: 15px;
    font-size: 24px;
    color: ${(props) => props.theme.colors.black300};
    width: fit-content;
    max-width: 100%;
    width: ${(props) => props.$width || 'fit-content'};
  `,
  SubTitle: styled.div<{ size?: 'small' | 'middle' | 'large' }>`
    font-size: 16px;
    color: ${(props) => props.theme.colors.black300};
    width: 100%;
    border-bottom: 1px solid ${(props) => props.theme.colors.black500};
    height: 40px;
    display: flex;
    align-items: center;
    ${(props) =>
      props.size === 'large' &&
      css`
        font-size: 18px;
      `};
  `,
  Content: styled.article<{ $maxWidth?: string; $marginBottom?: string }>`
    margin-bottom: ${(props) => props.$marginBottom || '30px'};
    max-width: ${(props) => props.$maxWidth || '100%'};
    width: 100%;
  `,
};

EmployerTemplateForm.Title = React.memo(Title);
EmployerTemplateForm.Content = Content;
EmployerTemplateForm.SubTitle = React.memo(SubTitle);

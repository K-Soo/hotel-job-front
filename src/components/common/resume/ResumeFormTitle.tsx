import styled from 'styled-components';

interface ResumeFormTitleProps {
  title: string;
  required?: boolean;
}

export default function ResumeFormTitle({ title, required }: ResumeFormTitleProps) {
  return (
    <S.ResumeFormTitle $required={required}>
      <h6 className="form-title">{title}</h6>
      {required && <span className="required-text">필수</span>}
    </S.ResumeFormTitle>
  );
}

const S = {
  ResumeFormTitle: styled.div<{ $required?: boolean }>`
    margin-bottom: 8px;
    display: flex;
    align-items: center;
    .form-title {
      font-size: 20px;
      font-weight: 500;
      color: ${(props) => props.theme.colors.gray900};
    }
    .required-text {
      font-size: 14px;
      color: ${(props) => props.theme.colors.red400};
      margin-left: 2px;
    }
  `,
};

import styled from 'styled-components';

interface StepHeaderProps {
  text: string;
}

export default function StepHeader({ text }: StepHeaderProps) {
  return (
    <S.StepHeader>
      <h2 className="title">{text}</h2>
    </S.StepHeader>
  );
}

const S = {
  StepHeader: styled.div`
    margin-bottom: 30px;
    display: flex;
    align-items: center;
    height: 80px;
    border-radius: 8px;
    text-align: center;
    .title {
      font-size: 26px;
      font-weight: 500;
      color: ${(props) => props.theme.colors.gray800};
    }
  `,
};

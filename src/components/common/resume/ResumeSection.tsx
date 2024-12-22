import styled from 'styled-components';
import Button from '@/components/common/style/Button';

interface ResumeSectionProps {
  title: string;
}

export default function ResumeSection({ title }: ResumeSectionProps) {
  return (
    <S.ResumeSection>
      <S.Header>
        <div className="left">
          <h2 className="left__title">{title}</h2>
        </div>
        <div>
          <Button label="추가" variant="primary" height="30px" width="80px" />
        </div>
      </S.Header>
      <S.Content></S.Content>
    </S.ResumeSection>
  );
}

const S = {
  ResumeSection: styled.section``,
  Header: styled.div`
    border-bottom: 1px solid ${(props) => props.theme.colors.gray200};
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 50px;
    .left {
      &__title {
        font-size: 18px;
        font-weight: 500;
        color: ${(props) => props.theme.colors.gray700};
      }
    }
    .right {
      display: flex;
      justify-content: flex-end;
    }
  `,
  Content: styled.article``,
};

import styled from 'styled-components';
import Button from '@/components/common/style/Button';

interface ResumeProgressProps {}

export default function ResumeProgress({}: ResumeProgressProps) {
  return (
    <S.ResumeProgress>
      <div className="progress-container"></div>
      <Button height="45px" label="이력서 미리보기" variant="tertiary" disabled={false} type="button" margin="15px 0 0 0" />
      <Button height="45px" label="임시저장" variant="tertiary" disabled={false} type="button" margin="15px 0 0 0" />
    </S.ResumeProgress>
  );
}

const S = {
  ResumeProgress: styled.div`
    position: sticky;
    top: 80px;
    width: 250px;
    margin-left: 30px;
    height: 50vh;
    ${(props) => props.theme.media.tablet`
      display: none;
    `};
    .progress-container {
      height: 300px;
      border-radius: 8px;
      padding: 15px;
      flex: 1;
      border: 1px solid ${(props) => props.theme.colors.gray300};
    }
  `,
};

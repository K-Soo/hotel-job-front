import styled from 'styled-components';
import Button from '@/components/common/style/Button';
import { useResumeContext } from '@/context/ResumeProvider';
import Icon from '@/icons/Icon';
import { useRouter } from 'next/router';
import path from '@/constants/path';

interface ResumeProgressProps {
  handleClickPreview: () => void;
}

export default function ResumeProgress({ handleClickPreview }: ResumeProgressProps) {
  const { isEditing } = useResumeContext();
  const router = useRouter();

  return (
    <S.ResumeProgress>
      {/* {isEditing && <div className="progress-container"></div>} */}
      <button className="back" onClick={() => router.push(path.USER_RESUME)}>
        <Icon name="ArrowLeft24x24" width="20px" height="20px" margin="0 8px 0 0" />
        <span>이력서 목록</span>
      </button>

      <Button height="50px" label="이력서 미리보기" variant="tertiary" disabled={false} type="button" onClick={handleClickPreview} />
      {/* <Button height="45px" label="임시저장" variant="tertiary" disabled={false} type="button" margin="10px 0 0 0" /> */}
    </S.ResumeProgress>
  );
}

const S = {
  ResumeProgress: styled.div`
    position: sticky;
    top: 80px;
    width: 250px;
    height: 50vh;
    margin-left: 50px;
    ${(props) => props.theme.media.tablet`
      display: none;
    `};
    .back {
      height: 50px;
      margin-bottom: 10px;
      border-radius: 8px;
      width: 100%;
      padding: 10px;
      display: flex;
      align-items: center;
      font-size: 18px;
      cursor: pointer;
      color: ${(props) => props.theme.colors.gray700};
      &:hover {
        color: ${(props) => props.theme.colors.black};
      }
    }
    .progress-container {
      height: 300px;
      border-radius: 8px;
      padding: 15px;
      flex: 1;
      border: 1px solid ${(props) => props.theme.colors.gray300};
    }
  `,
};

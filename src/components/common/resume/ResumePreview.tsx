import styled from 'styled-components';
import Portal from '@/components/common/Portal';
import Background from '@/components/common/Background';
import { ResumeDetail } from '@/types';

interface ResumePreviewProps {
  resumePreviewData: ResumeDetail | null;
}

export default function ResumePreview({ resumePreviewData }: ResumePreviewProps) {
  return (
    <Portal>
      <Background>
        <S.ResumePreview>
          <div className="preview-container">
            <S.Content>
              <div className="profile">
                <div>{resumePreviewData?.name}</div>
                {resumePreviewData?.address}
              </div>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur aut sit quam explicabo placeat, laboriosam dolorem at
                quos amet quidem deleniti porro alias sed, dolorum ab aspernatur cum quaerat est!
              </p>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur aut sit quam explicabo placeat, laboriosam dolorem at
                quos amet quidem deleniti porro alias sed, dolorum ab aspernatur cum quaerat est!
              </p>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur aut sit quam explicabo placeat, laboriosam dolorem at
                quos amet quidem deleniti porro alias sed, dolorum ab aspernatur cum quaerat est!
              </p>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur aut sit quam explicabo placeat, laboriosam dolorem at
                quos amet quidem deleniti porro alias sed, dolorum ab aspernatur cum quaerat est!
              </p>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur aut sit quam explicabo placeat, laboriosam dolorem at
                quos amet quidem deleniti porro alias sed, dolorum ab aspernatur cum quaerat est!
              </p>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur aut sit quam explicabo placeat, laboriosam dolorem at
                quos amet quidem deleniti porro alias sed, dolorum ab aspernatur cum quaerat est!
              </p>
            </S.Content>
            <S.Bottom>asd</S.Bottom>
          </div>
        </S.ResumePreview>
      </Background>
    </Portal>
  );
}

const S = {
  ResumePreview: styled.div`
    position: fixed;
    left: 50%;
    height: 100vh;
    width: 768px;
    transform: translateX(-50%);
    .preview-container {
      position: relative;
      width: 100%;
      height: 100%;
      background-color: white;
      /* overflow-y: auto; */
      p {
        font-size: 60px;
      }
    }
  `,
  Header: styled.div``,
  Content: styled.div`
    overflow-y: auto;
    height: 100%;
    padding-bottom: 50px;
  `,
  Bottom: styled.div`
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 50px;
    border-top: 1px solid ${(props) => props.theme.colors.gray300};
    background-color: #fff;
  `,
};

import styled from 'styled-components';
import Button from '@/components/common/style/Button';
import FormInput from '@/components/common/form/FormInput';
import { ResumeRegisterForm } from '@/types';
import { SubmitHandler, useFormContext } from 'react-hook-form';

interface ResumeBottomControllerProps {
  onSubmit: SubmitHandler<ResumeRegisterForm>;
}

export default function ResumeBottomController({ onSubmit }: ResumeBottomControllerProps) {
  const { handleSubmit } = useFormContext<ResumeRegisterForm>();

  return (
    <S.ResumeBottomController>
      <div className="resume-bottom-controller">
        <Button
          maxWidth="130px"
          height="40px"
          label="이력서 미리보기"
          variant="secondary"
          disabled={false}
          type="button"
          margin="0 15px 0 0"
        />
        <Button
          maxWidth="130px"
          height="40px"
          label="작성완료"
          variant="primary"
          disabled={false}
          type="button"
          onClick={handleSubmit(onSubmit)}
        />
      </div>
    </S.ResumeBottomController>
  );
}

const S = {
  ResumeBottomController: styled.div`
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 60px;
    border-top: 1px solid ${(props) => props.theme.colors.gray200};
    background-color: ${(props) => props.theme.colors.white};
    .resume-bottom-controller {
      height: 100%;
      max-width: 1024px;
      width: 100%;
      margin: 0 auto;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      ${(props) => props.theme.media.laptop`
        padding: 0 15px;
      `};
    }
  `,
};

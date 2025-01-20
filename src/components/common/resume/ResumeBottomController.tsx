import styled from 'styled-components';
import Button from '@/components/common/style/Button';
import FormInput from '@/components/common/form/FormInput';
import { ResumeDetailForm, ResumeStatusKey } from '@/types';
import { SubmitHandler, useFormContext } from 'react-hook-form';

interface ResumeBottomControllerProps {
  status: ResumeStatusKey;
  onSubmit: SubmitHandler<ResumeDetailForm>;
}

export default function ResumeBottomController({ status, onSubmit }: ResumeBottomControllerProps) {
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = useFormContext<ResumeDetailForm>();

  return (
    <S.ResumeBottomController>
      <div className="resume-bottom-controller">
        {status === 'DRAFT' && (
          <Button
            maxWidth="130px"
            height="40px"
            label="작성완료"
            variant="primary"
            disabled={false}
            type="button"
            onClick={handleSubmit(onSubmit)}
            isLoading={isSubmitting}
          />
        )}

        {status === 'PUBLISH' && (
          <Button
            maxWidth="130px"
            height="40px"
            label="수정하기"
            variant="primary"
            disabled={false}
            type="button"
            onClick={handleSubmit(onSubmit)}
            isLoading={isSubmitting}
          />
        )}
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

import styled from 'styled-components';
import Button from '@/components/common/style/Button';
import { ResumeDetailForm } from '@/types';
import { SubmitHandler, useFormContext } from 'react-hook-form';
import { useResumeContext } from '@/context/ResumeProvider';
import { QueryObserverResult, RefetchOptions } from '@tanstack/react-query';
import { GetResumeDetailResponse } from '@/types/API';
import { AxiosError } from 'axios';
interface ResumeBottomControllerProps {
  onSubmit: SubmitHandler<ResumeDetailForm>;
  refetch: (options?: RefetchOptions) => Promise<QueryObserverResult<GetResumeDetailResponse, AxiosError<unknown, any>>>;
}

export default function ResumeBottomController({ onSubmit, refetch }: ResumeBottomControllerProps) {
  const { isEditing, setIsEditing, resumeStatus } = useResumeContext();

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = useFormContext<ResumeDetailForm>();

  return (
    <S.ResumeBottomController>
      <div className="resume-bottom-controller">
        {isEditing && resumeStatus === 'PUBLISH' && (
          <Button
            maxWidth="150px"
            height="45px"
            margin="0 30px 0 0"
            label="수정취소"
            variant="secondary"
            disabled={false}
            type="button"
            onClick={() => refetch()}
            borderRadius="8px"
            fontSize="18px"
          />
        )}

        {isEditing && (
          <Button
            maxWidth="150px"
            height="45px"
            label="작성완료"
            variant="primary"
            disabled={false}
            type="button"
            onClick={handleSubmit(onSubmit)}
            isLoading={isSubmitting}
            borderRadius="8px"
            fontSize="18px"
          />
        )}

        {!isEditing && (
          <>
            <Button
              maxWidth="150px"
              height="45px"
              label="수정하기"
              variant="update"
              disabled={false}
              type="button"
              onClick={() => setIsEditing(true)}
              borderRadius="8px"
              fontSize="18px"
            />
          </>
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
    height: 75px;
    border-top: 1px solid rgba(0, 0, 0, 0.07);
    background-color: rgba(255, 255, 255, 0.7);
    backdrop-filter: saturate(150%) blur(32px);
    ${(props) => props.theme.media.tablet`
      padding-bottom: 10px;
    `};

    /* &::after {
      content: '';
      position: absolute;
      top: -20px;
      left: 0;
      right: 0;
      height: 20px;
      background: linear-gradient(rgba(255, 255, 255, 0), #fff);
      z-index: 1;
    } */
    .resume-bottom-controller {
      height: 100%;
      max-width: 1070px;
      width: 100%;
      margin: 0 auto;
      /* border: 1px solid red; */
      display: flex;
      align-items: center;
      justify-content: flex-end;
      ${(props) => props.theme.media.laptop`
        padding: 0 15px;
      `};
    }
  `,
  UpdateTime: styled.span`
    padding-top: 15px;
    margin-right: 15px;
    font-size: 13px;
    color: ${(props) => props.theme.colors.gray600};
  `,
};

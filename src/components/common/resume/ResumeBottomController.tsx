import styled from 'styled-components';
import Button from '@/components/common/style/Button';
import { ResumeDetailForm } from '@/types';
import { SubmitHandler, useFormContext } from 'react-hook-form';
import { useResumeContext } from '@/context/ResumeProvider';
import { QueryObserverResult, RefetchOptions } from '@tanstack/react-query';
import { GetResumeDetailResponse } from '@/types/API';
import { AxiosError } from 'axios';
import { dateFormat } from '@/utils';
interface ResumeBottomControllerProps {
  onSubmit: SubmitHandler<ResumeDetailForm>;
  updatedAt: Date;
  refetch: (options?: RefetchOptions) => Promise<QueryObserverResult<GetResumeDetailResponse, AxiosError<unknown, any>>>;
}

export default function ResumeBottomController({ onSubmit, updatedAt, refetch }: ResumeBottomControllerProps) {
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
            maxWidth="110px"
            height="40px"
            margin="0 15px 0 0"
            label="취소"
            variant="secondary"
            disabled={false}
            type="button"
            onClick={() => refetch()}
          />
        )}

        {isEditing && (
          <Button
            maxWidth="110px"
            height="40px"
            label="작성완료"
            variant="primary"
            disabled={false}
            type="button"
            onClick={handleSubmit(onSubmit)}
            isLoading={isSubmitting}
          />
        )}

        {!isEditing && (
          <>
            <S.UpdateTime>최근 수정일: {dateFormat.date(updatedAt, 'MM.DD HH:mm')}</S.UpdateTime>
            <Button
              maxWidth="110px"
              height="40px"
              label="수정하기"
              variant="update"
              disabled={false}
              type="button"
              onClick={() => setIsEditing(true)}
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
  UpdateTime: styled.span`
    padding-top: 15px;
    margin-right: 15px;
    font-size: 13px;
    color: ${(props) => props.theme.colors.gray600};
  `,
};

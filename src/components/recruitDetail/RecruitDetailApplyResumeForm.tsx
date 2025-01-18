import React from 'react';
import styled, { css } from 'styled-components';
import Button from '@/components/common/style/Button';
import Icon from '@/icons/Icon';
import { Get } from '@/apis';
import useFetchQuery from '@/hooks/useFetchQuery';
import queryKeys from '@/constants/queryKeys';
import useAuth from '@/hooks/useAuth';
import { dateFormat } from '@/utils';
import IconDimmed from '@/components/common/IconDimmed';
import { ResumeStatusKey } from '@/types';

interface RecruitDetailApplyResumeFormProps {
  isOpenApplyForm: boolean;
  setIsOpenApplyForm: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function RecruitDetailApplyResumeForm({ isOpenApplyForm, setIsOpenApplyForm }: RecruitDetailApplyResumeFormProps) {
  const [selectedResume, setSelectedResume] = React.useState<string | null>(null);
  const { isAuthenticated, isAuthIdle } = useAuth();

  const { data, isLoading, isSuccess } = useFetchQuery({
    queryKey: [queryKeys.AVAILABLE_RESUME_LIST],
    queryFn: Get.getAvailableResumeList,
    options: {
      enabled: isAuthenticated,
      staleTime: 1000 * 60 * 5,
      gcTime: 1000 * 60 * 10,
    },
  });

  console.log('지원가능한 이력서 리스트 API : ', data);

  const handleClickResumeItem = (resumeId: string, status: ResumeStatusKey) => {
    if (status !== 'PUBLISH') return;
    setSelectedResume((prev) => (prev === resumeId ? null : resumeId));
  };

  return (
    <S.RecruitDetailApplyResumeForm>
      <div className="header">
        <IconDimmed className="arrow-icon" width="30px" height="30px">
          <Icon name="ArrowLeft24x24" onClick={() => setIsOpenApplyForm(false)} width="24px" height="24px" />
        </IconDimmed>
        <h5 className="header__title">지원하기</h5>
      </div>

      <div className="content">
        {/* TODO - loading */}
        {isLoading && <div>loading</div>}
        {isSuccess && data && (
          <>
            {data.result.map((resume) => (
              <S.ResumeItem
                key={resume.id}
                $active={resume.status === 'PUBLISH'}
                $isSelected={selectedResume === resume.id}
                onClick={() => handleClickResumeItem(resume.id, resume.status)}
              >
                <h6>{resume.title}</h6>
                <div className="meta">
                  {resume.isDefault && <span className="meta__default">기본 이력서</span>}
                  {resume.status === 'DRAFT' && <span>작성중</span>}
                  <span>수정일 {dateFormat.date5(resume.updatedAt)}</span>
                </div>
              </S.ResumeItem>
            ))}
          </>
        )}
      </div>
      <div className="bottom">
        <Button label="제출하기" variant="primary" height="40px" disabled={!selectedResume} />
      </div>
    </S.RecruitDetailApplyResumeForm>
  );
}

const S = {
  RecruitDetailApplyResumeForm: styled.div`
    border: 1px solid ${(props) => props.theme.colors.gray300};
    border-radius: 10px;
    .header {
      position: relative;
      height: 50px;
      display: flex;
      justify-content: center;
      align-items: center;
      border-bottom: 1px solid ${(props) => props.theme.colors.gray300};
      .arrow-icon {
        position: absolute;
        left: 15px;
      }
      &__title {
        font-size: 18px;
      }
    }
    .content {
      padding: 15px 15px 0 15px;
      max-height: 300px;
      overflow-y: auto;
    }
    .bottom {
      padding: 15px;
    }
  `,
  ResumeItem: styled.div<{ $active: boolean; $isSelected: boolean }>`
    border: 1px solid red;
    margin-bottom: 10px;
    border-radius: 10px;
    padding: 15px;
    cursor: pointer;
    border: 1px solid ${(props) => props.theme.colors.gray300};
    .meta {
      height: 20px;
      margin-top: 10px;
      display: flex;
      align-items: center;
      font-size: 12px;
      color: ${(props) => props.theme.colors.gray600};
      span {
        margin-right: 8px;
      }
      &__default {
        display: inline-block;
        padding: 0 5px;
        color: ${(props) => props.theme.colors.blue800};
        background-color: ${(props) => props.theme.colors.blue50};
        height: 18px;
        display: flex;
        align-items: center;
        border-radius: 3px;
      }
    }
    &:last-child {
      margin-bottom: 0;
    }

    ${(props) =>
      props.$active === false &&
      css`
        background-color: ${(props) => props.theme.colors.gray100};
        opacity: 0.9;
        cursor: default;
      `};

    ${(props) =>
      props.$isSelected &&
      css`
        background-color: ${(props) => props.theme.colors.blue};
        border: 1px solid ${(props) => props.theme.colors.blue300};
      `};
  `,
};

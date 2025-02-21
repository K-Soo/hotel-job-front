import styled from 'styled-components';
import Button from '@/components/common/style/Button';
import Icon from '@/icons/Icon';
import IconHover from '@/components/common/IconHover';
import { motion } from 'framer-motion';
import { ResumeListItem, ResumeLstItemApplications } from '@/types';
import { useRouter } from 'next/router';
import path from '@/constants/path';
import Tag from '@/components/common/Tag';

interface ResumeCardProps {
  item: ResumeListItem;
  handleClickRemoveResume: (resume: ResumeListItem) => void;
  handleClickSelectedApplications: (applications: ResumeLstItemApplications[]) => void;
}

// TODO - 지원내역 모달 추가
export default function ResumeCard({ item, handleClickRemoveResume, handleClickSelectedApplications }: ResumeCardProps) {
  const router = useRouter();

  return (
    <S.ResumeCard>
      <S.TopContent>
        <h4 className="title" onClick={() => router.push(`${path.USER_RESUME}/${item.id}`)}>
          {item.title}
        </h4>
        <IconHover
          onClick={(event) => {
            event.stopPropagation();
            handleClickRemoveResume(item);
          }}
        >
          <Icon name="Dots24x24" width="18px" height="18px" style={{ transform: 'rotate(90deg)', color: '#555' }} />
        </IconHover>
      </S.TopContent>

      <S.BottomContent>
        <div className="tags">
          {item.status !== 'DRAFT' && <Tag label="미완성" type="DRAFT" fontSize="13px" margin="0 5px 0 0" />}
          {item.isDefault && <Tag label="기본 이력서" type="DEFAULT_RESUME" fontSize="13px" />}
        </div>

        {item.applicationsCount !== 0 && (
          <button className="history" onClick={() => handleClickSelectedApplications(item.applications)}>
            입사 지원내역 {item.applicationsCount}건
          </button>
        )}
      </S.BottomContent>
    </S.ResumeCard>
  );
}

const S = {
  ResumeCard: styled(motion.div)`
    border: 1px solid ${({ theme }) => theme.colors.gray200};
    color: ${({ theme }) => theme.colors.gray500};
    border-radius: 15px;
    padding: 15px;
    min-height: 120px;
    margin-bottom: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    &:last-child {
      margin-bottom: 0;
    }
    &:hover {
      border: 1px solid ${({ theme }) => theme.colors.gray300};
    }
  `,
  TopContent: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    .title {
      cursor: pointer;
      font-size: 18px;
      font-weight: 500;
      color: ${(props) => props.theme.colors.black400};
      font-size: 16px;
      ${(props) => props.theme.media.mobile`
        text-overflow: ellipsis;
        word-break: break-all;
        white-space: nowrap;
        overflow: hidden;
        max-width: 230px;
      `};
      &:hover {
        text-decoration: underline;
        color: ${(props) => props.theme.colors.black100};
      }
    }
  `,
  BottomContent: styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    .tags {
      display: flex;
      align-items: center;
    }
    .history {
      cursor: pointer;
      font-size: 13px;
      &:hover {
        text-decoration: underline;
        color: ${(props) => props.theme.colors.black100};
      }
    }
  `,
};

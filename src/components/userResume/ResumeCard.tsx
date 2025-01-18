import styled from 'styled-components';
import Button from '@/components/common/style/Button';
import Icon from '@/icons/Icon';
import IconDimmed from '@/components/common/IconDimmed';
import { motion } from 'framer-motion';
import { ResumeListItem } from '@/types';
import { useRouter } from 'next/router';
import path from '@/constants/path';

interface ResumeCardProps {
  item: ResumeListItem;
  handleClickRemoveResume: (resume: ResumeListItem) => void;
}

// TODO - 지원내역 모달 추가
export default function ResumeCard({ item, handleClickRemoveResume }: ResumeCardProps) {
  const router = useRouter();

  return (
    <S.ResumeCard>
      <div className="top">
        <div>
          {item.isDefault && <span className="top__default">기본이력서</span>}
          {item.status === 'DRAFT' && <span className="top__draft">미완성</span>}
        </div>

        <IconDimmed
          onClick={(event) => {
            event.stopPropagation();
            handleClickRemoveResume(item);
          }}
        >
          <Icon name="Dots24x24" width="18px" height="18px" />
        </IconDimmed>
      </div>
      <h4 className="title" onClick={() => router.push(`${path.USER_RESUME}/${item.id}`)}>
        {item.title}
      </h4>
      <div className="summary">
        {/* <p className="summary__text">경력 총 3년</p> */}
        {/* <p className="summary__text">희망지역 서울 강남구</p> */}
      </div>
      <div className="bottom">
        <button className="bottom__history">입사지원내역 {item.applicationsCount}건</button>
        <Button label="복사" variant="tertiary" width="70px" height="30px" fontSize="14px" onClick={() => alert('복사')} />
      </div>
    </S.ResumeCard>
  );
}

const S = {
  ResumeCard: styled(motion.div)`
    height: auto;
    border: 1px solid ${({ theme }) => theme.colors.gray200};
    color: ${({ theme }) => theme.colors.gray500};
    border-radius: 15px;
    margin: 10px 0;
    padding: 15px;
    user-select: none;
    &:hover {
      border: 1px solid ${({ theme }) => theme.colors.gray300};
    }
    .top {
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 13px;
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
      &__draft {
        color: ${(props) => props.theme.colors.red300};
      }
    }
    .title {
      cursor: pointer;
      font-size: 18px;
      font-weight: 400;
      color: ${(props) => props.theme.colors.black400};
      margin-bottom: 15px;
      &:hover {
        text-decoration: underline;
        color: ${(props) => props.theme.colors.black100};
      }
    }
    .summary {
      font-size: 13px;
      &__text {
        padding-bottom: 3px;
      }
      :last-child {
        padding-bottom: 0;
      }
    }
    .bottom {
      margin-top: 15px;
      justify-content: space-between;
      display: flex;
      align-items: center;
      &__history {
        font-size: 14px;
        cursor: pointer;
        &:hover {
          text-decoration: underline;
          color: ${({ theme }) => theme.colors.black400};
        }
      }
    }
  `,
};

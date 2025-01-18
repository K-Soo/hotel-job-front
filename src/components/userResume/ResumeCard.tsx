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
}

export default function ResumeCard({ item }: ResumeCardProps) {
  const router = useRouter();

  return (
    <S.ResumeCard onClick={() => router.push(`${path.USER_RESUME}/${item.id}`)}>
      <div className="top">
        <div>
          {item.isDefault && <span>기본이력서</span>}
          <span>{item.status}</span>
        </div>

        <IconDimmed
          onClick={(event) => {
            event.stopPropagation();
          }}
        >
          <Icon name="Dots24x24" width="18px" height="18px" />
        </IconDimmed>
      </div>
      <h4 className="title">{item.title}</h4>
      <div className="summary">
        <span>경력 총 3년</span>
        <span>희망연봉: 3년</span>
        <span>희망지역 서울 강남구</span>
      </div>
      <div className="bottom">
        <span>입사지원내역 5건</span>
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
    cursor: pointer;
    user-select: none;
    &:hover {
      border: 1px solid ${({ theme }) => theme.colors.gray300};
    }
    .top {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 5px;
      font-size: 13px;
    }
    .title {
      font-size: 16px;
      font-weight: 400;
      color: ${(props) => props.theme.colors.black400};
      margin-bottom: 15px;
    }
    .summary {
      font-size: 14px;
    }
    .bottom {
      margin-top: 15px;
      justify-content: space-between;
      display: flex;
      align-items: center;
    }
  `,
};

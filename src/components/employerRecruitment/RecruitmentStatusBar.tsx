import styled from 'styled-components';
import { motion } from 'framer-motion';
import { recruitmentStatusTabOptions } from '@/constants/tabs';
import Button from '@/components/common/style/Button';
import path from '@/constants/path';
import { useRouter } from 'next/router';

interface RecruitmentStatusBarProps {}

export default function RecruitmentStatusBar({}: RecruitmentStatusBarProps) {
  const router = useRouter();

  const handleTabClick = (newStatus: string) => {
    const searchParams = new URLSearchParams(router.query as Record<string, string>);

    if (newStatus === 'all') {
      searchParams.delete('status');
    } else {
      searchParams.set('status', newStatus);
    }

    router.replace({
      pathname: router.pathname,
      query: Object.fromEntries(searchParams),
    });
  };

  return (
    <S.RecruitmentStatusBar>
      <div className="tabs">
        {recruitmentStatusTabOptions.map((element) => (
          <motion.button
            className="tabs__item"
            key={element.value}
            whileTap={{ scale: 0.9 }}
            whileHover={{}}
            onClick={() => handleTabClick(element.value)}
          >
            <span>{element.label}</span>
            <span>1</span>
          </motion.button>
        ))}
      </div>
      <Button
        label="공고 생성"
        variant="primary"
        width="80px"
        height="35px"
        fontSize="14px"
        onClick={() => router.push(path.EMPLOYER_RECRUITMENT_REGISTER)}
      />
    </S.RecruitmentStatusBar>
  );
}

const S = {
  RecruitmentStatusBar: styled.div`
    margin-bottom: 30px;
    border-bottom: 1px solid ${(props) => props.theme.colors.gray500};
    display: flex;
    align-items: center;
    justify-content: space-between;
    .tabs {
      display: flex;
      height: 50px;
      width: fit-content;
      &__item {
        cursor: pointer;
        padding: 0 20px;
        font-size: 16px;
        color: ${(props) => props.theme.colors.gray700};
      }
    }
  `,
};

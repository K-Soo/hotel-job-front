import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';

interface CreateResumeButtonProps {
  margin?: string;
  type: 'new' | 'file';
  handleClickCreateResumeButton: () => void;
}

export default function CreateResumeButton({ margin, type, handleClickCreateResumeButton }: CreateResumeButtonProps) {
  const router = useRouter();

  return (
    <S.CreateResumeButton
      $margin={margin}
      initial={{ opacity: 1, backgroundColor: '#f9fafb' }}
      onClick={handleClickCreateResumeButton}
      whileHover={{
        backgroundColor: '#f2f4f6',
        border: '1px solid #d1d6db',
      }}
    >
      <h3>{type === 'new' ? '새 이력서 작성' : '파일로 이력서 작성'}</h3>
    </S.CreateResumeButton>
  );
}

const S = {
  CreateResumeButton: styled(motion.button)<{ $margin?: string }>`
    border: 1px solid ${({ theme }) => theme.colors.gray200};
    color: ${({ theme }) => theme.colors.gray500};
    margin: ${({ $margin }) => $margin || '0'};
    width: 100%;
    height: 80px;
    border-radius: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 400;
    /* background-color: ${({ theme }) => theme.colors.gray}; */
    cursor: pointer;
    ${(props) => props.theme.media.tablet`
    `};
  `,
};

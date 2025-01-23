import styled from 'styled-components';
import Icon from '@/icons/Icon';
import { useRouter } from 'next/router';
import path from '@/constants/path';
import { motion } from 'framer-motion';

export default function ResumePrevuesNavigation() {
  const router = useRouter();

  return (
    <S.ResumePrevuesNavigation
      onClick={() => router.push(path.USER_RESUME)}
      whileHover={{
        color: '#2272eb',
      }}
    >
      <Icon name="ArrowLeft24x24" width="16px" height="16px" />
      <div className="back-title">이력서 목록</div>
    </S.ResumePrevuesNavigation>
  );
}

const S = {
  ResumePrevuesNavigation: styled(motion.div)`
    height: 35px;
    display: flex;
    align-items: center;
    font-size: 16px;
    color: ${(props) => props.theme.colors.black500};
    margin-bottom: 5px;
    font-weight: 300;
    width: fit-content;
    cursor: pointer;
    .back-title {
      padding-left: 5px;
    }
    ${(props) => props.theme.media.tablet`
      display: none;
    `}
  `,
};

import styled from 'styled-components';
import { motion } from 'framer-motion';

interface IconDimmedProps {
  children: React.ReactNode;
}

export default function IconDimmed({ children }: IconDimmedProps) {
  return <S.IconDimmed whileTap={{ scale: 0.95 }}>{children}</S.IconDimmed>;
}

const S = {
  IconDimmed: styled(motion.span)`
    display: inline-block;
    border-radius: 50%;
    padding: 4px;
    justify-content: center;
    align-items: center;
    font-size: 0;
    background-color: rgba(242, 244, 246, 0.8);
    &:hover {
      background-color: rgba(242, 244, 246, 1);
      background-color: ${(props) => props.theme.colors.gray200};
    }
  `,
};

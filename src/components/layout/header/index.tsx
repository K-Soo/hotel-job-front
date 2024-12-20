import styled from 'styled-components';

import { motion, useScroll } from 'framer-motion';

interface HeaderProps {
  children: React.ReactNode;
}

export function Header({ children }: HeaderProps) {
  const { scrollYProgress, scrollX, scrollY } = useScroll();

  return <S.Header initial={{ borderBottom: '0px solid transparent' }}>{children}</S.Header>;
}

const S = {
  Header: styled(motion.header)`
    position: sticky;
    top: -40px;
    background-color: rgba(255, 255, 255);
    box-shadow: 0 1px 0 0 rgba(0, 0, 0, 0.1);
    ${(props) => props.theme.media.tablet`
      top: 0;
      padding: 0 15px;
    `};
  `,
};

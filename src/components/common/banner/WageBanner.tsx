import styled from 'styled-components';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function WageBanner() {
  const handleClick = () => {
    window.open('https://www.minimumwage.go.kr/main.do', '_blank', 'noopener,noreferrer');
  };

  return (
    <motion.article
      whileTap={{ scale: 0.99 }}
      className="relative hidden flex-1 shrink-0 grow-1 basis-[200px] cursor-pointer overflow-hidden rounded-[20px] md:flex"
      style={{ backgroundColor: '#BFE6EB' }}
      onClick={() => handleClick()}
    >
      <Image className="scale-80 object-contain" src="/images/wage.png" fill alt="wage" priority />
    </motion.article>
  );
}

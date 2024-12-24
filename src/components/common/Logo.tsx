import styled, { css } from 'styled-components';
import { Roboto } from 'next/font/google';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import path from '@/constants/path';

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['900'],
  style: ['italic'],
});

interface LogoProps {
  size: 'large' | 'middle' | 'small';
  margin?: string;
  style?: React.CSSProperties;
}

export default function Logo({ size, margin, style }: LogoProps) {
  const router = useRouter();

  return (
    <S.Logo
      className={roboto.className}
      whileTap={{ scale: 0.99 }}
      onClick={() => router.push(path.HOME)}
      size={size}
      $margin={margin}
      style={style}
    >
      <span className="hotel-word">HOTEL</span>
      <span className="job-word">JOB</span>
    </S.Logo>
  );
}

const S = {
  Logo: styled(motion.article)<{ size: 'large' | 'middle' | 'small'; $margin?: string }>`
    margin: ${(props) => (props.$margin ? props.$margin : '0')};
    width: fit-content;
    display: flex;
    align-items: center;
    height: auto;
    user-select: none;
    cursor: pointer;
    .hotel-word {
      color: #68a4ee;
    }
    .job-word {
      padding-left: 4px;
      color: #1663c0;
    }
    ${(props) =>
      props.size === 'large' &&
      css`
        font-size: 54px;
      `};
    ${(props) =>
      props.size === 'middle' &&
      css`
        font-size: 34px;
      `};

    ${(props) =>
      props.size === 'small' &&
      css`
        font-size: 24px;
      `};
  `,
};

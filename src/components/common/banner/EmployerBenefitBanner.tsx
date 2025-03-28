import React from 'react';
import path from '@/constants/path';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';

export default function EmployerBenefitBanner() {
  const router = useRouter();

  return (
    <motion.article
      whileTap={{ scale: 0.99 }}
      initial={{
        background: 'linear-gradient(to right, #4593fc, #1b64da)',
      }}
      whileHover={{
        background: 'linear-gradient(to right, #4593fc, #1053be)',
      }}
      className="flex max-h-[90px] min-h-[90px] flex-1 cursor-pointer rounded-[15px] p-6 align-middle"
      onClick={() => router.push(path.LANDING_EMPLOYER)}
    >
      <div className="flex flex-col justify-center text-white">
        <p className="leading-5">첫 채용 공고 등록 무료! 🎁</p>
        <p className="text-[18px] leading-6">업체회원 가입하고 혜택을 누리세요.</p>
      </div>
    </motion.article>
  );
}

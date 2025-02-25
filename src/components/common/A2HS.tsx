import React from 'react';
import styled from 'styled-components';
import useA2HS from '@/hooks/useA2HS';
import { motion } from 'framer-motion';
import Portal from '@/components/common/Portal';
import Background from '@/components/common/Background';
import Button from '@/components/common/style/Button';
import Image from 'next/image';
import Icon from '@/icons/Icon';

const TWENTY_FOUR_HOURS_IN_MILLISECONDS = 24 * 60 * 60 * 1000; // 24시간

/**
 * @description mobile only - beforeinstallprompt ios 미지원
 */
export default function A2HS() {
  const [visiblePopUp, setVisiblePopUp] = React.useState<'IDLE' | 'ON' | 'OFF'>('IDLE');

  const { deferredPrompt, installApp, clearPrompt } = useA2HS();

  React.useEffect(() => {
    if (!globalThis?.localStorage) return;

    const existPopUp = globalThis.localStorage.getItem('popUp');

    if (!existPopUp) {
      return setVisiblePopUp('ON');
    }

    const expirationTime = Number(existPopUp);

    // sessionStorage의 value값이 올비르지않다면
    if (isNaN(Number(existPopUp))) {
      localStorage.removeItem('popUp');
      return setVisiblePopUp('ON');
    }

    //X버튼을 누르고 현재 시간보다 24시간 초과된 경우 팝업 활성화
    if (Date.now() > expirationTime) {
      localStorage.removeItem('existPopUp');
      return setVisiblePopUp('ON');
    }

    return setVisiblePopUp('OFF');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCloseToday = () => {
    const expirationTime = Date.now() + TWENTY_FOUR_HOURS_IN_MILLISECONDS;
    localStorage.setItem('popUp', expirationTime.toString());
    clearPrompt();
    return setVisiblePopUp('OFF');
  };

  if (deferredPrompt && visiblePopUp === 'ON') {
    return (
      <Portal>
        <Background>
          <S.A2HS initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="content-box">
              <Icon className="content-box__icon" name="CloseA24x24" width="28px" height="28px" onClick={() => clearPrompt()} />
              <Image className="content-box__image" src="/icons/icon-48x48.png" alt="icon" width={48} height={48} />
              <p className="content-box__text">
                홈 화면에
                <strong> 호텔잡 앱</strong>
                <span> 추가하고</span>
                <br />
                <span>다양한 혜택을 받아보세요.</span>
              </p>
            </div>
            <div className="button-box">
              <Button label="설치없이 앱으로 열기" variant="primary" borderRadius="30px" onClick={() => installApp()} fontSize="16px" />
              <button className="button-box__close" onClick={() => handleCloseToday()}>
                오늘은 그냥 볼게요
              </button>
            </div>
          </S.A2HS>
        </Background>
      </Portal>
    );
  }
}

const S = {
  A2HS: styled(motion.div)`
    z-index: 20;
    position: fixed;
    bottom: 15px;
    left: 50%;
    width: 100%;
    max-width: 90%;
    transform: translateX(-50%);
    background-color: white;
    border-radius: 30px;
    padding: 15px 20px;
    display: flex;
    flex-direction: column;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    .content-box {
      flex: 1;
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-bottom: 20px;
      &__icon {
        position: absolute;
        right: 0;
      }
      &__image {
        border-radius: 10px;
        position: relative;
        border: 1px solid ${({ theme }) => theme.colors.gray300};
        margin: 15px 0;
      }
      &__title {
        font-size: 20px;
        font-weight: 500;
      }
      &__text {
        text-align: center;
        line-height: 1.3;
        font-size: 18px;
        strong {
          font-weight: 600;
        }
      }
    }
    .button-box {
      display: flex;
      flex-direction: column;
      align-items: center;
      &__close {
        height: 35px;
        font-size: 16px;
        text-decoration: underline;
        color: ${({ theme }) => theme.colors.gray500};
        margin-top: 10px;
        width: 100%;
        text-align: center;
        border-radius: 30px;
      }
    }
  `,
};

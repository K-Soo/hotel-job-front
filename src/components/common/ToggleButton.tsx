import styled, { css } from 'styled-components';
import { motion, useAnimationControls } from 'framer-motion';
import React from 'react';

interface ToggleButtonProps {}

export default function ToggleButton({}: ToggleButtonProps) {
  const [isOn, setIsOn] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const controls = useAnimationControls();
  const controlsText = useAnimationControls();

  const handleClickToggle = () => {
    setIsOn((prev) => !prev);

    controls.start({
      x: isOn ? 0 : 28,
      transition: { type: 'spring', stiffness: 300, damping: 30 },
    });
  };

  React.useEffect(() => {
    const position = isOn ? 0 : 0;
    controlsText.start({
      x: position,
      transition: { type: 'spring', stiffness: 300, damping: 30 },
    });
  }, [isOn]);

  return (
    <S.ToggleButton $isOn={isOn}>
      <motion.div className="toggle-button-container" onClick={handleClickToggle}>
        <motion.span className="toggle-button-text" animate={controlsText}>
          {isOn ? 'ON' : 'OFF'}
        </motion.span>
        <S.Toggle
          // dragConstraints={{ left: 0, right: 0 }}
          // transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          animate={controls}
          // $backgroundColor={backgroundColor}
          // $fontColor={fontColor}
        ></S.Toggle>
      </motion.div>
    </S.ToggleButton>
  );
}

const S = {
  ToggleButton: styled.div<{ $isOn?: boolean }>`
    .toggle-button-text {
      top: 9px;
      left: 4px;
      position: absolute;
      font-size: 12px;
      z-index: 2;
      user-select: none;
    }
    .toggle-button-container {
      width: 60px;
      height: 30px;
      border-radius: 30px;
      background-color: ${(props) => props.theme.colors.blue100};
      position: relative;
      ${(props) => props.$isOn && css``};
    }
  `,
  Toggle: styled(motion.button)<{ $backgroundColor?: string; $fontColor?: string }>`
    top: 2px;
    left: 4px;
    position: absolute;
    background-color: ${(props) => props.theme.colors.white};
    z-index: 1;
    height: 25px;
    width: 25px;
    /* display: flex; */
    align-items: center;
    justify-content: center;
    border-radius: 50%;
  `,
};

import styled from 'styled-components';
import { motion, useAnimationControls } from 'framer-motion';
import React from 'react';

export function EmployerAside() {
  const [isExpanded, setIsExpanded] = React.useState(true);
  const asideRef = React.useRef<HTMLElement>(null);
  const controls = useAnimationControls();

  const handleClickResize = () => {
    setIsExpanded((prev) => !prev);
    controls.start({
      width: isExpanded ? 55 : 220,
      transition: { type: 'spring', stiffness: 300, damping: 30 },
    });
  };

  return (
    <S.EmployerAside ref={asideRef} animate={controls} initial={{ width: '220px' }}>
      <button onClick={handleClickResize}>X</button>
      <S.MenuItem>
        <div>icon</div>
        <div>내용</div>
        <div>icon</div>
      </S.MenuItem>
    </S.EmployerAside>
  );
}

const S = {
  EmployerAside: styled(motion.aside)`
    border-right: 1px solid ${(props) => props.theme.colors.gray200};
    padding: 15px;
  `,
  MenuItem: styled.div`
    display: flex;
    overflow: hidden;
    flex-wrap: nowrap;
    white-space: nowrap;
  `,
};

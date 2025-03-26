import React from 'react';
import styled from 'styled-components';
import { useInView } from 'react-intersection-observer';

interface BasicItemWrapperProps {
  index: number;
  onInView: (index: number) => void;
  setCurrentIndex: React.Dispatch<React.SetStateAction<number>>;
  children: React.ReactNode;
}

const BasicItemWrapper = React.forwardRef<HTMLDivElement, BasicItemWrapperProps>(({ index, onInView, setCurrentIndex, children }, ref) => {
  const { ref: inViewRef, inView } = useInView({
    threshold: 0.5,
    triggerOnce: true,
  });

  const { ref: innerRef, inView: innerInView } = useInView({
    threshold: 0.5,
    triggerOnce: false,
  });

  const combinedRef = React.useCallback(
    (el: HTMLDivElement) => {
      if (typeof ref === 'function') ref(el);
      else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = el;

      inViewRef(el);
    },
    [ref, inViewRef],
  );

  React.useEffect(() => {
    if (innerInView) {
      setCurrentIndex((prev) => (prev !== index ? index : prev));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [innerInView]);

  React.useEffect(() => {
    if (inView) {
      onInView(index);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  return (
    <S.BasicItemWrapper ref={combinedRef}>
      <div ref={innerRef}>{children}</div>
    </S.BasicItemWrapper>
  );
});

BasicItemWrapper.displayName = 'BasicItemWrapper';

export default BasicItemWrapper;

const S = {
  BasicItemWrapper: styled.div`
    flex-shrink: 0;
    scroll-snap-align: center;
    width: calc(100%);
    cursor: grab;
    text-align: center;
  `,
};

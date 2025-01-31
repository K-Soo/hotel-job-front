import React from 'react';
import styled from 'styled-components';
import ScrollContainer from 'react-indiana-drag-scroll';

interface DragScrollProps {
  children: React.ReactNode;
}

const DragScroll = React.forwardRef<HTMLElement, DragScrollProps>(({ children }, ref) => {
  return (
    <StyledScrollContainer innerRef={ref} ignoreElements=".ignore-scroll">
      {children}
    </StyledScrollContainer>
  );
});

export default DragScroll;

const StyledScrollContainer = styled(ScrollContainer)`
  width: 100%;
  cursor: grab;
  scroll-behavior: smooth;
  display: flex;
`;

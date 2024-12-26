import styled from 'styled-components';
import ScrollContainer from 'react-indiana-drag-scroll';

interface DragScrollProps {
  children: React.ReactNode;
}

export default function DragScroll({ children }: DragScrollProps) {
  return <StyledScrollContainer ignoreElements=".ignore-scroll">{children}</StyledScrollContainer>;
}

const StyledScrollContainer = styled(ScrollContainer)`
  cursor: grab;
  display: flex;
`;

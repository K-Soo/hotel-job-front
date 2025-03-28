import styled from 'styled-components';

interface ContentPanelProps {
  children: React.ReactNode;
}

export default function ContentPanel({ children }: ContentPanelProps) {
  return <S.ContentPanel>{children}</S.ContentPanel>;
}

const S = {
  ContentPanel: styled.article`
    margin: 0 auto;
    max-width: 1024px;
    padding: 35px 0;
  `,
};

import styled from "styled-components";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return <S.Layout>{children}</S.Layout>;
}

const S = {
  Layout: styled.div``,
};

import styled from "styled-components";
export { Footer } from "@/components/layout/footer";
export { Main } from "@/components/layout/main";
export { Header } from "@/components/layout/header";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return <S.Layout>{children}</S.Layout>;
}

const S = {
  Layout: styled.div`
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    width: 100%;
  `,
};

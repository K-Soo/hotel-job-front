import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import Layout, { Header, Footer, Main } from "@/components/layout";

export default function HomePage() {
  return <></>;
}

HomePage.getLayout = (page: React.ReactElement) => {
  return (
    <Layout>
      <Header />
      <Main>{page}</Main>
      <Footer />
    </Layout>
  );
};

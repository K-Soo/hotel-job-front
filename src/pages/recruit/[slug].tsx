import { Get } from '@/apis';
import Layout, { Header, Footer, Main, DesktopNavigation, MobileNavigation } from '@/components/layout';
import queryKeys from '@/constants/queryKeys';
import RecruitDetailContainer from '@/containers/recruitDetailContainer';
import { QueryClient } from '@tanstack/react-query';
import { GetStaticPaths, GetStaticPropsContext } from 'next';
import path from '@/constants/path';

// TODO  - SEO 작업
export default function RecruitDetailPage() {
  return <RecruitDetailContainer />;
}

RecruitDetailPage.getLayout = (page: React.ReactElement) => {
  return (
    <Layout>
      <Header>
        <DesktopNavigation />
        <MobileNavigation backIcon backUrl={path.RECRUIT} />
      </Header>
      <Main>{page}</Main>
      <Footer />
    </Layout>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  };
};

// TODO - return response data
export const getStaticProps = async (context: GetStaticPropsContext) => {
  const queryClient = new QueryClient();
  const { params } = context;
  const recruitId = params?.slug;

  try {
    if (!recruitId) {
      throw new Error();
    }
    const response = await queryClient.fetchQuery({
      queryKey: [queryKeys.RECRUIT_DETAIL, { slug: recruitId }],
      queryFn: () => Get.recruitDetail({ id: recruitId as string }),
    });

    console.log('getStaticProps - 채용상세 API : ', response);

    if (!response.success) {
      throw new Error();
    }

    return {
      props: {},
      revalidate: 60 * 10,
    };
  } catch (error: any) {
    console.error('getStaticProps - error: ', error?.message);
    return {
      notFound: true,
    };
  } finally {
    queryClient.clear();
  }
};

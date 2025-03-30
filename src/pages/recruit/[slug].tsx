import { Get } from '@/apis';
import Layout, { Header, Footer, Main, DesktopNavigation, MobileNavigation, ScrollToTop } from '@/components/layout';
import queryKeys from '@/constants/queryKeys';
import RecruitDetailContainer from '@/containers/recruitDetailContainer';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { GetStaticPaths, GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import path from '@/constants/path';
import { ErrorBoundary, ErrorComponent } from '@/error';
import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';
import SkeletonUI from '@/components/common/SkeletonUI';

export default function RecruitDetailPage(props: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter();

  if (router.isFallback) {
    return <SkeletonUI.RecruitmentDetail />;
  }

  const { hotel, title, recruitId } = props.seoData;

  return (
    <>
      <NextSeo
        title={`[${hotel}] ${title}`}
        canonical={`https://www.hotel-job-connect.com/recruit/${recruitId}`}
        openGraph={{
          title: `[${hotel}] ${title}`,
          url: `https://www.hotel-job-connect.com/recruit/${recruitId}`,
        }}
      />

      <HydrationBoundary state={props.dehydratedState}>
        <ErrorBoundary fallback={<ErrorComponent />}>
          <RecruitDetailContainer />
        </ErrorBoundary>
      </HydrationBoundary>
    </>
  );
}

RecruitDetailPage.getLayout = (page: React.ReactElement) => {
  return (
    <Layout>
      <Header>
        <DesktopNavigation />
        <MobileNavigation backIcon backUrl={path.RECRUIT} notificationIcon shareIcon />
      </Header>
      <Main>{page}</Main>
      <ScrollToTop />
      <Footer />
    </Layout>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const response = await Get.getProgressRecruitIds();

    if (!response) {
      throw new Error();
    }

    const paths = response.result.map((id) => ({ params: { slug: id } }));

    return {
      paths: paths,
      fallback: true,
    };
  } catch (error) {
    return {
      paths: [],
      fallback: true,
    };
  }
};

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

    if (!response.success) {
      throw new Error();
    }

    return {
      props: {
        dehydratedState: dehydrate(queryClient),
        seoData: {
          recruitId: response.result.id,
          hotel: response.result.hotelName,
          title: response.result.recruitmentTitle,
        },
      },
      revalidate: 60 * 5,
    };
  } catch (error: any) {
    console.error('getStaticProps - error: ', error?.message);
    return {
      notFound: true,
    };
  }
};

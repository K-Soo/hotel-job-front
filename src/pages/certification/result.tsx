import React from 'react';
import { GetServerSideProps, InferGetServerSidePropsType, GetServerSidePropsContext } from 'next';

export default function ResultCertificationPage({ data }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  console.log('props: ', data);

  React.useEffect(() => {
    if (data) {
      window.opener?.postMessage(JSON.stringify({ type: 'CERTIFICATION_RESULT', result: data }), '*');
      // 창 닫기
      window.close();
    }
  }, [data]);

  return <>result</>;
}

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
  const body = context.req;
  console.log('body: ', body);
  return {
    props: {
      data: body,
    },
  };
};

import React from 'react';
import { GetServerSideProps, InferGetServerSidePropsType, GetServerSidePropsContext } from 'next';
import { parseBody } from 'next/dist/server/api-utils/node/parse-body';

export default function ResultCertificationPage({ result }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  console.log('@@@@@@@@@@@@@@@: ', result);

  React.useEffect(() => {
    if (result) {
      window.opener?.postMessage(JSON.stringify({ type: 'CERTIFICATION_RESULT', result: result }), '*');
      // 창 닫기
      window.close();
    }
  }, [result]);

  return <>result</>;
}

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
  try {
    const body = await parseBody(context.req, '1mb');
    return {
      props: {
        result: body,
      },
    };
  } catch (error) {
    return {
      props: {
        result: null,
      },
    };
  }
};

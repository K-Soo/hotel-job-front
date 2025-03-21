import React from 'react';
import { GetServerSideProps, InferGetServerSidePropsType, GetServerSidePropsContext } from 'next';
import { parseBody } from 'next/dist/server/api-utils/node/parse-body';
import Image from 'next/image';
import environment from '@/environment';

export default function ResultCertificationPage({ result }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  React.useEffect(() => {
    if (!result) {
      window.parent?.postMessage(JSON.stringify({ type: 'CERTIFICATION_FAIL', payload: result }), environment.baseUrl);
      return;
    }

    window.parent?.postMessage(JSON.stringify({ type: 'CERTIFICATION_SUCCESS', payload: result }), environment.baseUrl);
  }, [result]);

  return (
    <section style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Image src="/images/spinner200px.gif" width={30} height={30} alt="loading" priority />
    </section>
  );
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

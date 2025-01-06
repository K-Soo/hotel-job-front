import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const body = req.body;

    console.log('body: ', body);

    // 성공 처리
    if (true) {
      console.log('인증 성공:');

      // 필요한 로직 추가 (예: 데이터베이스 저장)
      // await saveToDatabase({ result, message, additionalData });

      return res.status(200).json({ success: true, message: '본인 인증 성공' });
    }

    // 실패 처리
    // console.log('인증 실패:', message);
    // return res.status(400).json({ success: false, message: '본인 인증 실패' });
  }

  // 허용되지 않은 HTTP 메서드 처리
  res.setHeader('Allow', ['POST']);
  return res.status(405).end(`Method ${req.method} Not Allowed`);
}

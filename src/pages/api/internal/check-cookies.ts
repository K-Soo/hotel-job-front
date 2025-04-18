import { NextApiRequest, NextApiResponse } from 'next';
// import cookieParser from "cookie-parser";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const cookies = req.cookies;

    console.log('cookies@@@@: ', cookies);
    const isExistRefreshCookie = cookies['refresh_token'] ? true : false;
    res.status(200).json({ result: isExistRefreshCookie });
  } catch (error) {
    res.status(500).end();
  }
};

export default handler;

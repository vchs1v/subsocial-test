import { getToken } from 'next-auth/jwt';
import { NextApiRequest, NextApiResponse } from 'next';
import { Client } from 'twitter-api-sdk';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const twitterClient = new Client(token?.accessToken as string);
  const pagination_token =
    req.query.next_token === 'undefined'
      ? undefined
      : (req.query.next_token as string);

  try {
    const tweets = await twitterClient.tweets.usersIdTweets(
      req.query.id as string,
      { pagination_token },
    );
    res.status(200).json({ status: 'ok', data: tweets });
  } catch (e) {
    console.error(e);
    res.status(400).json({ status: 'error', error: e });
  }
};

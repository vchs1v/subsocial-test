import { NextApiRequest, NextApiResponse } from 'next';
import { IpfsContent } from '@subsocial/api/substrate/wrappers';
import { SubsocialApi, generateCrustAuthToken } from '@subsocial/api';
import { Keyring } from '@polkadot/keyring';

const mnemonic = process.env.POLKADOT_MNEMONIC as string;
const spaceId = process.env.SUBSOCIAL_SPACE_ID as string;

type TweetType = {
  id: string;
  text: string;
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const api = await SubsocialApi.create({
    substrateNodeUrl: 'wss://para.f3joule.space',
    ipfsNodeUrl: 'https://crustwebsites.net',
  });

  const authHeader = generateCrustAuthToken(mnemonic);
  api.ipfs.setWriteHeaders({
    authorization: 'Basic ' + authHeader,
  });

  const keyring = new Keyring({ type: 'sr25519' });
  const pair = keyring.addFromMnemonic(mnemonic);

  const tweets: TweetType[] = JSON.parse(req.body);

  try {
    const substrateApi = await api.blockchain.api;
    const cids = await Promise.all(
      tweets.map((tweet) =>
        api.ipfs.saveContent({
          title: `Tweet ${tweet.id}`,
          body: tweet.text,
        }),
      ),
    );

    const posts = cids.map((cid) =>
      substrateApi.tx.posts.createPost(
        spaceId,
        { RegularPost: null },
        IpfsContent(cid),
      ),
    );

    const batchTx = substrateApi.tx.utility.batch(posts);
    const txHash = await batchTx.signAndSend(pair);
    res.status(200).json({ status: 'ok', txHash });
  } catch (e) {
    console.error(e);
    res.status(400).json({ status: 'error', error: e });
  }
};

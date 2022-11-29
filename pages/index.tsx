import Head from 'next/head';
import Header from '@modules/header';
import PostsGrid from '@modules/posts-grid';

export default () => (
  <div className="container	mx-auto pb-6 px-4">
    <Head>
      <title>Twitter to Subsocial</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <Header />
    <PostsGrid />
  </div>
);

import Head from 'next/head';

import Posts from '@/components/posts/posts';
import { getAllPosts } from '@/lib/posts-util';

function AllPosts(props) {
  const { posts } = props;

  return (
    <>
      <Head>
        <title>All Posts</title>
        <meta name='description' content='All posts related to programming' />
      </Head>
      <Posts posts={posts} />
    </>
  );
}

export function getStaticProps() {
  const allPosts = getAllPosts();

  return {
    props: {
      posts: allPosts,
    },
  };
}

export default AllPosts;

import Head from 'next/head';

import PostContent from '@/components/posts/post-details/post-content';
import { getPostData, getPostsFiles } from '@/lib/posts-util';

function PostDetails({ post }) {
  return (
    <>
      <Head>
        <title>{post.title}</title>
        <meta name='description' content={post.excerpt} />
      </Head>
      <PostContent post={post} />
    </>
  );
}

export function getStaticProps({ params }) {
  const { slug } = params;

  const fileName = `${slug}.md`;

  const postData = getPostData(fileName);

  return {
    props: {
      post: postData,
    },
  };
}

export function getStaticPaths() {
  const fileNames = getPostsFiles();

  const slugs = fileNames.map((fileName) => ({
    params: { slug: fileName.replace(/\.md$/, '') },
  }));

  return {
    paths: slugs,
    fallback: false,
  };
}

export default PostDetails;

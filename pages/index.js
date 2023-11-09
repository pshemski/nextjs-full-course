import Head from 'next/head';
import Hero from '../components/home-page/hero';
import FeaturedPosts from '../components/home-page/featured-posts';
import { getFeaturedPosts } from '@/lib/posts-util';

export default function Home(props) {
  const { posts } = props;

  return (
    <>
      <Head>
        <title>Przemek's Blog</title>
        <meta
          name='description'
          content='This a blog about web development and programing'
        />
      </Head>
      <Hero />
      <FeaturedPosts posts={posts} />
    </>
  );
}

export function getStaticProps() {
  const featuredPosts = getFeaturedPosts();

  return {
    props: {
      posts: featuredPosts,
    },
  };
}

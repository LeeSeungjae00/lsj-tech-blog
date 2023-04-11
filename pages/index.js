import Head from 'next/head'
import utilStyles from '../styles/utils.module.css'
import { getSortedNotionPostsData } from '../lib/posts'
import { siteTitle } from './_document'
import PostCardUl from '@/components/PostCardUl'

export default function Home({ allPostsData }) {
  return (
    <>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>All Posts</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map((data) => (
            <PostCardUl {...data} key={data.id}></PostCardUl>
          ))}
        </ul>
      </section>
    </>
  )
}

export async function getStaticProps() {
  const allPostsData = await getSortedNotionPostsData()

  return {
    props: {
      allPostsData
    }
  }
}
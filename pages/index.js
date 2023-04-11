import Head from 'next/head'
import utilStyles from '../styles/utils.module.css'
import { getSortedFileSystemPostsData, getSortedNotionPostsData } from '../lib/posts'
import Link from 'next/link'
import Date from '../components/date'
import { siteTitle } from './_document'

export default function Home({ allPostsData }) {
  return (
    <>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>All Posts</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/post/${id}`}>
                {title}
              </Link>
              <br />
              <small className={utilStyles.lightText}>
                <Date dateString={date} />
              </small>
            </li>
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
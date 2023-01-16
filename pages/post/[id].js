import { getAllPostIds, getPostData } from '../../lib/posts'
import Head from 'next/head'
import Date from '@/components/date'
import utilStyles from '../../styles/utils.module.css'
import { MDXRemote } from 'next-mdx-remote'
import CodeBlock from '@/components/CodeBlock'
// import Button from '../../components/Button'
import dynamic from 'next/dynamic'
import { siteTitle } from 'pages/_document'

const Button = dynamic(() => import('@/components/Button'), {
  loading: () => <div>loading...</div>
})

//정적 SSG 를 하기 위해선 할 path 를 배열로 만들어야 하는데 그것을 하고 있음
export async function getStaticPaths() {
  const paths = getAllPostIds()
  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps({ params, preview }) {
  const postData = await getPostData(params.id)
  return {
    props: {
      postData
    }
  }
}



const components = { Button, CodeBlock }

export default function Post({ postData }) {
  return (
    <>
      <Head>
        <title>{postData.title} - {siteTitle}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={postData.date} />
        </div>
        {postData.contentHtml && <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />}
        {postData.mdxSource && <MDXRemote {...postData.mdxSource} components={components}></MDXRemote>}
      </article>
    </>
  )
}


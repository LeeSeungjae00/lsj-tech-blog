import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import { getAllPostIds, getPostData } from '../../lib/posts'
import Head from 'next/head'
import Date from '@/components/date'
import utilStyles from '../../styles/utils.module.css'
import { MDXRemote } from 'next-mdx-remote'
import CodeBlock from '@/components/CodeBlock'
// import Button from '../../components/Button'
import dynamic from 'next/dynamic'
import { siteTitle } from 'pages/_document'
import { useState } from 'react'


const EditerMarkdown = dynamic(
  () =>
    import("@uiw/react-md-editor").then((mod) => {
      return mod.default.Markdown;
    }),
  { ssr: false }
);

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

const ErrorComponent = () => {
  const [error, setError] = useState(false)

  if (error) {
    throw new Error('Error occured')
  }

  return (<button className='rounded px-2 bg-green-400' onClick={() => setError(true)}>Error File</button>)
}

export default function Post({ postData }) {
  return (
    <>
      <Head>
        <title>{`${postData.title}-${siteTitle}`}</title>
      </Head>
      <ErrorComponent />
      <article className='h-full'>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={postData.date} />
        </div>
        {postData.contentHtml && <EditerMarkdown source={postData.contentHtml} />}
        {postData.mdxSource && <MDXRemote {...postData.mdxSource} components={components}></MDXRemote>}
      </article>
    </>
  )
}


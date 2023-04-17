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
import styled from "@emotion/styled";
import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
// import { a11yDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import remarkGfm from "remark-gfm";

const MarkDownStyle = styled.div`
  font-size : 0.9rem;
  line-height : 2.5rem;
`


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
  const paths = await getAllPostIds()
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
  console.log(postData.data)
  return (
    <>
      <Head>
        {/* <title>{`${postData.title}-${siteTitle}`}</title> */}
        <title>test</title>
      </Head>
      <ErrorComponent />
      <article className='h-full'>
        <MarkDownStyle>
          <ReactMarkdown
            children={postData.data}
            remarkPlugins={[remarkGfm]}
            components={{
              code({ node, inline, className, children, ...props }) {
                const match = /language-(\w+)/.exec(className || "");
                return !inline && match ? (
                  <SyntaxHighlighter
                    children={String(children).replace(/\n$/, "")}
                    // style={a11yDark}
                    language={match[1]}
                    PreTag="div"
                    {...props}
                  />
                ) : (
                  <code className={className} {...props}>
                    {children}
                  </code>
                );
              },
            }}
          />
        </MarkDownStyle>

        {/* <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={postData.date} />
        </div>
        {postData.contentHtml && <EditerMarkdown source={postData.contentHtml} />}
        {postData.mdxSource && <MDXRemote {...postData.mdxSource} components={components}></MDXRemote>} */}
      </article>
    </>
  )
}


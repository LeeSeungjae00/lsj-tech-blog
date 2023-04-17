import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import { getAllPostIds, getPostData } from '../../lib/posts'
import Head from 'next/head'
import Date from '@/components/date'
// import Button from '../../components/Button'
import styled from "@emotion/styled";
import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import remarkGfm from "remark-gfm";
import rehypeRaw from 'rehype-raw'

const MarkDownStyle = styled.div`
  font-size : 0.9rem;
  line-height : 2.5rem;
`

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



export default function Post({ postData }) {
  return (
    <>
      <Head>
        {/* <title>{`${postData.title}-${siteTitle}`}</title> */}
        <title>test</title>
      </Head>
      <article className='h-full'>
        <MarkDownStyle>
          <ReactMarkdown
            children={postData.data}
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw]}
            components={{
              code({ node, inline, className, children, ...props }) {
                const match = /language-(\w+)/.exec(className || "");
                return !inline && match ? (
                  <SyntaxHighlighter
                    children={String(children).replace(/\n$/, "")}
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
      </article>
    </>
  )
}


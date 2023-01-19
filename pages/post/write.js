import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Head from "next/head";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";

const MDEditor = dynamic(
  () => import("@uiw/react-md-editor").then((mod) => mod.default),
  { ssr: false }
);
export default function Write() {
  const router = useRouter();

  useEffect(() => {
    router.prefetch('/post/ssg-ssr')
    return () => {
    }
  }, [router])


  const idRef = useRef(undefined)
  const titleRef = useRef(undefined)
  const [showLink, setShowLink] = useState(false)
  const [content, setContent] = useState('')

  const handleSumbit = (event) => {
    event.preventDefault()

    const id = idRef.current.value
    const title = titleRef.current.value
    // const content = contentRef.current.value

    if (id && title && content) {
      fetch('/api/post/write', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id,
          title,
          content
        })
      })
        .then(res => {
          if (res.ok) { return res.json(); }
          throw new Error('Fetch Error')
        })
        .then((data) => {
          setShowLink(true);
          alert(data.message)
        })
        .catch(error => alert(error))
    }
  }

  return (
    <>
      <Head>
        <title>Write a post</title>
      </Head>
      <h1>Write a post</h1>
      <form onSubmit={handleSumbit}>
        <input type='text' name="id" placeholder="id" required ref={idRef}></input>
        <br />
        <br />
        <input type='text' name="title" placeholder="title" required ref={titleRef}></input>
        <br />
        <br />
        <div data-color-mode="dark">
          <MDEditor value={content} onChange={setContent} />
        </div>
        {/* <textarea type='text' name="content" placeholder="content" required ref={contentRef}></textarea> */}
        <br />
        <br />
        <input className="rounded bg-orange-500 px-1" type="submit" value="Create"></input>
      </form>
      {showLink && <Link href={`/post/${idRef.current.value}`}>{titleRef.current.value}</Link>}
      <br></br>
      <br></br>
      <button className="rounded bg-orange-500 px-1" onClick={() => router.push('/post/[id]', '/post/ssg-ssr', { scroll: false })}>push</button>
      <button className="rounded bg-yellow-500 px-1" onClick={() => router.replace('posts/ssg-ssr')}>replace</button>
      <button className="rounded bg-yellow-500 px-1" onClick={() => router.back()}>back</button>
      <button className="rounded bg-yellow-500 px-1" onClick={() => router.reload()}>reload</button>
    </>
  )
}

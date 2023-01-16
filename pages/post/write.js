import { useRef, useState } from "react";
import Link from "next/link";
import Head from "next/head";

export default function Write() {
  const idRef = useRef(undefined)
  const titleRef = useRef(undefined)
  const contentRef = useRef(undefined)
  const [showLink, setShowLink] = useState(false)

  const handleSumbit = (event) => {
    event.preventDefault()

    const id = idRef.current.value
    const title = titleRef.current.value
    const content = contentRef.current.value

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
        <textarea type='text' name="content" placeholder="content" required ref={contentRef}></textarea>
        <br />
        <br />
        <input className="rounded bg-orange-500 px-1" type="submit" value="Create"></input>
      </form>
      {showLink && <Link href={`/post/${idRef.current.value}`}>{titleRef.current.value}</Link>}
    </>
  )
}

import { useRef, useState } from "react";
import Layout from "../../components/layout";
import Link from "next/link";

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
    <Layout>
      <h1>Write a post</h1>
      <form onSubmit={handleSumbit}>
        <input type='text' name="id" placeholder="id" required ref={idRef}></input>
        <br />
        <input type='text' name="title" placeholder="title" required ref={titleRef}></input>
        <br />
        <textarea type='text' name="content" placeholder="content" required ref={contentRef}></textarea>
        <br />
        <input type="submit" value="Create"></input>
      </form>
      {showLink && <Link href={`/post/${idRef.current.value}`}>{titleRef.current.value}</Link>}
    </Layout>
  )
}

import Layout from '@/components/layout'
import '../styles/global.css'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { format, formatDistance, formatDistanceToNow } from 'date-fns'

export default function App({ Component, pageProps }) {
  const router = useRouter()
  const [visitedTime] = useState(new Date())

  return (
    <Layout home={router.pathname === '/'}>
      <div>
        visited {formatDistanceToNow(new Date(visitedTime), {
          addSuffix: true,
          includeSeconds: true
        })}
      </div>
      <Component {...pageProps} pathname={router.pathname} />
    </Layout>
  )
}

//페이지마다 달라지지 않는 레이아웃
//page 를 이동해도 keeping 하고싶은 state 가 있을 떄
//에러 핸들링
//additional data 를 페이지에 주입할 떄
//global css
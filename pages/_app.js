import Layout from '@/components/layout'
import '../styles/global.css'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { formatDistanceToNow } from 'date-fns'
import ErrorBoundary from '@/components/ErrorBoundary'


//성능 측정을 통해 사용자들이 어떻게 사용하고 있는지 확인 할 수 있음 (로그 수집)
//LCP 2.5s FID 100ms CLS 0.1
//크롬 개발자 도구 lighthouse 같은 걸로 측정 가능함
export function reportWebVitals(metric) {
  console.log(metric)
}

function commonLayout(page) {
  const router = useRouter()
  return (
    <Layout home={router.pathname === '/'}>
      {page}
    </Layout>
  )
}


export default function App({ Component, pageProps }) {
  const router = useRouter()
  const [visitedTime] = useState(new Date())
  const getLayout = Component.getLayout || commonLayout

  return getLayout(
    <>
      <div>
        visited {formatDistanceToNow(new Date(visitedTime), {
          addSuffix: true,
          includeSeconds: true
        })}
      </div>
      <ErrorBoundary>
        <Component {...pageProps} />
      </ErrorBoundary>
    </>)
}

//페이지마다 달라지지 않는 레이아웃
//page 를 이동해도 keeping 하고싶은 state 가 있을 떄
//에러 핸들링
//additional data 를 페이지에 주입할 떄
//global css
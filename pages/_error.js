import ErrorNext from 'next/error'
import Link from 'next/link'

function Error({ statusCode }) {
  if (statusCode === 404) {
    return (
      <div>404!
        <Link href={'/'}>홈으로</Link>
      </div>
    )
  }
  return (
    <ErrorNext statusCode={statusCode}></ErrorNext>
  )
}

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404
  return { statusCode }
}

Error.getLayout = function getLayout(page) {
  return <>{page}</>;
};

export default Error;
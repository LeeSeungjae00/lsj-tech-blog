import Link from 'next/link'
import React from 'react'

function Custom404() {
    return (
        <div className='w-full'>
            내용을 찾을 수 없습니다. (URL을 확인해 주세요)
            <br></br>
            <Link href={'/'}>홈으로</Link>
        </div>
    )
}

export default Custom404;
import React, { useCallback, useEffect, useState } from 'react'
import styled from '@emotion/styled'
import { SiGithub, SiNotion } from 'react-icons/si'

export default function Header({ theme }) {

  useEffect(() => {
    window.addEventListener('scroll', onScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  const [isSticky, setIsSticky] = useState(false)
  const onScroll = useCallback((event) => {
    const { scrollY } = window
    if (scrollY < 52) {
      setIsSticky(false)
    } else {
      setIsSticky(true)
    }
  })


  return (
    <>
      <BasicHeader>
        <div className="flex justify-between w-full max-w-5xl">
          <a href="#" className="font-bold text-black">All Post</a>
          <a href="#" className="font-bold text-black">Category</a>
          <a href="#" className="font-bold text-black">Contect Me</a>
        </div>
      </BasicHeader>
      <StickyHeader isSticky={isSticky}>
        <div className="w-full flex items-center  max-w-5xl">
          <a href="#" className="mr-auto font-black text-black">📚 LSJ-TECHBLOG</a>
          <a className='mr-2' href="https://pebble-schooner-b3c.notion.site/d4bd5c8bf33947858bf69051400c62c3">
            <SiNotion size={'25px'} color='black'></SiNotion>
          </a>
          <a href="https://github.com/LeeSeungjae00">
            <SiGithub size={'25px'} color='black'></SiGithub>
          </a>
        </div>
      </StickyHeader>
    </>
  )

}


const BlackA = styled.a`
  color : black;
  text-transform : uppercase;
`

const BasicHeader = styled.nav`
position : absolute;
  top : 0;
  padding: 0 1rem;
  height: 52px;
  left: 0;
  width : 100%;
  display : flex;
  align-items : center;
  justify-content : center;
  background-color : white;
`

const StickyHeader = styled.nav`
  position : ${(props) => (props.isSticky ? 'fixed' : 'absolute')};
  top : ${(props) => (props.isSticky ? '0' : '52px')}; ;
  padding: 0 1rem;
  height: 52px;
  left: 0;
  width : 100%;
  display : flex;
  align-items : center;
  justify-content : center;
  -webkit-backdrop-filter: saturate(180%) blur(15px);
  -moz-backdrop-filter: saturate(180%) blur(15px);
  -o-backdrop-filter: saturate(180%) blur(15px);
  backdrop-filter: saturate(180%) blur(15px);
  background: rgba(255, 255, 255, 0.1);
  border-bottom: 1px solid #ddd;
`
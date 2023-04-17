import React, { useCallback, useEffect, useState } from 'react'
import styled from '@emotion/styled'
import { SiGithub, SiNotion } from 'react-icons/si'
import { FiSun, FiMoon } from 'react-icons/fi'
import Link from 'next/link'

export default function Header() {
  const [theme, setTheme] = useState('light')
  const [isSticky, setIsSticky] = useState(false)

  useEffect(() => {
    localStorage.getItem('theme') === 'dark' ? setTheme('dark') : setTheme('light')
  }, [])

  useEffect(() => {
    window.addEventListener('scroll', onScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  useEffect(() => {
    if (theme === 'dark') {
      document.querySelector('body').classList.add('dark')
    } else {
      document.querySelector('body').classList.remove('dark')
    }

    return () => {
    }
  }, [theme])

  const onScroll = useCallback((event) => {
    const { scrollY } = window
    if (scrollY < 52) {
      setIsSticky(false)
    } else {
      setIsSticky(true)
    }
  })

  const handleClick = () => {
    const theme = localStorage.getItem('theme')
    if (theme === 'dark') {
      localStorage.setItem('theme', 'light')
      setTheme('light')
    } else {
      localStorage.setItem('theme', 'dark')
      setTheme('dark')
    }
  }


  return (
    <>
      <BasicHeader theme={theme}>
        <div className="flex justify-between w-full max-w-5xl">
          <a href="#" className="font-bold text-black dark:text-slate-50">All Posts</a>
          <a href="#" className="font-bold text-black dark:text-slate-50">Category</a>
          <a href="#" className="font-bold text-black dark:text-slate-50">Contect Me</a>
        </div>
      </BasicHeader>
      <StickyHeader isSticky={isSticky}>
        <div className="w-full flex items-center  max-w-5xl">

          <Link href="/" ><a className="mr-auto font-black text-black dark:text-slate-50">📚 LSJ-TECHBLOG</a></Link>
          <button className='mr-10'>
            {theme !== 'dark' ? <FiSun onClick={handleClick}></FiSun> : <FiMoon onClick={handleClick}></FiMoon>}
          </button>
          <a className='mr-2' href="https://pebble-schooner-b3c.notion.site/d4bd5c8bf33947858bf69051400c62c3">
            <SiNotion size={'25px'} color={theme !== 'dark' ? 'black' : "#fff"}></SiNotion>
          </a>
          <a href="https://github.com/LeeSeungjae00">
            <SiGithub size={'25px'} color={theme !== 'dark' ? 'black' : "#fff"}></SiGithub>
          </a>
        </div>
      </StickyHeader>
    </>
  )

}


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
  background-color : ${props => props.theme === 'dark' ? `#2e4156` : `#f1f5f9`};
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
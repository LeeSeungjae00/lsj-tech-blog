import Head from 'next/head'
import styles from './layout.module.css'
import utilStyles from '../styles/utils.module.css'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import Utterances from './Utterances'
import Image from 'next/image'
import Header from './Header'

const name = 'LSJ'

export default function Layout({ children, home }) {
  const [theme, setTheme] = useState('light')

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

  useEffect(() => {
    localStorage.getItem('theme') === 'dark' ? setTheme('dark') : setTheme('light')
  })

  useEffect(() => {
    if (theme === 'dark') {
      document.querySelector('body').classList.add('dark')
    } else {
      document.querySelector('body').classList.remove('dark')
    }

    return () => {
    }
  }, [theme])


  return (
    <div className='bg-slate-100 dark:bg-black dark:text-gray-50 min-h-screen'>
      <div className={styles.container}>
        <Header theme={theme}></Header>
        <main className='p-16'>{children}</main>
        {!home && (
          <>
            <Utterances />
            <div className={styles.backToHome}>
              <Link href="/">
                ← Back to home
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
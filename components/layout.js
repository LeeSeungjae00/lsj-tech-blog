import Head from 'next/head'
import styles from './layout.module.css'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import Utterances from './Utterances'
import Header from './Header'

const name = 'LSJ'

export default function Layout({ children, home }) {


  return (
    <div className='bg-slate-100 dark:bg-black dark:text-gray-50 min-h-screen'>
      <div className={styles.container}>
        <Header></Header>
        <main className='max-w-5xl w-full m-auto pt-12'>{children}</main>
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
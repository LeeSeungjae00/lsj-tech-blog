import React from 'react'
import Link from 'next/link'
import Date from '@/components/date'
import CategoryChip from '@/components/CategoryChip'

export default function PostCardUl({ id, icon, title, date, categories }) {
  return (
    <li className='mb-4 text-black' key={id}>
      <Link href={`/post/${id}`}>
        <button className='dark:text-slate-200 text-black'>
          {`${icon} ${title}`}
        </button>
      </Link>
      <br />
      {categories.map(category => (
        <CategoryChip key={category.id} color={category.color}>{category.name}</CategoryChip>
      ))}
      <br />
      <small className='text-xs text-gray-400 font-extralight'>
        <Date dateString={date} />
      </small>
    </li>
  )
}

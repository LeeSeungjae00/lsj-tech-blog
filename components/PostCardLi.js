import React from 'react'
import Link from 'next/link'
import Date from '@/components/date'
import CategoryChip from '@/components/CategoryChip'

export default function PostCardUl({ id, icon, title, date, categories }) {
  return (
    <li className='mb-4' key={id}>
      {icon}
      <Link href={`/post/${id}`}>
        <span className='text-black pl-2'>
          {title}
        </span>
      </Link>
      <br />
      {categories.map(category => (
        <CategoryChip key={category.id} color={category.color}>{category.name}</CategoryChip>
      ))}
      <br />
      <small>
        <Date dateString={date} />
      </small>
    </li>
  )
}

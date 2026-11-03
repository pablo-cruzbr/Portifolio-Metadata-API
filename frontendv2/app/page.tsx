import Home from '@/components/Home/Home'
import { getPostSummaries } from '@/lib/posts'
import React from 'react'

const page = () => {
  return (<Home posts={getPostSummaries()}/>)
}

export default page

import React from 'react'
import Blog from './Blog';
import Image from 'next/image';

interface BlogCardProps {
  image: string;
  title: string;
}

const BlogCard = ({ image, title }: BlogCardProps) => {
  return (
    <div>
      <Image
        src={image}
        alt="blog"
        width={500}
        height={500}
        className="object-cover"
      />
      <p className="mt-4 text-gray-500 font-medium text-base sm:text-lg">24 Março 2026</p>
      <h1 className="mt-5 text-lg sm:text-x1 font-bold text-white hover:underlin hover:text-cyan-300 cursor-pointer transition-all duration-300">{title}</h1>
      <div className="mt-4 flex flex-wrap gap-2 items-center">
  <p className="px-4 py-1.5 bg-blue-950 text-white text-xs sm:text-sm font-bold rounded-full">
    React
  </p>

  <p className="px-4 py-1.5 bg-blue-950 text-white text-xs sm:text-sm font-bold rounded-full">
    Next JS
  </p>

  <p className="px-4 py-1.5 bg-blue-950 text-white text-xs sm:text-sm font-bold rounded-full">
    Tailwind
  </p>
</div>
    </div>
  )
}

export default BlogCard
import React from 'react'
import BlogCard from './BlogCard'

const Blog = () => {
  return (
    <div className='pt-16 pb-16'>
        <h1 className="text-center text-2xl md:text-4xl xl:text-5xl font-bold text-white">
      My latest <span className="text-cyan-300">Blogs</span>
        </h1>
      <div className="w-[80%] mx-auto grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 items-center mt-16">
    <div data-aos="fade-right" data-aos-anchor-placement="top-center" data-aos-delay="0">
      <BlogCard image="/img/b1.webp" title="Learn how to build an amazing portfolio website using next js"/>
    </div>

    <div data-aos="fade-right" data-aos-anchor-placement="top-center" data-aos-delay="100">
      <BlogCard image="/img/b2.webp" title="Learn how to build an amazing portfolio website using next js"/>
    </div>

    <div  data-aos="fade-right" data-aos-anchor-placement="top-center" data-aos-delay="200">
      <BlogCard image="/img/b3.webp" title="Learn how to build an amazing portfolio website using next js"/>
    </div>
</div>
    </div>
  )
}

export default Blog
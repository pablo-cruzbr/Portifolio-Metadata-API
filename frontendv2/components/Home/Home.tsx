"use client"
import React, { useEffect } from 'react'
import Hero from './Hero/Hero'
import Services from './Service/Services'
import FeaturedProject from './FeaturedProject/FeaturedProject'
import AlfredChat from './Alfred/AlfredChat'
import GitHubStats from './GitHubStats/GitHubStats'
import Skills from './Skills/Skills'
import About from './About/About'
import Career from './Career/Career'
import Blog from './Blog/Blog'
import Contact from './Contact/Contact'
import "aos/dist/aos.css"
import type { PostSummary } from '@/lib/postFormat'

const Home = ({ posts }: { posts: PostSummary[] }) => {
  useEffect(() => {
    const initAOS = async () => {
    const AOS = (await import("aos")).default;
      
      AOS.init({
        duration: 1000,
        easing: "ease",
        once: true,
      });

      setTimeout(() => {
        AOS.refresh();
      }, 500);
    };

    initAOS();
  }, []);
  
  return (
    <div className="overflow-hidden">
      <Hero/>
      <AlfredChat/>
      <Services/>
      <FeaturedProject/>
      <Career/>
      <GitHubStats/>
      <Skills/>
      <About/>
      <Blog posts={posts}/>
      <Contact/>
    </div>
  )
}

export default Home



"use client"
import React, { useEffect } from 'react'
import Hero from './Hero/Hero'
import Services from './Service/Services'
import Resume from './Resume/Resume'
import Projects from './Projects/Projects'
import Skills from './Skills/Skills'
import ClientReview from './ClientRaview/ClientReview'
import Blog from './Blog/Blog'
import Contact from './Contact/Contact'
import Footer from './Contact/Footer/Footer'
import "aos/dist/aos.css"

const Home = () => {
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
      <Services/>
      <Projects/>
      <Skills/>
      <Contact/>
    </div>
  )
}

export default Home



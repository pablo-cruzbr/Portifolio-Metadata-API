import React from 'react'
import ResumeCard from './ResumeCard'
import { FaCodepen, FaReact } from 'react-icons/fa'
import { BsDatabase } from 'react-icons/bs'
import { BiBadge } from 'react-icons/bi'

const Resume = () => {
  return (
    <div className="pt-20 pb-16">
        <div className="w-[90%] sm:w-[70%] mx-auto grid grid-cols-1 xl:grid-cols-2 gap-10">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-white">
                My Work <span className="text-cyan-200"> Experience</span>
              </h1>
              <div data-aos="zoom-in" data-aos-anchor-placement="top-center" className="mt-10">
                  <ResumeCard Icon={FaCodepen} role="Full-Stack Developer"/>
                  <ResumeCard Icon={FaReact} role="Front-End Developer"/>
                  <ResumeCard Icon={BsDatabase} role="Backend Developer"/>
              </div>
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-white">
                My Work <span className="text-cyan-200">Education</span>
              </h1>
              <div data-aos="zoom-out" data-aos-anchor-placement="top-center" data-aos-delay="300" className="mt-10">
                <ResumeCard 
                Icon={BiBadge} 
                role="Design Instiute of Technology"
                date="Jan 2023 - Dec 2024"
                />

                <ResumeCard 
                Icon={FaReact} 
                role="Bachelor in Computer Sciente"
                date="Jan 2023 - Dec 2024"
                />

                <ResumeCard 
                Icon={BsDatabase} 
                role="Certificate in Digital Marcketing"
                date="Jan 2016 - Dec 2019"
                />
              </div>
            </div>

        </div>
    </div>
  )
}

export default Resume
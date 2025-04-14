import React from 'react'
import { FaLongArrowAltRight } from "react-icons/fa";


function Home() {
  return (
    <div className='container'>
      <div id="hero-section" className='mt-20'>
        <div className="hero-content relative z-10">
          <h2 className='text-7xl leading-tight font-bold '>Empower Your <br /> <span className='hero-heading z-20 relative' >Learning</span> <br /> with Gir Technologies</h2>
          <p className='text-3xl font-light'>Job Oriented Intensive <br /> Training & Internship Program</p>
          <div id='cta' className='flex gap-x-4 mt-8'>
              <button className='px-2 text-2xl py-1 hover:bg-accent-100 transition-colors duration-300 ease-linear rounded-lg border-2 flex items-center gap-x-1'>View Cources <FaLongArrowAltRight />
              </button>
              <button className='px-2 text-2xl py-1 rounded-lg bg-accent-100 flex items-center gap-x-1'>Enquire now <FaLongArrowAltRight />
              </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
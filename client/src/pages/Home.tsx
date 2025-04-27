import React from 'react'
import { FaLongArrowAltRight } from "react-icons/fa";
import WhyChooseCard from '../components/UI/cards/WhyChooseCard';
import Line from '../components/UI/shapes/Line';

function Home() {
  return (
  <>
    <section id="hero-section" className='mt-14'>
      <div className="hero-wrapper container">
        <div className="hero-content relative z-10">
          <h2 className='text-7xl leading-tight font-bold '>Empower Your <br /> <span className='hero-heading z-20 relative' >Learning</span> <br /> with Gir Technologies</h2>
          <p className='text-3xl mt-12 font-light'>Job Oriented Intensive <br /> Training & Internship Program</p>
          <div id='cta' className='flex gap-x-4 mt-8'>
              <button className='px-2 text-2xl py-1 hover:bg-accent-100 transition-colors duration-300 ease-linear rounded-lg border-2 flex items-center gap-x-1'>View Cources <FaLongArrowAltRight />
              </button>
              <button className='px-2 text-2xl py-1 rounded-lg bg-accent-100 flex items-center gap-x-1'>Enquire now <FaLongArrowAltRight />
              </button>
          </div>
        </div>
      </div>
    </section>
    <section id="why-choose" className='py-42'>
      <div className="why-choose--wrapper container">
        <h2 className='text-center font-semibold' >Why Choose <span className='text-accent-100'>Gir Technologies?</span></h2>
        <div className='grid grid-cols-4 gap-x-8 mt-14'>
          <WhyChooseCard/>
          <WhyChooseCard/>
          <WhyChooseCard/>
          <WhyChooseCard/>
        </div>
      </div>
    </section>
    <section id='experience'>
      <div className="exp-wrapper container">
        <div className='bg-bg-card py-4 mx-auto gap-y-16 flex flex-col rounded-sm'>
          <h2 className='text-center'>Experience and Expertise</h2>
          <div className='flex px-12 justify-between'>
            <div className="analytics text-center max-w-40  flex flex-col gap-y-2">
              <strong className='text-6xl text-accent-100'>5+</strong>
              <p className='opacity-50'>Industry-Relevant Courses</p>
              <Line/>
            </div>
            <div className="analytics text-center max-w-40  flex flex-col gap-y-2">
              <strong className='text-6xl text-accent-100'>5+</strong>
              <p className='opacity-50'>Industry partners</p>
              <Line/>
            </div>
            <div className="analytics text-center max-w-40  flex flex-col gap-y-2">
              <strong className='text-6xl text-accent-100'>5+</strong>
              <p className='opacity-50'>Industry-Relevant Courses</p>
              <Line/>
            </div>
            <div className="analytics text-center max-w-40  flex flex-col gap-y-2">
              <strong className='text-6xl text-accent-100'>5+</strong>
              <p className='opacity-50'>Industry-Relevant Courses</p>
              <Line/>
            </div>
            <div className="analytics text-center max-w-40  flex flex-col gap-y-2">
              <strong className='text-6xl text-accent-100'>5+</strong>
              <p className='opacity-50'>Industry-Relevant Courses</p>
              <Line/>
            </div>
          </div>
        </div>
      </div>
    </section>
  </>
  )
}

export default Home
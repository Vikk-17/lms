import React from 'react'
import { MdDataExploration } from "react-icons/md";
import Line from '../shapes/Line';
function WhyChooseCard() {
  return (
    <div className='bg-bg-card p-8 rounded-2xl flex flex-col gap-y-10'>
        <MdDataExploration className='text-accent-100 text-6xl' />
        <div className='mt-8'>
          <h3 className='text-xl text-heading mb-4'>Accredited Curriculum </h3>
          <p  className='opacity-80'>Our program curriculums are designed keeping in line with the Certification requirements. This ensures the trainings are on par with the current industry needs.</p>
        </div>
        <Line/>
    </div>
  )
}

export default WhyChooseCard
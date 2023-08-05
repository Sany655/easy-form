import React from 'react'
import { Link } from 'react-router-dom'

function Landing() {
  return (
    <div className="container mx-auto text-center">
        <img src="./banner.jpg" alt="" className='w-full '/>
        <section>
            <h1 className="text-4xl">
                <span className='me-4 pb-8'>Build</span>
                <span className='text-orange-400'>Dynamic Form</span>
            </h1>
            <p className='m-4'><span className='text-orange-300'>Start</span> Creating</p>
        </section>
    </div>
  )
}

export default Landing
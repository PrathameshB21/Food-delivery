import React from 'react'
import Lottie from 'lottie-react';
import foodLoader from '../assets/foodLoader.json'
const Loader = () => {
  return (
    <div className='loader'>
        <Lottie animationData={foodLoader}/>
    </div>
  )
}

export default Loader
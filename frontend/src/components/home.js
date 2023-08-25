import React from 'react'
import hero from '../Assets/img-1.png'
import './home.css'
function home() {
  return (
    <div className='home_main'>
        <h1 className='home'>Insure your future with us now.</h1>
        <img src={hero} alt='>'></img>
    </div>
  )
}

export default home
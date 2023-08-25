import React from 'react'
import hero3 from '../../Assets/img-3.png'
import "./compo.css"
function component2() {
  return (
    <div className='compo2-main'>
        <div className='sub-compo'>
        <h1 id='compoh1'>Get Start</h1>
        <div className='compodiv'>
        <p id='compoP'>Enter your age and other details to discover the perfect insurance plan for you. It’s quick, simple, and there’s no time like the present!</p>
        </div>
         </div>
        <div className='sub-compo2'>
            <button className='compo-btn'>Find My Plan</button>
        </div>
        <div className='compo-img'>
            <img className='compoimg' src={hero3} alt='l'></img>
        </div>
    </div>
  )
}

export default component2
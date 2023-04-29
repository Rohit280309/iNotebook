import React, { useContext } from 'react'
import colorContext from '../context/bgColor/colorContext';


const About = () => {
  const context = useContext(colorContext);
  const { mode } = context;
  return (
    <div className='container' style={{ color: mode === 'light' ? 'black' : 'white' }}>
      <h2>About iNotebook</h2>
      <p>iNotebook is a notebook on cloud<br/>
      It can be used to keep your day to day notes on any device of your choice<br/>
      It is safe to use<br/></p>
    </div>
  )
}

export default About

import React from 'react'
import { NavLink } from 'react-router-dom'
import './nav.css';

const Navbar = () => {
  return (
    <div className='nav'>
        <NavLink to='/' className={({isActive})=> isActive ? "active-link" :"inactive-link"}>Home</NavLink>
        <NavLink to='/pastes' className={({isActive})=> isActive ? "active-link" :"inactive-link"}>Pastes</NavLink>
      
    </div>
  )
}

export default Navbar

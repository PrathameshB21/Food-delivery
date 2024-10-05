import React from 'react'
import './Navbar.css'
import { Assets } from '../../assets/assets';


const Navbar = () => {
  return (
    <div className='navbar'>
        <img className='logo' src={Assets.logo}/>
        <img className='profile' src={Assets.profile_icon} alt="" />

    </div>
  )
}

export default Navbar

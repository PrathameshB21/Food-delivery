import React from 'react'
import './Navbar.css'
<<<<<<< HEAD
import { Assets } from '../../assets/assets'
=======
import { Assets } from '../../assets/assets';

>>>>>>> 8fcdd27d8c239c723971a4b54cbd81e07076b4a5

const Navbar = () => {
  return (
    <div className='navbar'>
        <img className='logo' src={Assets.logo}/>
        <img className='profile' src={Assets.profile_icon} alt="" />

    </div>
  )
}

export default Navbar

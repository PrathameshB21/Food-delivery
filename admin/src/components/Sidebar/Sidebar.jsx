import React from 'react'
import './Sidebar.css'
import { Assets } from '../../assets/assets';

<<<<<<< HEAD

=======
>>>>>>> 8fcdd27d8c239c723971a4b54cbd81e07076b4a5
import { NavLink } from 'react-router-dom'

const Sidebar = () => {
  return (
    <>
    <div className="sidebar">
      <div className="sidebar-options">
        <NavLink to='/add' className="sidebar-opt">
          <img src={Assets.addition} alt="" />
          <p>Add Item</p>
        </NavLink>
        <NavLink to='/list' className="sidebar-opt">
          <img src={Assets.checklist} alt="" />
          <p>Add To List</p>
        </NavLink>
        <NavLink to='/orders' className="sidebar-opt">
          <img src={Assets.food_delivery} alt="" />
          <p>Orders</p>
        </NavLink>
      </div>
    </div>
    </>
  )
}

export default Sidebar

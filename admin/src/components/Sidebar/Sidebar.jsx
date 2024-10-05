import React from 'react'
import './Sidebar.css'
import { Assets } from "../../assets/Assets";

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

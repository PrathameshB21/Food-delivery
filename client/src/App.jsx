import React, { useState } from 'react'
import Navbar from './Components/Navbar/Navbar'
import{Routes,Route}from 'react-router-dom'
import Home from './pages/Home/Home'
import Cart from './pages/Cart/Cart'
import OrderPLaced from './pages/OrderPlaced/OrderPlaced'
import FormPopup from './Components/FormPopup/FormPopup'
import MyOrders from './pages/MyOrders/MyOrders'
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
export const App = () => {
  const [showForm,setShowForm]=useState(false)
  return (
    <>
    <ToastContainer/>
    {showForm?<FormPopup setShowForm={setShowForm}/>:<></>}
    <div className='app'>
    <Navbar  setShowForm={setShowForm}/>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/Cart' element={<Cart/>}/>
      <Route path='/OrderPlaced' element={<OrderPLaced/>}/>
      <Route path='/MyOrders' element={<MyOrders/>}/>
    </Routes>
    </div>
    </>
  )
}
export default App
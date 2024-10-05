import React from 'react'
import Navbar from './components/Navbar/Navbar'
import Sidebar from './components/Sidebar/Sidebar'
import {Routes,Route} from 'react-router-dom'
import Add from './Pages/Add/Add'
import List from './Pages/LIst/List'
import Order from './Pages/Orders/Order'
import { ToastContainer} from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
 


const App = () => {
<<<<<<< HEAD
  const url = "https://food-delivery-backend-g9td.onrender.com"; 
=======
  const url ="https://food-delivery-backend-lmzt.onrender.com"; 
>>>>>>> 8fcdd27d8c239c723971a4b54cbd81e07076b4a5
  return (
    <>
    <ToastContainer/>
    <Navbar/>
    <hr/>
      <div className='app-content'>
      <Sidebar/>
      <Routes>
        <Route path='/add' element={<Add url={url}/>}/>
        <Route path='/list' element={<List url={url}/>}/>
        <Route path='/orders' element={<Order url={url}/>}/>
      </Routes>
      </div>
    </>
  )
}

export default App

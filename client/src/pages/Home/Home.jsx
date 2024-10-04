import React, { useState } from 'react'
// import Header from '../../Components/Navbar/Header/Header'
// import Navbar from '../../Components/Navbar'
import Header from './../../Components/Header/Header'
import ExploreMenu from '../../Components/ExploreMenu/exploreMenu'
import FoodDisplay from '../../Components/FoodDisplay/FoodDisplay';
import Footer from '../../Components/Footer/Footer';

const Home = () => {
    const[category,setCategory]=useState('All');
  return (
    <>
    <Header/>
    <ExploreMenu category={category} setCategory={setCategory}/>
    <FoodDisplay category={category} setCategory={setCategory}/>
    <Footer/>
    </>
  )
}

export default Home
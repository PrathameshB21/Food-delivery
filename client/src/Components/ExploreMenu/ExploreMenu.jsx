import React from 'react'
import './ExploreMenu.css'
import {menu_list} from '../../assets/assets'
const ExploreMenu = ({category,setCategory}) => {
  return (
 <div className='ExploreMenu' id='ExploreMenu'>
    <h2>Explore our menu</h2>
    <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolor, obcaecati iusto! Animi optio, dolore ducimus illum cum consectetur aliquid pariatur quas sed reiciendis. Iusto, dolorum.</p>
   <div className='explore-menu-list'>
    {menu_list.map((item,index)=>{
        return(
            <div onClick={()=>setCategory(prev=>prev===item.menu_name?'All':item.menu_name)} className='menu-item-list-items'>
                <img className={category===item.menu_name?'Active':'All'}src={item.menu_image}/>
                <p>{item.menu_name}</p>
            </div>
           
        )
    })}
    
   </div>
   <hr/>
 </div> 
  )
}

export default ExploreMenu
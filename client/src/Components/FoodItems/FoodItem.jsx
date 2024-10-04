import React, { useContext, useState } from 'react'
import './FoodItem.css'
import { assets } from '../../assets/assets'
import StoreContextProvider, { StoreContext } from '../../Context/StoreContext'
const FoodItem = ({ id, name, image, price, description, category }) => {
    // const [itemCount, setItemCount] = useState(0)
    const{cartItem,setCartItem,addToCart,removeFromCart,url}=useContext(StoreContext)
    return (
        <div className='food-item-card'>
            <div className="food-item-image-container">
                <img className="food-item-image" src={url+"/images/"+image} alt="food-item" />
                {!cartItem[id] ?
                    <img onClick={()=>addToCart(id)} className='add-btn' src={assets.add_icon_white} />:
                    <div className='food-item-counter'>
                        <img onClick={()=>{removeFromCart(id)}} src={assets.remove_icon_red}  />
                        <p>{cartItem[id]}</p>
                        <img onClick={()=>{addToCart(id)}} src={assets.add_icon_green} />
                    </div>}

            </div>
            <div className="food-item-info">
                <b>{name}</b>
                <p>{description}</p>
                <h5>₹{price}</h5>
               <div className="food-item-rating">
               <img  src={assets.rating_starts} alt="" />
               </div>

            </div>

        </div>
    )
}

export default FoodItem
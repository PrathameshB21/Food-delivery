import React from 'react'
import { useContext, useState } from 'react'
import { StoreContext } from '../../Context/StoreContext'
import { useNavigate } from 'react-router-dom'
import './Cart.css'

const Cart = () => {
  const { food_list,
    cartItem, removeFromCart, addTotal,url} = useContext(StoreContext);
  const navigate = useNavigate();
return (

    <>
      <div className="cart">
        <div className="cart-tems-table">
          <div className="table-titles">
            <p>Item</p>
            <p>Title</p>
            <p>Price</p>
            <p>Quantity</p>
            <p>Total</p>
            <p>Remove Items </p>

          </div>
          <br />
          <hr />
          {food_list.map((item, index) => {
            if (cartItem[item._id] > 0) {
              return (
                <>
                  <div className="table-titles cart-item-list">
                    <img src={url+"/images/"+item.image} alt="" />
                    <h3>{item.name}</h3>
                    <h3>{item.price}</h3>
                    <h3>{cartItem[item._id]}</h3>
                    <h2>₹{item.price * cartItem[item._id]}</h2>
                    <button onClick={() => removeFromCart(item._id)}>-</button>
                    </div><br />

                  <hr />


                </>
              )
            }
          })}
          <div className="cart-summary">
            <div className="total-cart-table">

              <div className="subtotal">
                <p>Sub Total</p>
                <p><b>₹</b>{addTotal()}</p>
              </div>
              <hr />
              <div className="delivery-charges">
                <p>Delivery Charges</p>
                <p>₹20</p>
              </div>
              <hr />
              <div className="All-total">
                <b>Total </b>
                <b>₹{addTotal()}</b>
              </div>
              <hr />
              
              <button type='submit' className='total-submit-btn' onClick={() => navigate('/OrderPlaced')}>Checkout</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Cart
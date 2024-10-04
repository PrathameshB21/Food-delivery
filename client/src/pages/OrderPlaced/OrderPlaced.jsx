import React, { useContext, useEffect, useState } from 'react'
import './OrderPlaced.css'
import { StoreContext } from '../../Context/StoreContext'
import { Zip_Code } from '../../assets/assets'
import axios from 'axios'
import { toast } from 'react-toastify'
import { Navigate, useNavigate } from 'react-router-dom'

const OrderPlaced = () => {
  const { addTotal, token, food_list, cartItem } = useContext(StoreContext);
  const url = "http://localhost:4000"
  const [addrData, setAddrData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    phoneNumber: ""
  })
  const onchangHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setAddrData({ ...addrData, [name]: value })
  }
  const OrderPlaced = async (event) => {
    event.preventDefault();
    let orderItems = []
    food_list.map((item) => {
      if (cartItem[item._id] > 0) { // Use item._id if that's how your items are stored in cartItem
        let itemInfo = { ...item }; // Spread the item to create a new object
        itemInfo["quantity"] = cartItem[item._id]; // Add quantity from cartItem
        orderItems.push(itemInfo); // Push itemInfo to orderItems
      }
    });

    // Log the orderItems array
    // console.log(orderItems.itemInfo);

    let orderData = {
      address: addrData,
      items: orderItems,
      amount: addTotal() + 2
    }
    console.log(orderData);



    const response = await axios.post(url + '/api/order/place', orderData, { headers: { Authorization: `Bearer ${token}` } })
    console.log(response);
    try {
      if (response.status === 200) {
        const { razorpayOrderId, amount, currency } = response.data;

        // Set up Razorpay options to open payment popup
        const options = {
          key: "rzp_test_nE8bXoitMtuc5A",  // Your Razorpay Key ID
          amount: amount,  // The amount in paise (e.g., 100 rupees = 10000 paise)
          currency: currency,
          order_id: razorpayOrderId,  // Razorpay Order ID from backend
          handler: async function (paymentResponse) {
            console.log("Payment successful", paymentResponse);
            let responseData = {
              payment_id: paymentResponse.razorpay_payment_id,
              order_id: paymentResponse.razorpay_order_id,
              razorpay_signature: paymentResponse.razorpay_signature
            }
             const validationResponse = await axios.post(url + '/api/order/validate', responseData, { headers: { Authorization: `Bearer ${token}` } })
              if (validationResponse.status === 200) {
                toast.success("Payment is legit");
                

              } else {
                toast.error('payment is not legit');

              }
              // Redirect or update your UI after successful payment
          },
          prefill: {
            name: `${addrData.firstName} ${addrData.lastName}`,
            email: addrData.email,
            contact: addrData.phoneNumber
          },
          theme: {
            color: "#3399cc"
          }
        };

        // Open Razorpay payment popup
        const rzp1 = new window.Razorpay(options);
        rzp1.open();
      }



    }
    catch (error) {
      console.log("fronetend err", error);

    }
  }
    const navigate=useNavigate();
    useEffect(()=>{
      if(!token){
        navigate('/cart')
      }
      else if(addTotal()===0){
        navigate('/cart')
      }
    })
  return (
    <>
      <form onSubmit={OrderPlaced}>
        <div className="order-placed-wrapper">
          <div className="order-placed-left-container">

            <div className="name-section Handel-Input" >

              <input type="text" name="firstName" onChange={onchangHandler} value={addrData.firstName} id="First-Name" placeholder='First Name' />
              <input type="text" name="lastName" onChange={onchangHandler} value={addrData.lastName} id="Last-Name" placeholder='Last Name' />
            </div>
            <div className="adress-section">
              <input type="email" name="email" onChange={onchangHandler} value={addrData.email} id="Email " placeholder='Email ' />
              <input type="text" name="address" onChange={onchangHandler} value={addrData.address} id="Address" placeholder='Address' />
            </div>
            <div className="city-state-section Handel-Input">
              <input type="text" name="city" onChange={onchangHandler} value={addrData.city} id="city" placeholder='City' />
              <input type="text" name="state" onChange={onchangHandler} value={addrData.state} id="State" placeholder='State' />
            </div>
            <div className="zip-country-section Handel-Input">
              <input type="text" name="zipCode" onChange={onchangHandler} value={addrData.zipCode} id="Zip-code" placeholder='Zip Code' />
              <input type="text" name="country" onChange={onchangHandler} value={addrData.country} id="Country" placeholder='Country' />
            </div>
            <input type="Number" name='phoneNumber' onChange={onchangHandler} value={addrData.phoneNumber} placeholder='Phone Number' className='Phone-Input' />


          </div>
          <div className="order-placed-right-container">
            <div className="total-cart-table">

              <div className="subtotal">
                <p>Sub Total</p>
                <p><b> ₹</b>{addTotal()}</p>
              </div>
              <hr />
              <div className="delivery-charges">
                <p>Delivery Charges</p>
                <p>₹20</p>
              </div>
              <hr />
              <div className="All-total">
                <b>Total </b>
                <b>₹{addTotal() + 20}</b>
              </div>


            </div>
            <button type='submit' className='payment-btn' >Procced To Payment</button>

          </div>
        </div>
      </form>

    </>
  )
}

export default OrderPlaced
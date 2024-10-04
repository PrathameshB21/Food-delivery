import React from 'react'
import './Orders.css'
import { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useEffect } from 'react'
import { Assets } from '../../assets/Assets'
import { assets } from '../../../../client/src/assets/assets'


const Order = ({ url }) => {
  const [orderData, setOrderData] = useState([])

  const fetchAllorders = async (req, res) => {
    const response = await axios.get(url + '/api/order/list');
    console.log("response", response.data.data);

    if (response.status === 200) {
      setOrderData(response.data.data);


      toast.success(response.data.message)

    }
    else {
      toast.error(response.data.message)
    }

  }
  const statusHanler = async (event, _id) => {
    const response = await axios.post(url + '/api/order/updateStatus', {
      _id,
      status: event.target.value
    })
    if (response.status===200) {
        fetchAllorders()
      toast.success(response.data.message)
    } else {
      toast.error("internal server error")
    }

  }

  useEffect(() => {
    fetchAllorders();
  }, [])
  console.log("this is setorder", orderData);


  return (
    <>
      <div className="order add">
        <h3>Order page</h3>
        <div className="order-list">
          {orderData.map((order, index) => (
            <div key={index} className="order-item">
              <img src={assets.parcel_icon} alt="" />
              <div>
                <p className="order-item-food">
                  {order.items.map((item, index) => {
                    if (index === order.items.length - 1) {


                      return item.name + ' x ' + item.quantity
                    } else {
                      return item.name + ' x  ' + item.quantity + ' , '
                    }
                  })}
                  <p className='order-address-names'><b>Name:  </b>{order.address.firstName + " " + order.address.lastName}</p>
                  <p className='order-address-adress'><b>Adress:  </b>{order.address.address + ", " + order.address.city + ", " + order.address.state + ", " + order.address.country + ", " + order.address.zipCode}</p>
                  <p className='order-address-phone'><b>Contact: </b>{" " + order.address.phoneNumber}</p>
                  <p className='order-address-amount'><b>Bill: </b><span>&#8377;</span>{" " + order.amount}</p>
                  <select className='Status-updation' onChange={(event) => statusHanler(event, order._id)} value={order.status}>
                    <option value="Food Processing">Food Processing</option>
                    <option value="Out for delivery">Out for delivery</option>
                    <option value="Order delivered">Order delivered</option>
                  </select>

                </p>
              </div>
            </div>
          ))}
        </div>

      </div>

    </>
  )
}

export default Order
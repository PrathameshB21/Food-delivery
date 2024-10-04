import React, { useContext, useEffect, useState } from 'react';
import './MyOrders.css'
import { StoreContext } from '../../Context/StoreContext';
import axios from 'axios'
import { toast } from 'react-toastify'
import { assets } from '../../assets/assets';
const MyOrders = () => {
    const { url, token } = useContext(StoreContext)
    const [orderData, setOrderData] = useState([]);

    const fetchOrder = async () => {
        const response = await axios.post(url + '/api/order/userOrders', {}, {
            headers: { Authorization: `Bearer ${token}` }
        });
        // console.log(response.data);

        if (response.status == 200) {
            console.log(response.data);

            setOrderData(response.data.order)


            toast.success(response.data.message);

        }
        else {
            toast.error(response.data.message)
        }

    }
    

    useEffect(() => {
        if (token) {
            fetchOrder();

        }
    }, [token])

    return (
        <>
            <div className="userOrders">
                <h2>Order's</h2>
                {orderData.map((order, index) => {
                    return (

                        <div className="user-orders-order" key={index}>
                            <img src={assets.parcel_icon} alt="" />

                            <p>{order.items.map((item, index) => {
                                if (index === order.items.length - 1) {

                                    return (

                                        item.name + ` x ` + item.quantity
                                    )
                                } else {
                                    return (

                                        item.name + ` x ` + item.quantity + ', '
                                    )
                                }
                            })}</p>

                            <p>Items:{order.items.length}</p>
                            <h3> &#8377; <b>{order.amount}</b></h3>
                            <p><span>&#8227;</span><b>{order.status}</b></p>
                            <button onClick={fetchOrder}>Track order</button>

                        </div>
                    )
                })}
            </div>
        </>
    )
}

export default MyOrders
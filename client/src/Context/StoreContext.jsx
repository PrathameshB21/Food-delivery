import React, { createContext, useEffect, useState } from 'react'
// import { food_list } from '../assets/assets'
import axios from 'axios';
export const StoreContext = createContext()


const StoreContextProvider = (props) => {
    const [cartItem, setCartItem] = useState({});
    const [token, setToken] = useState('');
    const [food_list, setFoodList] = useState([])
    const url=import.meta.env.VITE_APP_URL;




    const addToCart = async (itemId) => {
        if (!cartItem[itemId]) {
            setCartItem((prev) => ({ ...prev, [itemId]: 1 }))
        }
        else {
            setCartItem((prev) => (

                { ...prev, [itemId]: prev[itemId] + 1 }
            )
            )
        }
       try{ if(token){
        await axios.post(url+'/api/cart/add',{itemId},
            {
                headers:{ Authorization:`Bearer ${token}`}
            })
         }}
         
        catch(error){
            console.log(error);
            
        }
        
    }
    const removeFromCart = async(itemId) => {
        setCartItem((prev) => (
            { ...prev, [itemId]: prev[itemId] - 1 }
        ))
        if(token){
            await axios.post(url+'/api/cart/remove',{itemId},{headers:{Authorization:`Bearer ${token}`}})
        }
    }
    const addTotal = () => {
        let totalAmount = 0;
        for (const item in cartItem) {
            if (cartItem[item] > 0) {
                let itemInfo = food_list.find((product) => product._id === item)
                totalAmount += itemInfo.price * cartItem[item];
            }
        }
        return totalAmount;
    }
   
    const fetchFoodList = async () => {
        const response = await axios.get(url + "/api/food/list")
        setFoodList(response.data)
       

    }
    const loadCartData=async(token)=>{
        try{const response=await axios.post(url+"/api/cart/get",{},{headers:{Authorization:`Bearer ${token}`}})
        
        setCartItem(response.data.cartData)}
        catch{
            return("server error")
        }
      
        
        
    };
    useEffect(() => {

        async function loadData() {
            await fetchFoodList();
            if (localStorage.getItem("token")) {
                setToken(localStorage.getItem("token"))
                await loadCartData(localStorage.getItem("token"))
            }

        }
        loadData();

    }, [])
   


    const contextValue = {
        food_list,
        cartItem,
        setCartItem,
        addToCart,
        removeFromCart,
        addTotal,
        url,
        token,
        setToken
    }
    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}


export default StoreContextProvider;
import React, { useContext, useEffect, useState } from 'react'
import '../FormPopup/FormPopup.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../Context/StoreContext'
import axios from 'axios'
import { toast } from 'react-toastify'
const FormPopup = ({ setShowForm }) => {
    const [formState, setFormState] = useState("SignUp")
    const [loginData, setLoginData] = useState({
        name: "",
        email: "",
        password: ""
    })

    const onchangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setLoginData(loginData => ({ ...loginData, [name]: value }))

    }
    const { url, setToken } = useContext(StoreContext)


    const handelSubmit = async (event) => {
        event.preventDefault()
        let newUrl = url;
        if (formState === 'SignUp') {
            if (!loginData.name || !loginData.email || !loginData.password) {
                return toast.warn("All fields are required")
            }
            else {
                newUrl += '/api/user/register';
                // console.log(loginData);
                // console.log(newUrl);

            }
        } else {
            if (!loginData.email || !loginData.password) {
                return toast.warn("All fields are required")
            }
            else {
                newUrl += '/api/user/login';
                // console.log(loginData);
                // console.log(newUrl);

            }

        }

       
            try {
                const response = await axios.post(newUrl, loginData);
                
                if (response.status === 200) {
                    setToken(response.data.token);
                    localStorage.setItem("token", response.data.token);
                    toast.success(response.data.message);
                    setShowForm(false);
                }
            } 
            catch (error) {
                if (error.response) {
                    // The request was made, and the server responded with a status code
                    // that falls out of the range of 2xx
                    toast.error(error.response.data.message);
                } else {
                    // Something happened in setting up the request that triggered an Error
                    toast.error("Something went wrong, please try again");
                }
            }
       

    }
    // useEffect=(()=>{console.log(formState);
    // },[formState]);

    return (
        <>
            <div className="form-popup">
                <form action="#" className="login-popup-container" onSubmit={handelSubmit}>
                    <div className="login-title">
                        <h2>{formState}</h2>
                        <img src={assets.cross_icon} alt="" className="close-form-btn" onClick={() => setShowForm(false)} />
                    </div>
                    <div className="login-input-fields">
                        {formState !== 'Login' ? <input type="text" placeholder='Enter Your Name' name='name' onChange={onchangeHandler} value={loginData.name} /> : <></>}<br />

                        <input type="email" placeholder='Enter Your Email' name='email' onChange={onchangeHandler} value={loginData.email} /><br />
                        <input type="Password" placeholder='Enter Your Pasword' name='password' onChange={onchangeHandler} value={loginData.password} />
                    </div>
                    <div className="primart-btn">
                        <button>{formState === 'SignUp' ? "Create Account" : "Login"}</button>
                    </div>

                    <div className="login-popup-condition">
                        {formState === 'SignUp' ?
                            <p>Already have an Account<br />
                                <button type='button' onClick={() => setFormState("Login")}>Login</button></p>
                            :
                            <p>Don't have an Account<br />
                                <button type='button' onClick={() => setFormState("SignUp")}>  SignUp </button></p>}
                    </div>
                </form>
            </div>

        </>
    )
}

export default FormPopup
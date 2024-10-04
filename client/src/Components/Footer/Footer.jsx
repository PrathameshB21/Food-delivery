import React from 'react'
import '../Footer/Footer.css'
import { assets } from '../../assets/assets'

const Footer = () => {
    return (
        <div className='Footer-wrpper' id='Footer'>
            <div className="Footer-left">
                <img className='Footer-logo' src={assets.logo} />
                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quas sint quae minus molestias aspernatur, autem fugiat! Voluptatum numquam exercitationem possimus accusamus doloremque quis, porro praesentium maiores modi aliquam a labore!</p>
                <div className="footer-icons">
                    <img src={assets.facebook_icon} alt="" />
                    <img src={assets.twitter_icon} alt="" />
                    <img src={assets.linkedin_icon}/>
                </div>
            </div>
            <div className="Footer-mid">
                <h2>Company</h2>
                <ul>
                    <li>Home</li>
                    <li>About-us</li>
                    <li>Delivery</li>
                    <li>Privacy-Policy</li>
                </ul>
            </div>
            <div className="Footer-right">
                <h2>Get In Touch</h2>
                <p>+91-124-4567-789</p>
                <h5>Tomato@gmail.com</h5>
            </div>

        </div>
    )
}

export default Footer
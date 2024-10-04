import React, { useContext, useState } from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { HashLink } from 'react-router-hash-link';
import { StoreContext } from '../../Context/StoreContext';

const Navbar = ({ setShowForm }) => {
    const [isActive, setIsActive] = useState("home");
    const { token, setToken } = useContext(StoreContext)
    const navigate=useNavigate();
    const logout=()=>{
        localStorage.removeItem("token");
        setToken("");
        navigate("/")
        
    }
    return (<div className='navbar'>
        <Link to='/' className='nav-logo'><img src={assets.logo} /></Link>
        <ul className='nav-list'>
            <Link to='/'> <li onClick={() => setIsActive('home')} className={isActive === "home" ? "active" : ''}>Home</li></Link>
            <HashLink to='/#ExploreMenu'> <li onClick={() => setIsActive('menu')} className={isActive === "menu" ? "active" : ''}>Menu</li></HashLink>

            <HashLink to='/#Footer'><li onClick={() => setIsActive('contact-us')} className={isActive === "contact-us" ? "active" : ''}> Contact-Us</li>  </HashLink>
        </ul>
        <div className='nav-icons'>
            <img src={assets.search_icon} alt="" />
            <div className='nav-basket_icon' >
                <Link to='/Cart'><img src={assets.basket_icon} alt="" /></Link>

                <div className='dot'></div>
            </div>
            {!token ? <button type='submit' onClick={() => setShowForm(true)} className='nav-btn'>Sign In</button> :
                <div className="nav-profile">
                    <img src={assets.profile_icon} alt="" />
                    <ul className='nav-profile-dropdown'>
                        <li onClick={()=>{navigate('/myOrders')}}><img src={assets.bag_icon} alt="" /><p>Order's</p></li>
                        <hr />
                        <li onClick={logout}><img src={assets.logout_icon} alt="" /><p>Logout</p></li>

                    </ul>
                </div>
            }
        </div>

    </div>
    )
}

export default Navbar
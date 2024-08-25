import { useEffect, useState } from 'react';
import logo from './../../images/logo.png'
import { Link, Navigate, Router } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearCredentials } from '../../features/auth/authSlice';
import { api } from '../../Api';
import { API_URL } from '../../_env';
import best1 from './../../images/best-1.png'
import axios from 'axios';
import { fetchCartDetails, fetchCartProductDetails, removeProductFromCart, updateProductQuantity } from '../../features/cart/cartSlice';
import { AppDispatch, RootState } from '../../store';
type Category = {
    id: number,
    name: string
}
const Header = () => {
    const [showLangOptions, setShowLangOptions] = useState(false)
    const [categories, setCategories] = useState<Category[]>([])
    const [showMenu, setShowMenu] = useState(false)
    const [showProfile, setShowProfile] = useState(false)
    const auth = useSelector((state:any) => state.auth);
    const [showCart, setShowCart] = useState(false)
    const dispatch = useDispatch<AppDispatch>()

    const handleLogOut = async () => {
        console.log("logo out");
        try {
            const response = await api.post(API_URL + '/user/logout/');
          } catch (error) {
            console.error(error);
          }      
        dispatch(clearCredentials());
        return <Navigate to="/login" />;
    }
    
    
    const fetchCategories = async () => {
        console.log("logo out");
        try {
            const response = await axios.get(API_URL + '/oscar/categories/');
            if (response.data.status)
                setCategories(response.data.data)
          } catch (error) {
            console.error(error);
          }      
    }
    const Cart = useSelector((state: RootState) => state.cart);

    useEffect(() => {
        
        fetchCategories()
    }, [])
    const [getCart, setGetCart] = useState(false)
    useEffect(() => {
        dispatch(fetchCartDetails()).then(() => {
            dispatch(fetchCartProductDetails({cartId: Cart.cart?.id || 0}))
        })
    }, [dispatch])
    return (
        <header>
            <div className="top">
                <div className="container">
                    <span></span>
                    <p>
                        Shop & Get Free Shipping & Free Maintenance on All PC's
                        <a href="">
                        ShopNow
                        </a>
                    </p>
                    <div className="lang_select">
                        <div className="head">
                            English
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12.3626 12.95L17.3126 8L18.7266 9.414L12.3626 15.778L5.99856 9.414L7.41256 8L12.3626 12.95Z" fill="white"/>
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
            <div className="header">
                <div className="container">
                    <div className="logo_wrapper">
                        <svg onClick={() => {setShowMenu(true)}} width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M21.375 12C21.375 12.2984 21.2565 12.5845 21.0455 12.7955C20.8345 13.0065 20.5484 13.125 20.25 13.125H3.75C3.45163 13.125 3.16548 13.0065 2.9545 12.7955C2.74353 12.5845 2.625 12.2984 2.625 12C2.625 11.7016 2.74353 11.4155 2.9545 11.2045C3.16548 10.9935 3.45163 10.875 3.75 10.875H20.25C20.5484 10.875 20.8345 10.9935 21.0455 11.2045C21.2565 11.4155 21.375 11.7016 21.375 12ZM3.75 7.125H20.25C20.5484 7.125 20.8345 7.00647 21.0455 6.7955C21.2565 6.58452 21.375 6.29837 21.375 6C21.375 5.70163 21.2565 5.41548 21.0455 5.2045C20.8345 4.99353 20.5484 4.875 20.25 4.875H3.75C3.45163 4.875 3.16548 4.99353 2.9545 5.2045C2.74353 5.41548 2.625 5.70163 2.625 6C2.625 6.29837 2.74353 6.58452 2.9545 6.7955C3.16548 7.00647 3.45163 7.125 3.75 7.125ZM20.25 16.875H3.75C3.45163 16.875 3.16548 16.9935 2.9545 17.2045C2.74353 17.4155 2.625 17.7016 2.625 18C2.625 18.2984 2.74353 18.5845 2.9545 18.7955C3.16548 19.0065 3.45163 19.125 3.75 19.125H20.25C20.5484 19.125 20.8345 19.0065 21.0455 18.7955C21.2565 18.5845 21.375 18.2984 21.375 18C21.375 17.7016 21.2565 17.4155 21.0455 17.2045C20.8345 16.9935 20.5484 16.875 20.25 16.875Z" fill="black"/>
                        </svg>
                        <img src={logo} className='logo' />
                    </div>
                    <nav className="links">
                        <Link to={'/'} className='active'>Home</Link>
                        <a href="">Shop</a>
                        <a href="">Services</a>
                        <a href="">ProPc</a>
                        <a href="">Blog</a>
                    </nav>
                    <div className="main_menu">
                        <form action="" className="search_wrapper">
                            <input type="text" name="search" id="search" placeholder='What are you looking for?' />
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M20 20L16.2223 16.2156M18.3158 11.1579C18.3158 13.0563 17.5617 14.8769 16.2193 16.2193C14.8769 17.5617 13.0563 18.3158 11.1579 18.3158C9.2595 18.3158 7.43886 17.5617 6.0965 16.2193C4.75413 14.8769 4 13.0563 4 11.1579C4 9.2595 4.75413 7.43886 6.0965 6.0965C7.43886 4.75413 9.2595 4 11.1579 4C13.0563 4 14.8769 4.75413 16.2193 6.0965C17.5617 7.43886 18.3158 9.2595 18.3158 11.1579V11.1579Z" stroke="black" stroke-width="1.5" stroke-linecap="round"/>
                            </svg>
                        </form>
                        <a href="" className='search_link'>
                            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M20 20L16.2223 16.2156M18.3158 11.1579C18.3158 13.0563 17.5617 14.8769 16.2193 16.2193C14.8769 17.5617 13.0563 18.3158 11.1579 18.3158C9.2595 18.3158 7.43886 17.5617 6.0965 16.2193C4.75413 14.8769 4 13.0563 4 11.1579C4 9.2595 4.75413 7.43886 6.0965 6.0965C7.43886 4.75413 9.2595 4 11.1579 4C13.0563 4 14.8769 4.75413 16.2193 6.0965C17.5617 7.43886 18.3158 9.2595 18.3158 11.1579V11.1579Z" stroke="black" stroke-width="1.5" stroke-linecap="round"/>
                            </svg>
                        </a>
                        <Link to={'/wishlist'}>
                            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M11 7C8.239 7 6 9.216 6 11.95C6 14.157 6.875 19.395 15.488 24.69C15.6423 24.7839 15.8194 24.8335 16 24.8335C16.1806 24.8335 16.3577 24.7839 16.512 24.69C25.125 19.395 26 14.157 26 11.95C26 9.216 23.761 7 21 7C18.239 7 16 10 16 10C16 10 13.761 7 11 7Z" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </Link>
                        <button onClick={() => {setShowCart(true)}} style={{border: "none", background: 'transparent', position: 'relative'}}>
                            {
                                (Cart.cart?.num_lines || 0) > 0 && (
                                    <span 
                                    style={{
                                        background: '#DB4444',
                                        color: '#fff',
                                        width: '25px',
                                        height: '25px',
                                        position: 'absolute',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        borderRadius: '50%',
                                        top: '-11px',
                                        right: '-11px'
                                    }}>
                                        {(Cart.cart?.num_lines || 0) > 99 ? ("+" + (Cart.cart?.num_lines || 0)) : (Cart.cart?.num_lines || 0)}
                                    </span>
                                )
                            }
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8.25 20.25C8.66421 20.25 9 19.9142 9 19.5C9 19.0858 8.66421 18.75 8.25 18.75C7.83579 18.75 7.5 19.0858 7.5 19.5C7.5 19.9142 7.83579 20.25 8.25 20.25Z" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M18.75 20.25C19.1642 20.25 19.5 19.9142 19.5 19.5C19.5 19.0858 19.1642 18.75 18.75 18.75C18.3358 18.75 18 19.0858 18 19.5C18 19.9142 18.3358 20.25 18.75 20.25Z" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M2.25 3.75H5.25L7.5 16.5H19.5" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M7.5 12.5H19.1925C19.2792 12.5001 19.3633 12.4701 19.4304 12.4151C19.4975 12.3601 19.5434 12.2836 19.5605 12.1986L20.9105 5.44859C20.9214 5.39417 20.92 5.338 20.9066 5.28414C20.8931 5.23029 20.8679 5.18009 20.8327 5.13717C20.7975 5.09426 20.7532 5.05969 20.703 5.03597C20.6528 5.01225 20.598 4.99996 20.5425 5H6" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </button>
                        <button className='account_btn' onClick={() => {setShowProfile(!showProfile)}}>
                            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M24 27V24.3333C24 22.9188 23.5224 21.5623 22.6722 20.5621C21.8221 19.5619 20.669 19 19.4667 19H11.5333C10.331 19 9.17795 19.5619 8.32778 20.5621C7.47762 21.5623 7 22.9188 7 24.3333V27" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M16.5 14C18.9853 14 21 11.9853 21 9.5C21 7.01472 18.9853 5 16.5 5C14.0147 5 12 7.01472 12 9.5C12 11.9853 14.0147 14 16.5 14Z" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                            {
                                showProfile && (
                                    <div className="menu-pop">
                                        {
                                            auth.isAuthenticated ? (
                                                <>
                                                <h2>Hello, {auth.name}</h2>
                                                <Link to={'/profile'}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-user" width="20" height="20" viewBox="0 0 24 24" stroke-width="1.5" stroke="#000000" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                                    <path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" />
                                                    <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
                                                    </svg>
                                                    My Account
                                                </Link>
                                                <button onClick={handleLogOut}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-logout-2" width="20" height="20" viewBox="0 0 24 24" stroke-width="1.5" stroke="#000000" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                                    <path d="M10 8v-2a2 2 0 0 1 2 -2h7a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-7a2 2 0 0 1 -2 -2v-2" />
                                                    <path d="M15 12h-12l3 -3" />
                                                    <path d="M6 15l-3 -3" />
                                                    </svg>
                                                    Logout
                                                </button>
                                                </>
                                            ) : (
                                                <>
                                                    <Link to={'/login'}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-login-2" width="20" height="20" viewBox="0 0 24 24" stroke-width="1.5" stroke="#000000" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                                        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                                        <path d="M9 8v-2a2 2 0 0 1 2 -2h7a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-7a2 2 0 0 1 -2 -2v-2" />
                                                        <path d="M3 12h13l-3 -3" />
                                                        <path d="M13 15l3 -3" />
                                                        </svg>
                                                        Login
                                                    </Link>
                                                    <Link to={"/register"}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-user-plus" width="20" height="20" viewBox="0 0 24 24" stroke-width="1.5" stroke="#000000" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                                        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                                        <path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" />
                                                        <path d="M16 19h6" />
                                                        <path d="M19 16v6" />
                                                        <path d="M6 21v-2a4 4 0 0 1 4 -4h4" />
                                                        </svg>
                                                        Register
                                                    </Link>
                                                </>
                                            )
                                        }
                                    </div>
                                )
                            }
                        </button>
                    </div>
                </div>
            </div>
            {
                showMenu && (
                    <div className="responsive_menu">
                        <div className="head">
                            <h1>Menu</h1>
                            <button onClick={()=> {setShowMenu(false)}}>
                                Close
                                <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M16.7907 14.962C16.9668 15.1381 17.0658 15.377 17.0658 15.626C17.0658 15.8751 16.9668 16.114 16.7907 16.2901C16.6146 16.4662 16.3757 16.5652 16.1266 16.5652C15.8776 16.5652 15.6387 16.4662 15.4626 16.2901L10.5024 11.3284L5.54069 16.2885C5.36457 16.4647 5.1257 16.5636 4.87663 16.5636C4.62755 16.5636 4.38868 16.4647 4.21256 16.2885C4.03644 16.1124 3.9375 15.8735 3.9375 15.6245C3.9375 15.3754 4.03644 15.1365 4.21256 14.9604L9.17428 10.0003L4.21413 5.03854C4.03801 4.86242 3.93906 4.62355 3.93906 4.37448C3.93906 4.12541 4.03801 3.88654 4.21413 3.71042C4.39025 3.53429 4.62912 3.43535 4.87819 3.43535C5.12726 3.43535 5.36613 3.53429 5.54225 3.71042L10.5024 8.67213L15.4641 3.70963C15.6402 3.53351 15.8791 3.43457 16.1282 3.43457C16.3773 3.43457 16.6161 3.53351 16.7922 3.70963C16.9684 3.88575 17.0673 4.12462 17.0673 4.3737C17.0673 4.62277 16.9684 4.86164 16.7922 5.03776L11.8305 10.0003L16.7907 14.962Z" fill="#4B4A42"/>
                                </svg>
                            </button>
                        </div>
                        <Link to="/" className='active'>Home</Link>
                        <a href="">Shop</a>
                        <a href="">Services</a>
                        <a href="">ProPc</a>
                        <a href="">Blog</a>
                        <Link to="/Login" className="login">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="8" cy="8" r="7.73333" stroke="black" stroke-width="0.533333"/>
                            <path d="M5.74066 9.45084C5.15117 9.80184 3.60557 10.5185 4.54694 11.4154C5.0068 11.8535 5.51896 12.1668 6.16286 12.1668H9.83713C10.481 12.1668 10.9932 11.8535 11.453 11.4154C12.3944 10.5185 10.8488 9.80184 10.2593 9.45084C8.877 8.62771 7.123 8.62771 5.74066 9.45084Z" stroke="black" stroke-width="0.625" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M9.875 5.7085C9.875 6.74403 9.03554 7.5835 8 7.5835C6.96447 7.5835 6.125 6.74403 6.125 5.7085C6.125 4.67296 6.96447 3.8335 8 3.8335C9.03554 3.8335 9.875 4.67296 9.875 5.7085Z" stroke="black" stroke-width="0.625"/>
                            </svg>
                            Login in
                        </Link>
                        <Link to="/Register" className="login">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8.21094 12.1663H5.7488C5.10489 12.1663 4.59273 11.853 4.13288 11.4149C3.19151 10.518 4.7371 9.80133 5.32659 9.45033C6.20193 8.92913 7.22627 8.73796 8.21094 8.87683C8.56823 8.92721 8.91619 9.02108 9.2526 9.15838" stroke="black" stroke-width="0.625" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M9.875 5.7085C9.875 6.74403 9.03554 7.5835 8 7.5835C6.96447 7.5835 6.125 6.74403 6.125 5.7085C6.125 4.67296 6.96447 3.8335 8 3.8335C9.03554 3.8335 9.875 4.67296 9.875 5.7085Z" stroke="black" stroke-width="0.625"/>
                            <path d="M10.7083 12.1667V9.25M9.25 10.7083H12.1667" stroke="black" stroke-width="0.625" stroke-linecap="round"/>
                            <circle cx="8" cy="8" r="7.73333" stroke="black" stroke-width="0.533333"/>
                            </svg>
                            Create an account
                        </Link>
                        <div className="lang">
                            <h2>
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M7.99479 14.6663C11.6767 14.6663 14.6615 11.6816 14.6615 7.99968C14.6615 4.31778 11.6767 1.33301 7.99479 1.33301C4.31289 1.33301 1.32812 4.31778 1.32812 7.99968C1.32812 11.6816 4.31289 14.6663 7.99479 14.6663Z" stroke="black" stroke-width="0.7" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M5.33177 2H5.99844C4.69844 5.89333 4.69844 10.1067 5.99844 14H5.33177" stroke="black" stroke-width="0.7" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M10 2C11.3 5.89333 11.3 10.1067 10 14" stroke="black" stroke-width="0.7" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M2 10.6667V10C5.89333 11.3 10.1067 11.3 14 10V10.6667" stroke="black" stroke-width="0.7" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M2 5.9999C5.89333 4.6999 10.1067 4.6999 14 5.9999" stroke="black" stroke-width="0.7" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                                Language
                            </h2>
                            <div className="btns">
                                <button className='selected'>English</button>
                                <button>العربية</button>
                            </div>
                        </div>
                    </div>
                )
            }
            {/* <div className="categories">
                <div className="container">
                    <a href="">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g opacity="0.5">
                        <path d="M11 2C10.4477 2 10 2.44772 10 3C10 3.55228 10.4477 4 11 4V2ZM13.3438 4C13.896 4 14.3438 3.55228 14.3438 3C14.3438 2.44772 13.896 2 13.3438 2V4ZM13 18.8594C13 18.3071 12.5523 17.8594 12 17.8594C11.4477 17.8594 11 18.3071 11 18.8594H13ZM11 18.8702C11 19.4225 11.4477 19.8702 12 19.8702C12.5523 19.8702 13 19.4225 13 18.8702H11ZM7.3125 3.625H16.6875V1.625H7.3125V3.625ZM16.6875 3.625C16.7824 3.625 16.8594 3.70195 16.8594 3.79688H18.8594C18.8594 2.59738 17.887 1.625 16.6875 1.625V3.625ZM16.8594 3.79688V20.2031H18.8594V3.79688H16.8594ZM16.8594 20.2031C16.8594 20.298 16.7824 20.375 16.6875 20.375V22.375C17.887 22.375 18.8594 21.4026 18.8594 20.2031H16.8594ZM16.6875 20.375H7.3125V22.375H16.6875V20.375ZM7.3125 20.375C7.21758 20.375 7.14062 20.298 7.14062 20.2031H5.14062C5.14062 21.4026 6.11301 22.375 7.3125 22.375V20.375ZM7.14062 20.2031V3.79688H5.14062V20.2031H7.14062ZM7.14062 3.79688C7.14062 3.70195 7.21758 3.625 7.3125 3.625V1.625C6.11301 1.625 5.14062 2.59738 5.14062 3.79688H7.14062ZM11 4H13.3438V2H11V4ZM11 18.8594V18.8702H13V18.8594H11ZM6.5 17.5H17.5V15.5H6.5V17.5Z" fill="white"/>
                        </g>
                        </svg>
                        Phones
                    </a>
                    <a href="">
                        <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g opacity="0.5">
                        <path d="M7.20313 20H17.2031M9.20312 16V20M15.2031 16V20M3.6317 13.7143H20.7746M4.20312 4H20.2031C20.7554 4 21.2031 4.44772 21.2031 5V15C21.2031 15.5523 20.7554 16 20.2031 16H4.20312C3.65084 16 3.20312 15.5523 3.20312 15V5C3.20312 4.44772 3.65084 4 4.20312 4Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </g>
                        </svg>
                        Computers
                    </a>
                    <a href="">
                        <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g opacity="0.5">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M4.39844 7C3.84615 7 3.39844 7.44772 3.39844 8V16C3.39844 16.5523 3.84615 17 4.39844 17H20.3984C20.9507 17 21.3984 16.5523 21.3984 16V8C21.3984 7.44772 20.9507 7 20.3984 7H4.39844ZM1.39844 8C1.39844 6.34315 2.74158 5 4.39844 5H20.3984C22.0553 5 23.3984 6.34315 23.3984 8V16C23.3984 17.6569 22.0553 19 20.3984 19H4.39844C2.74158 19 1.39844 17.6569 1.39844 16V8Z" fill="white"/>
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M8.39844 9C8.95072 9 9.39844 9.44771 9.39844 10V11H10.3984C10.9507 11 11.3984 11.4477 11.3984 12C11.3984 12.5523 10.9507 13 10.3984 13H9.39844V14C9.39844 14.5523 8.95072 15 8.39844 15C7.84615 15 7.39844 14.5523 7.39844 14V13H6.39844C5.84615 13 5.39844 12.5523 5.39844 12C5.39844 11.4477 5.84615 11 6.39844 11H7.39844V10C7.39844 9.44771 7.84615 9 8.39844 9Z" fill="white"/>
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M15.3984 9.5C16.2269 9.5 16.8984 10.1716 16.8984 11V11.0104C16.8984 11.8388 16.2269 12.5104 15.3984 12.5104C14.57 12.5104 13.8984 11.8388 13.8984 11.0104V11C13.8984 10.1716 14.57 9.5 15.3984 9.5Z" fill="white"/>
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M18.3984 11.5C19.2269 11.5 19.8984 12.1715 19.8984 13V13.0103C19.8984 13.8387 19.2269 14.5103 18.3984 14.5103C17.57 14.5103 16.8984 13.8387 16.8984 13.0103V13C16.8984 12.1715 17.57 11.5 18.3984 11.5Z" fill="white"/>
                        </g>
                        </svg>
                        Smart Watches
                    </a>
                    <a href="">
                        <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g opacity="0.5">
                        <path d="M5.60156 7H6.60156C7.132 7 7.6407 6.78929 8.01578 6.41421C8.39085 6.03914 8.60156 5.53043 8.60156 5C8.60156 4.73478 8.70692 4.48043 8.89446 4.29289C9.08199 4.10536 9.33635 4 9.60156 4H15.6016C15.8668 4 16.1211 4.10536 16.3087 4.29289C16.4962 4.48043 16.6016 4.73478 16.6016 5C16.6016 5.53043 16.8123 6.03914 17.1873 6.41421C17.5624 6.78929 18.0711 7 18.6016 7H19.6016C20.132 7 20.6407 7.21071 21.0158 7.58579C21.3908 7.96086 21.6016 8.46957 21.6016 9V18C21.6016 18.5304 21.3908 19.0391 21.0158 19.4142C20.6407 19.7893 20.132 20 19.6016 20H5.60156C5.07113 20 4.56242 19.7893 4.18735 19.4142C3.81228 19.0391 3.60156 18.5304 3.60156 18V9C3.60156 8.46957 3.81228 7.96086 4.18735 7.58579C4.56242 7.21071 5.07113 7 5.60156 7Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M12.6016 16C14.2584 16 15.6016 14.6569 15.6016 13C15.6016 11.3431 14.2584 10 12.6016 10C10.9447 10 9.60156 11.3431 9.60156 13C9.60156 14.6569 10.9447 16 12.6016 16Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </g>
                        </svg>
                        Cameras
                    </a>
                    <a href="">
                        <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g opacity="0.5">
                        <path d="M4.79688 15V18C4.79688 19.1046 5.69231 20 6.79688 20H7.79688C8.90144 20 9.79688 19.1046 9.79688 18V15C9.79688 13.8954 8.90144 13 7.79688 13H6.79688C5.69231 13 4.79688 13.8954 4.79688 15ZM4.79688 15V12C4.79688 9.87827 5.63973 7.84344 7.14002 6.34315C8.64031 4.84285 10.6751 4 12.7969 4C14.9186 4 16.9534 4.84285 18.4537 6.34315C19.954 7.84344 20.7969 9.87827 20.7969 12L20.7969 15M20.7969 15C20.7969 13.8954 19.9014 13 18.7969 13H17.7969C16.6923 13 15.7969 13.8954 15.7969 15V18C15.7969 19.1046 16.6923 20 17.7969 20H18.7969C19.9014 20 20.7969 19.1046 20.7969 18V15Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </g>
                        </svg>
                        Headphones
                    </a>
                    <a href="">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g opacity="0.5">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M4 7C3.44772 7 3 7.44772 3 8V16C3 16.5523 3.44772 17 4 17H20C20.5523 17 21 16.5523 21 16V8C21 7.44772 20.5523 7 20 7H4ZM1 8C1 6.34315 2.34315 5 4 5H20C21.6569 5 23 6.34315 23 8V16C23 17.6569 21.6569 19 20 19H4C2.34315 19 1 17.6569 1 16V8Z" fill="white"/>
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M8 9C8.55228 9 9 9.44771 9 10V11H10C10.5523 11 11 11.4477 11 12C11 12.5523 10.5523 13 10 13H9V14C9 14.5523 8.55228 15 8 15C7.44772 15 7 14.5523 7 14V13H6C5.44772 13 5 12.5523 5 12C5 11.4477 5.44772 11 6 11H7V10C7 9.44771 7.44772 9 8 9Z" fill="white"/>
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M15 9.5C15.8284 9.5 16.5 10.1716 16.5 11V11.0104C16.5 11.8388 15.8284 12.5104 15 12.5104C14.1716 12.5104 13.5 11.8388 13.5 11.0104V11C13.5 10.1716 14.1716 9.5 15 9.5Z" fill="white"/>
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M18 11.5C18.8284 11.5 19.5 12.1715 19.5 13V13.0103C19.5 13.8387 18.8284 14.5103 18 14.5103C17.1716 14.5103 16.5 13.8387 16.5 13.0103V13C16.5 12.1715 17.1716 11.5 18 11.5Z" fill="white"/>
                        </g>
                        </svg>
                        Gaming
                    </a>
                </div>
            </div> */}
            <div className="categories">
                <div className="container">
                    {
                        (categories && categories.length > 0) && (
                            categories.map(
                                category => (
                                    <Link to={'/category/' + category.id + '/' + category.name}>
                                        {category.name}
                                    </Link>                
                                )
                            )
                        )
                    }
                </div>
            </div>
            {
                showCart && (       
                    <>
                        <div className="hide-content" onClick={() => {setShowCart(false)}}></div>
                        <div className="cart">
                            <div className="cart_wrapper">
                                <div className="head">
                                    <h1>Cart</h1>
                                    <h2>{Cart.cart?.num_lines} items</h2>
                                </div>
                                <div className="products">
                                    {
                                        Cart.cart?.num_lines ? (
                                            Cart.status === 'succeeded' &&
                                            Cart.cart && 
                                            Array.isArray(Cart.cart.lines) && 
                                            Cart.cart.lines.length > 0 ? (
                                                Cart.cart?.lines?.map(item => (
                                                    <div className="product" >
                                                        <div>
                                                            <Link to={'/product/' + item.product_detail.id}>
                                                                <img src={item.product_detail.images[0].original} alt="" />
                                                            </Link>
                                                            <div className="text">
                                                                <Link style={{textDecoration: 'none'}} to={'/product/' + item.product_detail.id}>
                                                                    <h3 style={{maxWidth: 200}}>{item.product_detail.title.length > 45 ? item.product_detail.title.slice(0, 45) + " ..." : item.product_detail.title}</h3>
                                                                </Link>
                                                                <div className="quantity" style={{width: 'max-content'}}>
                                                                    <button style={{cursor: 'pointer'}} onClick={() => {
                                                                        dispatch(updateProductQuantity({cartId: Cart.cart?.id || 0, itemId: item.id, quantity: (item.quantity > 1 ? item.quantity - 1 : item.quantity)}))
                                                                    }}>
                                                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                        <path d="M3.22656 8H12.5599" stroke="#121212" stroke-width="0.75" stroke-linecap="round" stroke-linejoin="round"/>
                                                                        </svg>
                                                                    </button>
                                                                    {item.quantity}
                                                                    <button style={{cursor: 'pointer'}} onClick={() => {
                                                                        dispatch(updateProductQuantity({cartId: Cart.cart?.id || 0, itemId: item.id, quantity: (item.quantity + 1)}))
                                                                    }}>
                                                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M8.3776 3.3335C8.3776 3.12639 8.20971 2.9585 8.0026 2.9585C7.7955 2.9585 7.6276 3.12639 7.6276 3.3335V7.62516H3.33594C3.12883 7.62516 2.96094 7.79306 2.96094 8.00016C2.96094 8.20727 3.12883 8.37516 3.33594 8.37516H7.6276V12.6668C7.6276 12.8739 7.7955 13.0418 8.0026 13.0418C8.20971 13.0418 8.3776 12.8739 8.3776 12.6668V8.37516H12.6693C12.8764 8.37516 13.0443 8.20727 13.0443 8.00016C13.0443 7.79306 12.8764 7.62516 12.6693 7.62516H8.3776V3.3335Z" fill="#121212"/>
                                                                        </svg>
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div style={{whiteSpace: 'nowrap'}}>
                                                            <h3 className="price">
                                                                {item.product_detail.price.excl_tax + " " + item.product_detail.price.currency}
                                                            </h3>
                                                            <button onClick={() => {
                                                                dispatch(removeProductFromCart({cartId: Cart.cart?.id || 0, itemId: item.id}))
                                                            }}>
                                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M5.29289 5.29289C5.68342 4.90237 6.31658 4.90237 6.70711 5.29289L12 10.5858L17.2929 5.29289C17.6834 4.90237 18.3166 4.90237 18.7071 5.29289C19.0976 5.68342 19.0976 6.31658 18.7071 6.70711L13.4142 12L18.7071 17.2929C19.0976 17.6834 19.0976 18.3166 18.7071 18.7071C18.3166 19.0976 17.6834 19.0976 17.2929 18.7071L12 13.4142L6.70711 18.7071C6.31658 19.0976 5.68342 19.0976 5.29289 18.7071C4.90237 18.3166 4.90237 17.6834 5.29289 17.2929L10.5858 12L5.29289 6.70711C4.90237 6.31658 4.90237 5.68342 5.29289 5.29289Z" fill="#6C7275"/>
                                                                </svg>
                                                            </button>
                                                        </div>
                                                    </div>
                                                ))
                                            ) : (
                                                <h3 style={{minWidth: 300, marginTop: 40, marginBottom: 40}}>Loading ...</h3>
                                            )
                                        ) : (
                                            <h3 style={{minWidth: 300, marginTop: 40, marginBottom: 40, textAlign: 'center'}}>There is no added items</h3>
                                        )
                                    }
                                </div>
                                {
                                    ((Cart.cart?.num_lines || 0) > 0) && (
                                        <div className="bottom">
                                            <p>
                                                <span>Subtotal</span>
                                                <span>{Cart.cart?.total_excl_tax + " " + Cart.cart?.currency}</span>
                                            </p>
                                            <h4>
                                                <span>Subtotal</span>
                                                <span>{Cart.cart?.total_excl_tax + " " + Cart.cart?.currency}</span>
                                            </h4>
                                            <button>Checkout</button>
                                            <Link to={'/cart'}>View Cart</Link>
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                    </>
                )
            }
        </header>
    )
}

export default Header;
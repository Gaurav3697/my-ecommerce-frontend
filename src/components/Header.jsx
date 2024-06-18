import React, { Fragment, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useSelector } from 'react-redux';

const Header = () => { 
    const {cartItems} = useSelector((state)=>state.cart);
    //when user is logged out redirect him directly to login page
    return (
        <Fragment>
            {/* notes:-if you will put all the sections in flex container it will be difficult to justify their position */}
            {/* notes:-if you put yur header fixed it is difficult to justify containers.Giving the header bg-colr to style is best idea */} 
            <header className='text-gray-500 fixed top-0 bg-white w-screen h-20 z-20'>
                <div className='mx-auto flex flex-wrap p-5 flex-row item-center gap-x-28'>
                    <div className='flex'>
                        <img src="./logo.ico" alt="logo" className='h-20' />
                    </div>
                    <nav className='m-auto flex flex-wrap item-center text-base space-x-16'>
                        <Link to={'/'} className='font-semibold text-xl hover:text-gray-900 hover:cursor-pointer transition-colors duration-300'>Home</Link>
                        <Link to={'/Products'} className='font-semibold text-xl hover:text-gray-900 hover:cursor-pointer transition-colors duration-300'>Products</Link>
                        <Link to={'/Category'} className='font-semibold text-xl hover:text-gray-900 hover:cursor-pointer transition-colors duration-300'>Category<KeyboardArrowDownIcon/></Link>
                        <Link to={'/Contact'} className='font-semibold text-xl hover:text-gray-900 hover:cursor-pointer transition-colors duration-300'>Contact</Link>
                    </nav>
                    <div className='m-auto flex items-center justify-end space-x-10'>
                        <Link to={'/cart'} className='hover:text-gray-900 text-xl hover:cursor-pointer transition-colors duration-300'><ShoppingCartOutlinedIcon /> <span className='text-sm -tracking-tighter'>cart({cartItems.length})</span> </Link>
                        <Link to={'/login'} className='hover:text-gray-900 text-xl hover:cursor-pointer transition-colors duration-300'><AccountCircleOutlinedIcon /></Link>
                        <span className='hover:text-gray-900 text-xl hover:cursor-pointer transition-colors duration-300'><SearchOutlinedIcon /></span>
                    </div>
                </div>
            </header>
        </Fragment>
    )
}

export default Header
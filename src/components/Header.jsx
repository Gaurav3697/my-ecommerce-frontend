import React, { Fragment, useState } from 'react'
import { Link } from 'react-router-dom'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'


const Header = () => {
    const { cartItems } = useSelector((state) => state.cart);
    const { user } = useSelector((state) => state.user);
    const [keyword, setKeyword] = useState("");
    const navigate = useNavigate();
    const searchSubmitHandler = (e) => {
        e.preventDefault();
        console.log(keyword);
        if (keyword.trim()) {
            navigate(`/product/${keyword}`)
        } else {
            navigate(`/product`)
        }
    }
    //when user is logged out redirect him directly to login page
    return (
        <Fragment>
        <header className='text-gray-500 fixed top-0 bg-white w-full h-20 z-20 shadow-md'>
          <div className='container mx-auto flex flex-wrap p-4 items-center justify-between'>
            <div className='flex items-center'>
              <img src="/logo.jpg" alt="logo" className='h-10 md:h-15' />
            </div>
            <nav className='flex-1 hidden md:flex items-center justify-center space-x-4 gap-2 lg:gap-10'>
              <Link to={'/'} className='font-semibold text-xl hover:text-gray-900 transition-colors duration-300'>Home</Link>
              <Link to={'/Product'} className='font-semibold text-xl hover:text-gray-900 transition-colors duration-300'>Products</Link>
            </nav>

            <div className='flex-1 flex items-center justify-center lg:gap-3'>
              <input 
                onChange={(e) => setKeyword(e.target.value)} 
                id="search" 
                name="search" 
                type="search" 
                placeholder="Search in GElectronics" 
                className="p-2 w-full md:w-auto border-0 py-1.5 text-gray-900 shadow-sm rounded-2xl ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" 
              />
              <span onClick={searchSubmitHandler} className='ml-2 text-blue-950 text-lg cursor-pointer hover:text-blue-700 transition-colors duration-300 px-4 py-1 border rounded-2xl bg-blue-400'>
                <SearchOutlinedIcon />
              </span>
            </div>


            <div className='flex items-center space-x-4 md:space-x-8 mt-4 md:mt-0 z-10 lg:right-6 lg:gap-12'>
              <Link to={'/cart'} className='hover:text-gray-900 text-lg md:text-xl transition-colors duration-300'>
                <ShoppingCartOutlinedIcon />
                <span className='text-sm'>cart({cartItems.length})</span>
              </Link>
              <Link to={'/login'} className='hover:text-gray-900 text-lg md:text-xl transition-colors duration-300 '>
                <AccountCircleOutlinedIcon />
                <span className='text-sm'>{user ? user.name : ""}Login</span>
              </Link>
            </div>
          </div>
        </header>
      </Fragment>
      

    )
}

export default Header
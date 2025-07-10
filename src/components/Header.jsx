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
<header className='text-white fixed top-0 bg-transparent w-full h-auto z-20 shadow-md'>
  <div className='flex flex-wrap p-2 md:p-4 items-center justify-between'>
          <div className='flex items-center'>
            <span className="logo irish-grover-regular text-4xl">GM</span>
          </div>
          <nav className='mx-20 left flex-1 flex items-center justify-start space-x-1 md:space-x-4 gap-0.5 md:gap-2 lg:gap-10'>
            <Link to={'/'} className='font-semibold text-sm hover:text-gray-900 transition-colors duration-300'>Home</Link>
            <Link to={'/Product'} className='font-semibold text-sm hover:text-gray-900 transition-colors duration-300'>Products</Link>
            {
              user && user.role === "admin" ? (<Link to={'/admin/Products'} className='font-semibold text-sm hover:text-gray-900 transition-colors duration-300'>Admin</Link>
              ) : (" ")
            }
          </nav>


            {/* search bar */}
          {/* <div className='flex-1 hidden md:flex items-center justify-center lg:gap-3 mr-6'>
            <input
              onChange={(e) => setKeyword(e.target.value)}
              id="search"
              name="search"
              type="search"
              placeholder="Search in GElectronics"
              className="p-2 w-full border-0 py-1.5 text-gray-900 shadow-sm rounded-2xl ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600  sm:leading-6 "
            />
            <span onClick={searchSubmitHandler} className='ml-0 md-ml-3 text-sm md:text-lg cursor-pointer transition-colors duration-300 px-1 md:px-4 py-1 border rounded-2xl'>
              <SearchOutlinedIcon />
            </span>
          </div> */}


          <div className='right flex items-center justify-end space-x-3 md:space-x-8 md:mt-0 z-10 right-0 lg:pr-10 lg:gap-12'>
            <Link to={'/cart'} className='hover:text-gray-900 text-sm md:text-xl transition-colors duration-300'>
              <ShoppingCartOutlinedIcon />
              <span className='text-sm md:text-lg'>Cart({cartItems.length})</span>
            </Link>
            <Link to={'/login'} className='hover:text-gray-900 text-sm md:text-xl transition-colors duration-300 '>
              <AccountCircleOutlinedIcon />
              <span className='text-sm'>{user ? user.name : "Login"}</span>
            </Link>
          </div>
        </div>
        <div className='flex-1 flex md:hidden w-10/12 gap-3 m-auto mb-4'>
          <input
            onChange={(e) => setKeyword(e.target.value)}
            id="search"
            name="search"
            type="search"
            placeholder="Search in GElectronics"
            className="p-2 w-full md:w-auto border-0 py-1.5 text-gray-900 shadow-sm rounded-2xl ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
          <span onClick={searchSubmitHandler} className='ml-0 md-ml-3 text-sm md:text-lg cursor-pointer transition-colors duration-300 px-1 md:px-4 py-1 border rounded-2xl '>
            <SearchOutlinedIcon />
          </span>
        </div>
      </header>
    </Fragment>


  )
}

export default Header
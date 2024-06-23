import React, { Fragment, useState } from 'react'
import { Link } from 'react-router-dom'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'


const Header = () => { 
    const {cartItems} = useSelector((state)=>state.cart);
    const {user} = useSelector((state)=>state.user);
    const [keyword,setKeyword] = useState("");
    const navigate = useNavigate();
    const searchSubmitHandler = (e)=>{
        e.preventDefault();
        console.log(keyword);
        if(keyword.trim()){
            navigate(`/product/${keyword}`)
        }else{
            navigate(`/product`)
        }
    }
    //when user is logged out redirect him directly to login page
    return (
        <Fragment>
            {/* notes:-if you will put all the sections in flex container it will be difficult to justify their position */}
            {/* notes:-if you put yur header fixed it is difficult to justify containers.Giving the header bg-colr to style is best idea */} 
            <header className='text-gray-500 fixed top-0 bg-white w-screen h-20 z-20'>
                <div className='mx-auto flex flex-wrap p-5 flex-row item-center gap-x-8'>
                    <div className='flex'>
                        <img src="/logo.ico" alt="logo" className='h-20' />
                    </div>
                     <nav className=' w-1/2 m-auto flex item-center text-base'>
                    {/* not thinking as necessary */}
                        {/* <Link to={'/'} className='font-semibold text-xl hover:text-gray-900 hover:cursor-pointer transition-colors duration-300'>Home</Link>
                        <Link to={'/Products'} className='font-semibold text-xl hover:text-gray-900 hover:cursor-pointer transition-colors duration-300'>Products</Link>
                        <Link to={'/Category'} className='font-semibold text-xl hover:text-gray-900 hover:cursor-pointer transition-colors duration-300'>Category</Link>
                        <Link to={'/Contact'} className='font-semibold text-xl hover:text-gray-900 hover:cursor-pointer transition-colors duration-300'>Contact</Link> */}

                        {/* making it as a form may be a better idea. */}
                        <input onChange={(e)=>setKeyword(e.target.value)} id="search" name="search" type="search" placeholder="Seach in GElectronics" className="flex items-center m-auto p-4 w-full border-0 py-1.5 text-gray-900 shadow-sm rounded-2xl ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                        <span onClick={searchSubmitHandler} className='m-auto text-blue-950 text-lg hover:cursor-pointer hover:text-blue-700 transition-colors duration-300 px-4 py-1 border rounded-2xl bg-blue-400'><SearchOutlinedIcon /></span>
                    </nav> 
                    <div className='m-auto flex items-center space-x-8'>
                        
                        <Link to={'/product'} className='hover:text-gray-900 text-xl hover:cursor-pointer transition-colors duration-300'><span className='text-lg -tracking-tighter text-blue-600 hover:text-blue-800'>More Products</span><KeyboardArrowDownIcon/> </Link>
                        <Link to={'/cart'} className='hover:text-gray-900 text-xl hover:cursor-pointer transition-colors duration-300'><ShoppingCartOutlinedIcon /> <span className='text-sm -tracking-tighter'>cart({cartItems.length})</span> </Link>
                        <Link to={'/login'} className='hover:text-gray-900 text-xl hover:cursor-pointer transition-colors duration-300'><AccountCircleOutlinedIcon /><span className='text-sm -tracking-tighter'>{user?user.name:""}Login</span></Link>
                    </div>
                </div>
            </header>
        </Fragment>
    )
}

export default Header
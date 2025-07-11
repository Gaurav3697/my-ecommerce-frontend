import { Instagram } from "@mui/icons-material"
import { BsTiktok } from "react-icons/bs"
import { Link } from "react-router-dom"

const Footer = () => {
    return (
        //I want to keep footer z-index 0 and in app.css body will at margin of 24 from buttom with z-index greater than that of footer //intial plan can change when found better idea
        <footer className="bg-black h-auto w-full flex space-x-3 md:space-x-20 py-20 justify-between pr-10">
            <div className="logo">
                <div className='flex items-center'>
                    <span className="logo irish-grover-regular text-6xl text-white pl-14">GM</span>
                </div>
            </div>
            <div className="explore flex flex-col text-white roboto-mono-regular gap-4">
                <span className="heading inter-regular text-white text-2xl">Explore</span>
                <Link to={'/'} className=' text-sm hover:text-gray-900 transition-colors duration-300'>Home</Link>
                <Link to={'/Product'} className=' text-sm hover:text-gray-900 transition-colors duration-300'>Products</Link>
                 <Link to={'/cart'} className=' text-sm hover:text-gray-900 transition-colors duration-300'>Cart </Link>
            </div>
            <div className="Products flex flex-col text-white roboto-mono-regular gap-4">
                <span className="heading inter-regular text-white text-2xl">Products</span>
                <Link to={'/'} className=' text-sm hover:text-gray-900 transition-colors duration-300'>Headset</Link>
                <Link to={'/Product'} className=' text-sm hover:text-gray-400 transition-colors duration-300'>Airpord</Link>
                 <Link to={'/cart'} className=' text-sm hover:text-gray-400 transition-colors duration-300'>Smart Watch </Link>
                 <Link to={'/cart'} className=' text-sm hover:text-gray-400 transition-colors duration-300'>Neckband </Link>
            </div>
           <div className="follow flex flex-col text-white roboto-mono-regular gap-4">
                <span className="heading inter-regular text-white text-2xl">Follow us</span>
                <Link to={'/'} className=' text-sm hover:text-gray-400 transition-colors duration-300'>
                  <Instagram/>Instagram
                 </Link>
                <Link to={'/Product'} className=' text-sm hover:text-gray-400 transition-colors duration-300'>
                <BsTiktok/>Tiktok</Link>
            </div>

        </footer>
    )
}

export default Footer
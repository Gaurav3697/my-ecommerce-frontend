import React from 'react';
import PinterestIcon from '@mui/icons-material/Pinterest';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import XIcon from '@mui/icons-material/X';
// import './footer.css';

const Footer = () => {
    return (
        //I want to keep footer z-index 0 and in app.css body will at margin of 24 from buttom with z-index greater than that of footer //intial plan can change when found better idea
        <footer className="bg-[url('https://cdn.pixabay.com/photo/2016/12/01/18/17/mobile-phone-1875813_1280.jpg')] h-28 w-full bottom-0 fixed flex space-x-20 -z-10"> 
            <div>
                <img src="/logo.png" alt="" className='h-24'/>
            </div>
            <div className='items-center m-auto text-gray-700'>
            Copyright ©2024 All rights reserved This Website is  <br/>made by Gaurav
            </div>
            <div className='flex items-center justify-end space-x-14'>
                <span><PinterestIcon/></span>
                <span><InstagramIcon/></span>
                <span><FacebookIcon/></span>
                <span><XIcon/></span>
            </div>
        </footer>
  )
}

export default Footer
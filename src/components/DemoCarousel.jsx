import React, { Component } from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { Link } from 'react-router-dom';

const bgImages = [
    {
        id: 1,
        src: "/bigImg.png"
    },
    {
        id: 2,
        src: "/bgimg2.jpg"
    },
    {
        id: 3,
        src: "/bgimg3.webp"
    },
]

class DemoCarousel extends Component {
    render() {
        return (
            <div className='h-auto w-screen'>
                <Carousel infiniteLoop={true} autoPlay={true} interval={'2000'} showStatus={false} showThumbs={false}>
                    {
                        bgImages.map((img) => (
                            <div key={img.id} className="mx-auto h-[50vh] w-full lg:h-screen relative">
                                <img
                                    src={img.src}
                                    alt="bigImage"
                                    className="w-full h-full left-0 object-cover rounded-xl absolute"
                                />
                                <div className="w-full h-full left-0 top-10 object-cover rounded-xl absolute md:right-5 text-white text-xl md:text-3xl ">
                                    <div className=" w-3/4 h-full flex flex-col justify-center items-center mx-auto space-y-4 tracking-wider p-4 md:p-0">
                                        AMAZING OFFERS | BEST SERVICES | EXCELLENCE SUPPORT
                                        <Link to={'/product'} className="my-10 text-lg  hover:text-gray-300 cursor-pointer px-6 sm:px-10 py-2 sm:py-4 bg-white border text-gray-900 rounded-xl border-gray-900 hover:bg-gray-800 transition-colors duration-300">SHOP NOW</Link>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </Carousel>
            </div>
        );
    }
};


// Don't forget to include the css in your page

// Using webpack or parcel with a style loader
// import styles from 'react-responsive-carousel/lib/styles/carousel.min.css';

// Using html tag:
// <link rel="stylesheet" href="<NODE_MODULES_FOLDER>/react-responsive-carousel/lib/styles/carousel.min.css"/>

export default DemoCarousel;
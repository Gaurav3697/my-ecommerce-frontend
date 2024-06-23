//tasks to do
// 1)get product list and implement it here 
// 2)add cloudinary --> when you make admin to create products
// 3)add <react-hot-toast>
// 4)add loader
import React, { Fragment, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getProduct,clearErrors } from '../actions/productAction'
import { useSelector } from 'react-redux'
import ProductCard from '../components/Product/ProductCard';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

const Home = () => {
    const dispatch = useDispatch();
    const { loading, error, productList } = useSelector((state) => state.productList);
    useEffect(() => {
        if (error) {
           toast.error("Some error occured");
           dispatch(clearErrors());
        }
        dispatch(getProduct());
    }, [dispatch, error]);

    return (
        <Fragment>
            {loading ? (<div className='text-4xl h-screen w-screen flex justify-center mt-60'>Loading...</div>) :
                        <div className="flex flex-col z-10 mb-32 mt-28 gap-10 bg-white overflow-x-hidden">
                        {/* It is also appealing but you can also find similar image and make a carosel */}
                        {/* while making for mobile you can use left and right properties since components are absolute */}
                        <div className='bigImage m-auto h-screen w-screen relative'>
                            <img src="/bigImg.png" alt="bigImage" className='h-full absolute w-11/12 left-12 rounded-xl' />
                            <div className='absolute text-white left-20 top-44 font-bold text-5xl'>READY TO EXPERIENCE NEW BEST <br />ONLINE SHOPPING SERVICES</div>
                            <div className='absolute text-white left-20 top-72 text-xl'>WE CAN BE YOUR BEST DESCISION FOR BUYING BEST ELECTRONIC PRODUCT AT MINIMUM PRICE<br />SO CHOSE THE BEST WAY TO BUY</div>
                            <button className='absolute top-96 left-24 px-10 py-4 bg-white border text-gyay-900 rounded-xl border-gray-900 hover:bg-gray-800 hover:text-white transition-colors duration-300 cursor-pointer'>SHOP NOW</button>
                        </div>
                        <div className='flex flex-row w-screen h-screen '>
                            <div className='h-5/6 w-1/2 relative my-auto'>
                                <img src="/img3.jpg" alt="smallImage" className='h-5/6 w-9/12 m-auto rounded-xl absolute left-20' />
                                <div className='absolute text-white left-32 top-16 font-bold text-3xl bg-gray-900 bg-opacity-50 w-96 px-6 py-16 border border-white'>GET BRANDED MOBILES PHONES AND<br />LAPTOPS AT BEST RATE <br /><span className='text-lg underline hover:text-gray-700 cursor-pointer'>SEE MORE</span></div>
                            </div>
                            <div className='h-5/6 w-1/2 relative my-auto'>
                                <img src="/img2.jpg" alt="smallImage" className='h-9/12 w-11/12rounded-xl absolute rounded-xl right-5' />
                                <div className='absolute text-white left-32 top-16 font-bold text-3xl bg-black bg-opacity-40 w-96 px-6 py-16 border border-white'>GET AMAZING OFFERS IN<br />ACESSORIES OF DIFFERENT CATEGORIES <br /><span className='text-lg underline hover:text-gray-700 cursor-pointer'>SEE MORE</span></div>
                            </div>
                        </div>
                        {/* finally its time to show the products which will be shown in product card*/}
                        <h2 className='mt-0 text-center flex justify-center text-gray-800 text-2xl'>Featured Products</h2>
                        <div className='flex flex-wrap m-auto w-10/12 gap-12 bottom-5'>
                        {
                            // used slice in arrat to show only 3 products . I will update it to show top 3 high rated product later
                            productList.products && productList.products.slice(0, 3).map((product) => (
                                <ProductCard key={product._id} product={product} />
                            ))
                        }
                        </div>
                        <Link to={'/product'} className='m-auto hover:text-gray-900 text-xl hover:cursor-pointer transition-colors duration-300'><span className='text-2xl -tracking-tighter text-blue-600 hover:text-blue-800'>More Products...</span></Link>
        
                    </div>}
        </Fragment>
    )
}

export default Home 
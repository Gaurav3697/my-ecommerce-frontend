//tasks to do
// 1)get product list and implement it here 
// 2)add cloudinary --> when you make admin to create products
// 3)add <react-hot-toast>
// 4)add loader
import React, { Fragment, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getProduct, clearErrors } from '../actions/productAction'
import { useSelector } from 'react-redux'
import ProductCard from '../components/Product/ProductCard';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import DemoCarousel from './DemoCarousel';
import Loader from './Loader';

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
            <div className="flex flex-col z-10 mb-32 mt-28 gap-10 bg-white overflow-x-hidden">
                <DemoCarousel/>

                <div className="mt-12 md:mt-0 flex flex-col md:flex-row w-full h-screen">
                    <div className="h-5/6 w-full md:w-1/2 relative my-auto left-4">
                        <img
                            src="/img3.jpg"
                            alt="smallImage"
                            className="h-5/6 w-11/12 mx-auto md:m-auto rounded-xl absolute md:left-20"
                        />
                        <div className="h-5/6 w-11/12 mx-auto md:m-auto rounded-xl absolute md:left-20 text-white text-xl md:text-3xl bg-gray-900 bg-opacity-50 border border-white">
                            <div className="w-3/4 h-full flex flex-col justify-center items-center mx-auto space-y-4 tracking-wider p-4 md:p-0">
                                WE ALSO REPAIRS MOBILES AND COMPUTERS
                                <Link to={'/product'} className="text-lg underline hover:text-gray-300 cursor-pointer">SEE MORE</Link>
                            </div>
                        </div>
                    </div>
                    <div className="h-5/6 w-full md:w-1/2 relative my-auto left-4">
                        <img
                            src="/img2.jpg"
                            alt="smallImage"
                            className="h-5/6 w-11/12 mx-auto md:m-auto rounded-xl absolute md:right-5"
                        />
                        <div className="h-5/6 w-11/12 mx-auto md:m-auto rounded-xl absolute md:right-5 text-white text-xl md:text-3xl bg-black bg-opacity-40 border border-white">
                            <div className="w-3/4 h-full flex flex-col justify-center items-center mx-auto space-y-4 tracking-wider p-4 md:p-0">
                                GET AMAZING OFFERS IN<br />
                                ACCESSORIES OF DIFFERENT CATEGORIES <br />
                                <Link to={'/product'} className="text-lg underline hover:text-gray-300 cursor-pointer">SEE MORE</Link>
                            </div>
                        </div>
                    </div>
                </div>


                <h2 className="mt-0 text-center flex justify-center text-gray-800 text-2xl">Featured Products</h2>
                {
                    loading ? ( <Loader/>) :
                        (
                            <div className="flex flex-wrap m-auto w-11/12 gap-5 lg:gap-16 md:gap-8 bottom-5">
                                {productList.products &&
                                    productList.products.slice(0, 3).map((product) => (
                                        <ProductCard key={product._id} product={product} />
                                    ))}
                            </div>
                        )
                }

                <Link
                    to={'/product'}
                    className="mx-auto hover:text-gray-900 text-xl hover:cursor-pointer transition-colors duration-300"
                >
                    <span className="text-2xl -tracking-tighter text-blue-600 hover:text-blue-800">More Products...</span>
                </Link>
            </div>
        </Fragment>
    )
}

export default Home 
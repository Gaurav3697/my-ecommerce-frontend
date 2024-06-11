import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getProductDetail } from '../../actions/productAction';
import ReviewCard from './ReviewCard';

const ProductDetail = () => {
    const dispatch = useDispatch();
    const { loading, error, productDetails } = useSelector((state) => state.productDetails);
    const { id } = useParams();

    //increase quantity of item in cart function
    // const increaseQuantity = () => {
    //     if (product.Stock <= quantity) return;

    //     const qty = quantity + 1;
    //     setQuantity(qty);
    // };

    //increase quantity of item in cart function
    // const decreaseQuantity = () => {
    //     if (1 >= quantity) return;

    //     const qty = quantity - 1;
    //     setQuantity(qty);
    // };

    //when user clicks add to card
    // const addToCartHandler = () => {
    //     // dispatch(addItemsToCart(match.params.id, quantity)); make this function also
    //     alert.success("Item Added To Cart");
    // };

    useEffect(() => {
        if (error) {
            console.log(error);
        }
        dispatch(getProductDetail(id));
        console.log(productDetails.product);
    }, [dispatch, error, id, loading]);

    return (
        <Fragment>
            {/* when there is product detail then only render this to avoid undefine error created  while rendering the component i will try to replace with if(loading) condition fetched from redux*/}
            {productDetails && productDetails.product ? (
                <Fragment>
                    <div className="md:flex md:items-center mb-32 mt-28 bg-white h-full">
                        <div className="w-1/2 h-1/2 fixed top-24 m-auto p-4">
                            <img className="w-full h-auto rounded-md object-cover max-w-lg mx-auto" src="https://images.unsplash.com/photo-1593121925328-369cc8459c08?auto=format&fit=crop&w=286" alt="Headphone" />
                        </div>
                        <div className="relative w-1/2 left-1/2 p-4 ">
                            <p className="text-gray-700 uppercase underline m-6">{productDetails.product.category}</p>
                            <h2 className="text-gray-900 uppercase m-2">{productDetails.product.name}</h2>
                            <p className="text-gray-500 mt-2 mb-6">{productDetails.product.description}</p>
                            <span className="text-gray-500 text-4xl text-center">रु{productDetails.product.price}</span>
                            <div className="mt-2">
                                <div className="flex items-center mt-1">
                                    <button className="text-gray-500 focus:outline-none focus:text-gray-600">
                                        <svg className="h-5 w-5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                    </button>
                                    <span className="text-gray-700 text-lg mx-2">1</span>
                                    <button className="text-gray-500 focus:outline-none focus:text-gray-600">
                                        <svg className="h-5 w-5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                    </button>
                                </div>
                            </div>
                            <div className="mt-3">
                                <label className="text-gray-700 text-sm" htmlFor="count">Color:</label>
                                <div className="flex items-center mt-1">
                                    <button className="h-5 w-5 rounded-full bg-blue-600 border-2 border-blue-200 mr-2 focus:outline-none"></button>
                                    <button className="h-5 w-5 rounded-full bg-teal-600 mr-2 focus:outline-none"></button>
                                    <button className="h-5 w-5 rounded-full bg-pink-600 mr-2 focus:outline-none"></button>
                                </div>
                            </div>
                            <div className="flex items-center mt-6">
                                <button className="px-8 py-2 bg-indigo-600 text-white text-sm font-medium rounded hover:bg-indigo-500 focus:outline-none focus:bg-indigo-500">Order Now</button>
                                <button className="mx-2 text-gray-600 border rounded-md p-2 hover:bg-gray-200 focus:outline-none">
                                    <svg className="h-5 w-5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
                                </button>
                            </div>
                            {/* showing rating from material ui and no of reviews in brracket */}



                            {/* show more data if there is in tabular format that is not included above*/}



                            <h2 className='flex justify-center text-2xl text-center m-10 underline'>Reviews</h2>
                            {/* show user reviews and above all reviews a button to create review after submitting review i will use react-hot-toast to show review submitted successfully*/}
                            {
                                productDetails.product && productDetails.product.reviews ? (
                                    productDetails.product.reviews && productDetails.product.reviews.map((review)=>(
                                        <ReviewCard key={review._id} review={review}/>
                                    ))
                                ):(
                                    <div>No reviews yet</div>
                                )
                            }
                        </div>
                    </div>
                    {/* adding one more dive and making above as container make one more div to show related product or product of same category */}
                </Fragment>
            ) : (
                <h1>Loading...</h1>
            )}
        </Fragment>
    )
}

export default ProductDetail
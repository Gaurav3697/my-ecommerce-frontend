//There is a bug in create review i.e when you create review once,you cannot update it
//My review is not creating although everything in frontend is working well

import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getProductDetail, newReview } from '../../actions/productAction';
import ReviewCard from './ReviewCard';
import { addItemsToCart } from '../../actions/cartAction';
import toast from 'react-hot-toast';
import { NEW_REVIEW_RESET } from '../../constants/productConstants';
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Button,
} from "@mui/material";
import Rating from '@mui/material/Rating';

const ProductDetail = () => {
    const dispatch = useDispatch();
    const { loading, error, productDetails } = useSelector((state) => state.productDetails);

    const { success, error: reviewError } = useSelector(
        (state) => state.newReview
    );
    // const { cartItems } = useSelector((state) => state.cart); I want to set default default stae of quantity as set in cart
    const { id } = useParams();
    const [quantity, setQuantity] = useState(1);
    const [open, setOpen] = useState(false);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");

    //rating Options
    // const options = {
    //     size: "large",
    //     value: productDetails.product.rating,
    //     readOnly: true,
    //     precision: 0.5,
    //   };

    //increase quantity of item in cart function
    const increaseQuantity = () => {
        if (productDetails.product.stock <= quantity) return;
        const qty = quantity + 1;
        setQuantity(qty);
    };

    //increase quantity of item in cart function
    const decreaseQuantity = () => {
        if (1 >= quantity) return;

        const qty = quantity - 1;
        setQuantity(qty);
    };

    //when user clicks add to card
    const addToCartHandler = () => {
        dispatch(addItemsToCart(id, quantity)); //make this function also
        toast.success("Item Added To Cart");
    };

    const submitReviewToggle = () => {
        open ? setOpen(false) : setOpen(true);
    };

    //Create Review Handler
    const reviewSubmitHandler = () => {
        const myForm = new FormData();
        myForm.set("rating", rating);
        myForm.set("comment", comment);
        dispatch(newReview(myForm, id));
        setOpen(false);
    }

    useEffect(() => {
        if (error) {
            console.log(error);
        }
        if (reviewError) {
            toast.error(reviewError); //see if it may cause any error
        }
        dispatch(getProductDetail(id));
        if (success) {
            toast.success("Review Submitted Successfully")
            dispatch({ type: NEW_REVIEW_RESET });
        }
    }, [dispatch, error, id, loading,success,reviewError]);

    return (
        <Fragment>
            {/* when there is product detail then only render this to avoid undefine error created  while rendering the component i will try to replace with if(loading) condition fetched from redux*/}
            {productDetails && productDetails.product ? (
                <Fragment>
                    <div className="flex flex-col gap-6 md:gap-0 md:flex-row  md:items-center mb-32 mt-28 bg-white h-auto">
                        <div className="w-full h-1/2 md:fixed md:top-40 m-auto p-4 lg:left-24">
                            <img className="h-auto md:h-[50vh] w-auto flex justify-center lg:left-20" src={productDetails.product.images[0].url} alt="productDetails.product.name" />
                        </div>
                        <div className="flex flex-col w-screen md:relative md:w-1/2 md:left-1/2 p-2 gap-2">
                            <p className="text-gray-700 uppercase underline m-auto">{productDetails.product.category}</p>
                            <h2 className="text-gray-900 uppercase m-2 font-bold text-2xl">{productDetails.product.name}</h2>
                            <p className="text-gray-500 mt-2 mb-6">{productDetails.product.description}</p>
                            <span className="text-gray-950 text-xl">रु{productDetails.product.price}</span>
                            <div className="mt-2">
                                <div className="flex items-center mt-1 gap-5">
                                    <button onClick={increaseQuantity} className="text-gray-700 focus:outline-none hover:text-gray-950">
                                        <svg className="h-5 w-5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                    </button>
                                    <span className="text-gray-700 text-lg mx-2">{quantity}</span>
                                    <button onClick={decreaseQuantity} className="text-gray-700 focus:outline-none hover:text-gray-950">
                                        <svg className="h-5 w-5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                    </button>
                                </div>
                            </div>

                            {/* gives stock imforamtion */}
                            <p className='m-4'>
                                Status:
                                <b className={productDetails.product.stock < 1 ? "text-red-800" : "text-green-800"}>
                                    {productDetails.product.stock < 1 ? " OutOfStock" : " InStock"}
                                </b>
                            </p>

                            {/* buttons for add to cart and create review */}

                            <div className="flex gap-10">
                                <div className="flex items-center mt-6">
                                    <button onClick={addToCartHandler} className="px-8 py-2 bg-indigo-600 text-white text-sm font-medium rounded hover:bg-indigo-500 focus:outline-none focus:bg-indigo-500">ADD TO CART</button>
                                </div>
                                <div className="flex items-center mt-6">
                                    <button onClick={submitReviewToggle} className="px-8 py-2 hover:bg-gray-400 text-black text-sm font-medium rounded border transition-all">Create Review</button>
                                </div>
                            </div>


                          {/* When button will be clicked dialog will appear */}
                          <Dialog
                                aria-labelledby="simple-dialog-title"
                                open={open}
                                onClose={submitReviewToggle}
                            >
                                <DialogTitle>Submit Review</DialogTitle>
                                <DialogContent className="flex flex-col gap-3">
                                    <Rating
                                        name="simple-controlled"
                                        value={rating}
                                        onChange={(event, newValue) => {
                                            setRating(newValue);
                                        }}
                                    />

                                    <textarea
                                        className="border-gray-600 border-4 p-4"
                                        cols="30"
                                        rows="5"
                                        value={comment}
                                        onChange={(e) => setComment(e.target.value)}
                                    ></textarea>
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={submitReviewToggle} color="secondary">
                                        Cancel
                                    </Button>
                                    <Button onClick={reviewSubmitHandler} color="primary">
                                        Submit
                                    </Button>
                                </DialogActions>
                            </Dialog>


                            {/* showing rating from material ui and no of reviews in brracket */}



                            {/* show more data if there is in tabular format that is not included above*/}



                            <h2 className='flex justify-center text-2xl text-center mt-[3vh] mb-[1vh] underline'>Reviews</h2>
                            {/* show user reviews and above all reviews a button to create review after submitting review i will use react-hot-toast to show review submitted successfully*/}
                            {
                                productDetails.product && productDetails.product.reviews ? (
                                    productDetails.product.reviews && productDetails.product.reviews.map((review) => (
                                        <ReviewCard key={review._id} review={review} />
                                    ))
                                ) : (
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
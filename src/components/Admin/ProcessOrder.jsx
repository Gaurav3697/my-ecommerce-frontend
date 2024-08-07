import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Typography } from '@mui/material';
import toast from 'react-hot-toast';
import { getOrderDetails, updateOrder } from '../../actions/orderAction';
import { useParams } from 'react-router-dom';
import Button from '@mui/material/Button';
import {UPDATE_ORDER_RESET} from "../../constants/orderConstants"

const ProcessOrder = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { order, loading, error } = useSelector((state) => state.orderDetail)
    const { isUpdated, order:updatedOrder,error:updateError} = useSelector((state) => state.updateOrder)
    const { isAuthenticated } = useSelector((state) => state.user)
    const { id } = useParams();
     const [ processStatus, setprocessStatus ] = useState('')

    const updateOrderSubmitHandler = (e) => {
        e.preventDefault();

        const myForm = new FormData();

        myForm.set("status", processStatus);

        dispatch(updateOrder(id, myForm));
    };

    useEffect(() => {
        if (error) {
            toast.error(error);
            console.log(error);
        }

        if (id) {
            toast.success('Order Updated Successfully');
        }

        if(isUpdated){
            toast.success("Order Updated successfully")
            dispatch({type:"UPDATE_ORDER_RESET"})
        }

        if (!isAuthenticated) {
            navigate('/login')
        }

        if(updateError){
            toast.error(updateError)
        }
        dispatch(getOrderDetails(id));
    }, [error, navigate, dispatch,updateError,isUpdated]);

    return (
        <Fragment>
            {!loading && (
                <Fragment>
                    <div className='mt-24'>
                        <div className="confirmOrderPage md:h-screen bg-[white] grid md:grid-cols-[6fr_3fr] grid-cols-[1fr] h-[unset]">
                            <div>
                                <div className="pb-[0%] p-[5vmax] ">
                                    <p className='font: 400 1.8vmax "Roboto"'>Shipping Info</p>
                                    <div className="confirmshippingAreaBox ">
                                        <div className='flex mx-0 my-[1vmax]'>
                                            <p className='text-[black]'>Name:</p>
                                            <span className='text-[#575757] mx-[1vmax] my-0;'>{order.user.name}</span>
                                        </div>
                                        <div className='flex mx-0 my-[1vmax]'>
                                            <p className='text-[black]'>Email:</p>
                                            <span className='text-[#575757] mx-[1vmax] my-0;'>{order.user.email}</span>
                                        </div>
                                        <div className='flex mx-0 my-[1vmax]'>
                                            <p className='text-[black]'>Phone:</p>
                                            <span className='text-[#575757] mx-[1vmax] my-0;'>{order.shippingInfo.phoneNo}</span>
                                        </div>
                                        <div className='flex mx-0 my-[1vmax]'>
                                            <p className='text-[black]'>Address:</p>
                                            <span className='text-[#575757] mx-[1vmax] my-0;'>
                                                {order.shippingInfo.address},
                                                city: {order.shippingInfo.city},
                                                state: {order.shippingInfo.state},
                                                country: {order.shippingInfo.country},
                                                pincode: {order.shippingInfo.pinCode}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="confirmCartItems pt-[2vmax] p-[5vmax]">
                                    <Typography>Your Cart Items:</Typography>
                                    <div className="confirmCartItemsContainer max-h-[20vmax] overflow-y-auto">
                                        {order.orderItem && order.orderItem.map((item) => (
                                            <div key={item._id} className='flex items-center justify-between mx-0 my-[2vmax]'>
                                                <img src={item.image} alt="Product" className='w-[3vmax]' />
                                                <Link to={`/productDetail/${item.product}`} className='text-[#575757] w-3/5 no-underline mx-[2vmax] my-0'>
                                                    {item.name}
                                                </Link>{" "}
                                                <span className='text-[#5e5e5e]'>
                                                    {item.quantity} X ₹{item.price} ={" "}
                                                    <b>₹{item.price * item.quantity}</b>
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className='border-l-[rgba(0,0,0,0.247)] border-l border-solid'>
                                <div className="orderSummary p-5">
                                    <Typography className='text-center w-full box-border m-auto p-[1vmax] border-b-[rgba(0,0,0,0.267)] border-b border-solid'>Order Summary</Typography>
                                    <div>
                                        <div className='flex justify-between mx-0 my-[2vmax]'>
                                            <p >Subtotal:</p>
                                            <span className='text-[rgba(0,0,0,0.692)]'>₹{order.itemPrice}</span>
                                        </div>
                                        <div className='flex justify-between mx-0 my-[2vmax]'>
                                            <p>Shipping Charges:</p>
                                            <span className='text-[rgba(0,0,0,0.692)]'>₹{order.shippingPrice}</span>
                                        </div>
                                        <div className='flex justify-between mx-0 my-[2vmax]'>
                                            <p>GST:</p>
                                            <span className='text-[rgba(0,0,0,0.692)]'>₹{order.taxPrice}</span>
                                        </div>
                                    </div>

                                    <div className="orderSummaryTotal flex justify-between px-0 py-[2vmax] border-t-[rgba(0,0,0,0.363)] border-t border-solid">
                                        <p>
                                            <b>Total:</b>
                                        </p>
                                        <span>₹{order.totalPrice}</span>
                                    </div>
                                </div>


                                <form
                                    className="updateOrderForm mx-auto p-4 bg-white"
                                    onSubmit={updateOrderSubmitHandler}
                                >
                                    <h1 className="text-2xl font-bold mb-1">Process Order</h1>
                                    <div className="flex items-center w-full">
                                        <select
                                            className="py-[1vmax] px-[4vmax] my-3 w-full border border-gray-300 rounded-xl text-sm font-light outline-none"
                                            onChange={(e) => setprocessStatus(e.target.value)}
                                        >
                                            <option value="">{order.orderStatus}</option>
                                            {order.orderStatus === "Processing" && (
                                                <>
                                                <option value="Shipped">Shipped</option>
                                                <option value="Delivered">Delivered</option>
                                                </>
                                            )}
                                            {order.orderStatus === "Shipped" && (
                                                <option value="Delivered">Delivered</option>
                                            )}
                                        </select>
                                    </div>
                                    <Button
                                        type="submit"
                                        className=" bg-blue-500 hover:bg-blue-700 text-[black] w-1/2 cursor-pointer transition-[0.5s] m-auto p-[1vmax] border-[none] rounded-xl"
                                    >
                                        Process
                                    </Button>
                                </form>



                            </div>
                        </div>
                    </div>
                </Fragment>
            )}
        </Fragment>
    );
}

export default ProcessOrder;

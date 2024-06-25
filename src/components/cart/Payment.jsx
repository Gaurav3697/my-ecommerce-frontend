//understand payment integration in now world and make it
// import { CardCvcElement, CardExpiryElement, CardNumberElement } from '@stripe/react-stripe-js';
// import { useElements, useStripe } from '@stripe/react-stripe-js';
// import React, { Fragment, useEffect, useRef } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { server } from '../..';
// import toast from 'react-hot-toast';
// import CheckOutSteps from './CheckOutSteps';
// import { createOrder } from '../../actions/orderAction';

// const Payment = () => {
//     const navigate = useNavigate();
//     const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));

//     const dispatch = useDispatch();
//     const stripe = useStripe();
//     const element = useElements();
//     const payBtn = useRef(null);

//     const { shippingInfo, cartItems } = useSelector((state) => state.cart);
//     const { user } = useSelector((state) => state.user);
//     const { error } = useSelector((state) => state.newOrder);

//     const paymentData = {
//         amount: Math.round(orderInfo.totalPrice * 100),
//     };

//     const order = {
//         shippingInfo,
//         orderItems: cartItems,
//         itemsPrice: orderInfo.subtotal,
//         taxPrice: orderInfo.tax,
//         shippingPrice: orderInfo.shippingCharges,
//         totalPrice: orderInfo.totalPrice,
//     };

//     const submitHandler = async (e) => {
//         e.preventDefault();
//         payBtn.current.disabled = true;

//         try {
//             const config = {
//                 headers: {
//                     "Content-Type": "application/json",
//                 }
//             }
//             const { data } = await axios.post(
//                 `${server}/payment/process`,
//                 paymentData,
//                 config,
//                 { withCredentials: true }
//             );

//             const client_secret = data.client_secret;
//             if (!stripe || !element) {
//                 return;
//             }

//             const result = await stripe.confirmPayment(client_secret, {
//                 payment_method: {
//                     card: element.getElement(CardNumberElement),
//                     billing_details: {
//                         name: user.name,
//                         email: user.email,
//                         adress: {
//                             line1: shippingInfo.address,
//                             city: shippingInfo.city,
//                             state: shippingInfo.state,
//                             postal_code: shippingInfo.pinCode,
//                             country: shippingInfo.country,
//                         }
//                     }
//                 }
//             }
//             );
//             if (result.error) {
//                 payBtn.current.disabled = false;
//                 toast.error(result.error.message);
//             } else {
//                 if (result.paymentIntent.status === "succeeded") {
//                     order.paymentInfo = {
//                         id: result.paymentIntent.id,
//                         status: result.paymentIntent.status,
//                     };

//                     dispatch(createOrder(order)); //need to make it
//                     navigate("/success");
//                     toast.error("There's some issue while processing payment");
//                 }
//             }
//         } catch (error) {
//             payBtn.current.disabled = false;
//             toast.error(error.response.data.message);
//         }
//     };

//     useEffect(() => {
//         if (error) {
//             toast.error(error);
//         }
//     }, [error, dispatch]);

//     return (
//         <Fragment>
//             <div className='mt-24'>
//                 <CheckOutSteps activeStep={2} />
//                 <div className="paymentContainer grid items-center bg-white h-auto m-10 ">
//                     <form className="w-1/4 h-full" onSubmit={(e) => submitHandler(e)}>
//                         <span className="m-auto w-1/2 text-center py-10 border border-black text-2xl">Card Info</span>
//                         <div className='flex items-center my-10'>
//                             {/* <CreditCardIcon /> */}
//                             <CardNumberElement className="w-full box-border border rounded pr-[1vmax] px-[4vmax] py-[1vmax] border-solid border-[rgba(0,0,0,0.267)]" />
//                         </div>
//                         <div>
//                             {/* <EventIcon /> */}
//                             <CardExpiryElement className="w-full box-border border rounded pr-[1vmax] px-[4vmax] py-[1vmax] border-solid border-[rgba(0,0,0,0.267)]" />
//                         </div>
//                         <div>
//                             {/* <VpnKeyIcon /> */}
//                             <CardCvcElement className="w-full box-border border rounded pr-[1vmax] px-[4vmax] py-[1vmax] border-solid border-[rgba(0,0,0,0.267)]" />
//                         </div>

//                         <input
//                             type="submit"
//                             value={`Pay - ₹${orderInfo && orderInfo.totalPrice}`}
//                             ref={payBtn}
//                             className="paymentFormBtn"
//                         />
//                     </form>
//                 </div>
//             </div>
//         </Fragment>
//     )
// }

// export default Payment

import React from 'react'

const Payment = () => {
  return (
    <div className='h-screen w-screen flex flex-wrap justify-center  mx-12 mt-[50vh] text-3xl fixed'>This Page is in development. This page will be developed as soon as possible</div>
  )
}

export default Payment
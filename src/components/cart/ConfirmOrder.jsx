import React, { Fragment, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import CheckOutSteps from './CheckOutSteps';
import { Typography } from '@mui/material';
import './ConfirmOrder.css'
import { getPaymentData } from '../../actions/orderAction';

const ConfirmOrder = () => {
  const formRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
  const { isAuthenticated } = useSelector((state) => state.user)
  const { paymentData, loading, error } = useSelector((state) => state.paymentData);
  
  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );
  // const shippingCharges = subtotal > 1000 ? 0 : 200;
  const shippingCharges = 10;
  const tax = subtotal * 0.13;
  const totalPrice = subtotal + tax + shippingCharges;
  const address = `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state}, ${shippingInfo.pinCode}, ${shippingInfo.country}`;
  
  
  const proceedToPayment = () => {
    const data = {
      shippingInfo,
      orderItem:cartItems,
      itemPrice:subtotal,
      taxPrice:tax,
      shippingPrice:shippingCharges,
      totalPrice:totalPrice,
    };
    localStorage.setItem("orderInfo", JSON.stringify(data));

    
    if (formRef.current) {
      formRef.current.requestSubmit();
    }

  }

  useEffect(() => {
    if (error) {
      // navigate('/process/payment/failure');
      console.log(error);
    }
    if (!isAuthenticated) {
      navigate('/login')
    }
    dispatch(getPaymentData(totalPrice));
  }, [error, navigate,dispatch]);
  console.log(totalPrice)

  return (
    <Fragment>
    {user && (
      <Fragment>
        <div className='mt-24'>
          <CheckOutSteps activeStep={1} />
          <div className="confirmOrderPage md:h-screen bg-[white] grid md:grid-cols-[6fr_3fr] grid-cols-[1fr] h-[unset]">
            <div>
              <div className="pb-[0%] p-[5vmax] ">
                <p className='font: 400 1.8vmax "Roboto"'>Shipping Info</p>
                <div className="confirmshippingAreaBox ">
                  <div className='flex mx-0 my-[1vmax]'>
                    <p className='text-[black]'>Name:</p>
                    <span className='text-[#575757] mx-[1vmax] my-0;'>{user.name}</span>
                  </div>
                  <div className='flex mx-0 my-[1vmax]'>
                    <p className='text-[black]'>Phone:</p>
                    <span className='text-[#575757] mx-[1vmax] my-0;'>{shippingInfo.phoneNo}</span>
                  </div>
                  <div className='flex mx-0 my-[1vmax]'>
                    <p className='text-[black]'>Address:</p>
                    <span className='text-[#575757] mx-[1vmax] my-0;'>{address}</span>
                  </div>
                </div>
              </div>
              <div className="confirmCartItems pt-[2vmax] p-[5vmax]">
                <Typography>Your Cart Items:</Typography>
                <div className="confirmCartItemsContainer max-h-[20vmax] overflow-y-auto">
                  {cartItems && cartItems.map((item) => (
                    <div key={item.product} className='flex items-center justify-between mx-0 my-[2vmax]'>
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
              <div className="orderSummary p-[7vmax]">
                <Typography className='text-center w-full box-border m-auto p-[1vmax] border-b-[rgba(0,0,0,0.267)] border-b border-solid'>Order Summary</Typography>
                <div>
                  <div className='flex justify-between mx-0 my-[2vmax]'>
                    <p >Subtotal:</p>
                    <span className='text-[rgba(0,0,0,0.692)]'>₹{subtotal}</span>
                  </div>
                  <div className='flex justify-between mx-0 my-[2vmax]'>
                    <p>Shipping Charges:</p>
                    <span className='text-[rgba(0,0,0,0.692)]'>₹{shippingCharges}</span>
                  </div>
                  <div className='flex justify-between mx-0 my-[2vmax]'>
                    <p>GST:</p>
                    <span className='text-[rgba(0,0,0,0.692)]'>₹{tax}</span>
                  </div>
                </div>
                <div className="orderSummaryTotal flex justify-between px-0 py-[2vmax] border-t-[rgba(0,0,0,0.363)] border-t border-solid">
                  <p>
                    <b>Total:</b>
                  </p>
                  <span>₹{totalPrice}</span>
                </div>
                <button onClick={proceedToPayment} className=' bg-blue-500 hover:bg-blue-700 text-[black] w-full cursor-pointer transition-[0.5s] m-auto p-[1vmax] border-[none] rounded-xl'>Proceed To Payment</button>
              </div>
            </div>
            {!loading && paymentData && (
              <form action="https://rc-epay.esewa.com.np/api/epay/main/v2/form" method="POST" ref={formRef}>
                <input type="hidden" id="amount" name="amount" value={subtotal} required />
                <input type="hidden" id="tax_amount" name="tax_amount" value={tax} required />
                <input type="hidden" id="total_amount" name="total_amount" value={totalPrice} required />
                <input type="hidden" id="transaction_uuid" name="transaction_uuid" value={paymentData.uid} required />
                <input type="hidden" id="product_code" name="product_code" value="EPAYTEST" required />
                <input type="hidden" id="product_service_charge" name="product_service_charge" value="0" required />
                <input type="hidden" id="product_delivery_charge" name="product_delivery_charge" value={shippingCharges} required />
                <input type="hidden" id="success_url" name="success_url" value="https://my-ecommerce-electronic-backend.onrender.com/api/v1/success" required />
                <input type="hidden" id="failure_url" name="failure_url" value="https://my-ecommerce-electronic-backend.onrender.com/api/v1/failure" required />
                <input type="hidden" id="signed_field_names" name="signed_field_names" value="total_amount,transaction_uuid,product_code" required />
                <input type="hidden" id="signature" name="signature" value={paymentData.signature} required />
                {/* <input value="Submit" type="submit" /> */}
              </form>
            )}
          </div>
        </div>
      </Fragment>
    )}
  </Fragment>
  );
}

export default ConfirmOrder;

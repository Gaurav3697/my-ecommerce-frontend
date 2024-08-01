import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import CheckOutSteps from './CheckOutSteps';
import { Typography } from '@mui/material';
import './ConfirmOrder.css'
import { getPaymentData } from '../../actions/orderAction';

const ConfirmOrder = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
  const { paymentData, loading, error } = useSelector((state) => state.paymentData);

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );
  const shippingCharges = subtotal > 1000 ? 0 : 200;
  const tax = subtotal * 0.13;
  const totalPrice = subtotal + tax + shippingCharges;
  const address = `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state}, ${shippingInfo.pinCode}, ${shippingInfo.country}`;

  const proceedToPayment = () => {
    const data = {
      subtotal,
      shippingCharges,
      tax,
      totalPrice,
    };
    sessionStorage.setItem("orderInfo", JSON.stringify(data));
    dispatch(getPaymentData(totalPrice));
    // navigate('/process/payment');
  }

  useEffect(() => {
    if (error) {
      // navigate('/process/payment/failure');
      console.log(error);
    }
  }, [error, navigate]);

  return (
    <Fragment>
      {user && (
        <Fragment>
          <div className='mt-24'>
            <CheckOutSteps activeStep={1} />
            <div className="confirmOrderPage @apply h-screen bg-[white] grid grid-cols-[6fr_3fr] mt-10">
              <div>
                <div className="@apply pb-[0%] p-[5vmax]">
                  <p className='font: 400 1.8vmax "Roboto"'>Shipping Info</p>
                  <div className="confirmshippingAreaBox">
                    <div>
                      <p>Name:</p>
                      <span>{user.name}</span>
                    </div>
                    <div>
                      <p>Phone:</p>
                      <span>{shippingInfo.phoneNo}</span>
                    </div>
                    <div>
                      <p>Address:</p>
                      <span>{address}</span>
                    </div>
                  </div>
                </div>
                <div className="confirmCartItems">
                  <Typography>Your Cart Items:</Typography>
                  <div className="confirmCartItemsContainer">
                    {cartItems && cartItems.map((item) => (
                      <div key={item.product}>
                        <img src={item.image} alt="Product" />
                        <Link to={`/product/${item.product}`}>
                          {item.name}
                        </Link>{" "}
                        <span>
                          {item.quantity} X ₹{item.price} ={" "}
                          <b>₹{item.price * item.quantity}</b>
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div>
                <div className="orderSummary">
                  <Typography>Order Summary</Typography>
                  <div>
                    <div>
                      <p>Subtotal:</p>
                      <span>₹{subtotal}</span>
                    </div>
                    <div>
                      <p>Shipping Charges:</p>
                      <span>₹{shippingCharges}</span>
                    </div>
                    <div>
                      <p>GST:</p>
                      <span>₹{tax}</span>
                    </div>
                  </div>
                  <div className="orderSummaryTotal">
                    <p>
                      <b>Total:</b>
                    </p>
                    <span>₹{totalPrice}</span>
                  </div>
                  <button onClick={proceedToPayment}>Proceed To Payment</button>
                </div>
              </div>
              {!loading && paymentData && (
                <form action="https://rc-epay.esewa.com.np/api/epay/main/v2/form" method="POST">
                  <input type="hidden" id="amount" name="amount" value={subtotal} required />
                  <input type="hidden" id="tax_amount" name="tax_amount" value={tax} required />
                  <input type="hidden" id="total_amount" name="total_amount" value={totalPrice} required />
                  <input type="hidden" id="transaction_uuid" name="transaction_uuid" value={paymentData.uid} required />
                  <input type="hidden" id="product_code" name="product_code" value="EPAYTEST" required />
                  <input type="hidden" id="product_service_charge" name="product_service_charge" value="0" required />
                  <input type="hidden" id="product_delivery_charge" name="product_delivery_charge" value={shippingCharges} required />
                  <input type="hidden" id="success_url" name="success_url" value="https://esewa.com.np" required />
                  <input type="hidden" id="failure_url" name="failure_url" value="http://localhost:3000/process/payment/failure" required />
                  <input type="hidden" id="signed_field_names" name="signed_field_names" value="total_amount,transaction_uuid,product_code" required />
                  <input type="hidden" id="signature" name="signature" value={paymentData.signature} required />
                  <input value="Submit" type="submit" />
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

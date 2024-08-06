import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { createOrder } from '../../actions/orderAction';
import toast from 'react-hot-toast';
import { CLEAR_ERRORS } from '../../constants/orderConstants';
// import { useNavigate } from 'react-router-dom';

const Success = () => {
    // const { queryParams } = useParams();
    // const navigate = useNavigate();
    const [paymentInfo, setPaymentInfo] = useState(null);
    // const {isAuthenticated} = useSelector((state)=>state.user)
    const queryParameters = new URLSearchParams(window.location.search);
    const queryData = queryParameters.get('data');
    const{error,success}=useSelector((state)=>state.newOrder)
    const dispatch = useDispatch();

    const existingData = localStorage.getItem('orderInfo');
    let Orderdata = existingData ? JSON.parse(existingData) : {};


    useEffect(() => {
        // if(!isAuthenticated){
        //     navigate('/login')
        // }
        if(success){
            toast.success("Order Placed Successfully");
        }
        if (queryData) {
            // Decode the Base64 string
            console.log(queryData);
            const decodedString = atob(queryData);
            const paymentInfo = JSON.parse(decodedString);

            // Update the state with the payment info
            setPaymentInfo(paymentInfo);
            if (paymentInfo.status === "COMPLETE") {
                Orderdata.payments = [];
                Orderdata.payments.push(paymentInfo);
                console.log(Orderdata)
                dispatch(createOrder(Orderdata));
            }
            if(error){
                console.log(error);
                toast.error(error);
                dispatch({type:"CLEAR_ERRORS"})
            }
        }
        else {
            console.log("No payment info found");
        }
    }, [queryData,dispatch]);


    return (
        <div>
            <div className="bg-gray-100 h-auto mt-32 ">
                <div className="bg-white p-6  md:mx-auto">
                    <svg viewBox="0 0 24 24" className="text-green-600 w-16 h-16 mx-auto my-6">
                        <path fill="currentColor"
                            d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z">
                        </path>
                    </svg>
                    <div className="text-center">
                        <h3 className="md:text-2xl text-base text-gray-900 font-semibold text-center">Payment Done!</h3>
                        <p className="text-gray-600 my-2">Thank you for completing your secure online payment.</p>
                        <p> Have a great day!  </p>
                        <div className="py-10 text-center">
                            <Link to={"/"} className="px-12 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3">
                                GO BACK
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Success

import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import React, { Fragment } from 'react';
import CartItem from "./CartItem";
import { removeItemsFromCart } from '../../actions/cartAction';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { cartItems } = useSelector(state => state.cart);
    const {isAuthenticated} = useSelector(state => state.user)
    
    const deleteHandler = (id) => {
        dispatch(removeItemsFromCart(id));
        toast.success("Item Removed from Cart");
    };

    const placeOrderHandler = (e) =>{
        if(isAuthenticated){
            navigate("/checkout")
        }else{
            navigate("/login")
        }
    }

    return (
        <Fragment>
            {cartItems.length === 0 ? (
                <span className='absolute top-[40vh] left-[10vw] lg:left-[40vw] m-auto bg-white text-4xl'>No item in cart Yet</span>
            ) : (
                <>
                    <div className="flex flex-col md:flex-row w-screen h-full px-2 pt-24 md:px-14 py-7 bg-white" >

                        {/* My cart text heading */}
                        <div className="w-full flex flex-col h-fit gap-1 md:gap-4 p-0.5 md:p-4 ">
                            <p className="text-blue-900 text-xl font-extrabold">My cart</p>
                            {
                                cartItems && cartItems.map(item => (
                                    <CartItem key={item.product} item={item} deleteHandler={deleteHandler} />
                                ))
                            }
                        </div>

                        {/* <!-- Purchase Resume --> */}
                        <div className="flex flex-col w-full md:w-2/3 h-fit gap-4 p-4">
                            <p className="text-blue-900 text-xl font-extrabold">Purchase Resume</p>
                            <div className="flex flex-col p-4 gap-4 text-lg font-semibold shadow-md border rounded-sm">
                                <div className="flex flex-row justify-between">
                                    <p className="text-gray-600">total</p>
                                    <p className="text-end font-bold">
                                        {/* uderstand below code */}
                                        {`₹${cartItems.reduce(
                                            (acc, item) => acc + item.quantity * item.price,
                                            0
                                        )}`}
                                    </p>
                                </div>
                                <hr className="bg-gray-200 h-0.5" />
                                {/* I will regulatly learn and update react */}
                                {/* <div className="flex flex-row justify-between">
                                    <p className="text-gray-600">Tax</p>
                                    <div>
                                        <p className="text-end font-bold">{`₹${cartItems.reduce(
                                            (acc, item) => acc + item.quantity * item.price,
                                            0
                                        )}`}</p>
                                        <p className="text-gray-600 text-sm font-normal">Arrives on Jul 16</p>
                                    </div>
                                </div>
                                <hr className="bg-gray-200 h-0.5" />
                                <div className="flex flex-row justify-between">
                                    <p className="text-gray-600">Discount Coupon</p>
                                    <a className="text-gray-500 text-base underline" href="#">Add</a>
                                </div>
                                <hr className="bg-gray-200 h-0.5" />
                                <div className="flex flex-row justify-between">
                                    <p className="text-gray-600">Total</p>
                                    <div>
                                        <p className="text-end font-bold">$103.88</p>
                                    </div>
                                </div> */}
                                <div className="flex gap-2">
                                    <button onClick={placeOrderHandler} className="transition-colors text-sm bg-blue-600 hover:bg-blue-700 p-2 rounded-sm w-full text-white text-hover shadow-md">
                                        PLACE ORDER
                                    </button>
                                    <Link to={'/product'} className="transition-colors text-sm bg-white border border-gray-600 p-2 rounded-sm w-full text-gray-700 text-hover shadow-md">
                                        ADD MORE PRODUCTS
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </Fragment>
    )
}

export default Cart
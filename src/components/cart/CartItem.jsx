import React from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import { Link } from 'react-router-dom';
// import { useSelector } from 'react-redux';

const CartItem = ({item,deleteHandler}) => {
    // to add increase decrease functionality i has to bring stock in cartItems I may do it later
    // const [quantity,setQuantity] = useState(item.quantity);

    //increase quantity of item in cart function
    // const increaseQuantity = () => {
    //     if (productDetails.product.stock <= item.quantity) return;
    //     const qty = quantity + 1;
    //     setQuantity(qty);
    // };

    // //increase quantity of item in cart function
    // const decreaseQuantity = () => {
    //     if (1 >= quantity) return;
    //     const qty = quantity - 1;
    //     setQuantity(qty);
    // };
    
    
    return (
        <>
            {/* <!-- Product --> */}
            <div className="flex flex-col p-0.5 md:p-4 text-lg font-semibold shadow-md border rounded-sm">
                <div className="flex flex-row gap-0.5 md:gap-3 justify-between p-1">
                    {/* <!-- Product Information --> */}
                    <div className="flex flex-row gap-6 items-center">
                        <div className="w-28 h-28">
                            <img alt="item_image" className="w-full h-full" src={item.image} />
                        </div>
                        <div className="flex flex-col">
                            <Link to={`/productDetail/${item.product}`} className="text-lg text-gray-800 font-semibold">{item.name}</Link>
                            {/* show selected quantity and if want then increase or decrease quantity */}
                            <div className="mt-2">
                                <div className="flex items-center mt-1 gap-5">
                                    {/* <button onClick={increaseQuantity} className="text-gray-700 focus:outline-none hover:text-gray-950">
                                        <svg className="h-5 w-5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                    </button> */}
                                    <span className="text-gray-700 text-lg mx-2">Qty:{item.quantity}</span>
                                    {/* <button onClick={decreaseQuantity} className="text-gray-700 focus:outline-none hover:text-gray-950">
                                        <svg className="h-5 w-5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                    </button> */}
                                </div>
                            </div>

                        </div>
                    </div>
                    {/* <!-- Price Information --> */}
                    <div className="self-center text-center">
                        {/* <p className="text-gray-600 font-normal text-sm line-through">$99.99   //strike out to show discount use when needed
                            <span className="text-emerald-500 ml-2">(-50% OFF)</span>  
                        </p> */}
                        <p className="text-gray-800 font-normal text-xl">रु{item.price*item.quantity}</p>
                    </div>
                    {/* <!-- Remove Product Icon --> */}
                    <div className="self-center">
                        <button onClick={()=>deleteHandler(item.product)} className="hover:text-gray-700 text-gray-900 ">
                        <DeleteIcon/>
                        </button>
                    </div>
                </div>
                </div>
            </>
            )
}

            export default CartItem
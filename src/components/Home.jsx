//tasks to do
// 1)get product list and implement it here 
// 2)add cloudinary --> when you make admin to create products
// 3)add <react-hot-toast>
// 4)add loader
import { Fragment, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getProduct, clearErrors } from '../actions/productAction'
import { useSelector } from 'react-redux'
import ProductCard from '../components/Product/ProductCard';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
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
            <div className="flex flex-col z-10 mb-32 gap-10 bg-black overflow-x-hidden">
                
                {/* hero image */}
                <div className="HeroImg">
                    <img src="./main.jpg" alt="main image" />
                </div>

                {/* services */}
                <div className="services w-screen h-auto flex flex-col">
                    <span className="title text-4xl inter-bold text-white underline flex justify-center ">Services</span>
                    <div className="servicesicon flex flex-row justify-center w-full gap-32">
                        <div className="taxBilling flex flex-col w-auto h-auto">
                            <img src="./tax.png" alt="taxbilling" className='h-36 w-36' />
                            <span className="tax roboto-mono-regular flex justify-center text-white">Tax Billing</span>
                        </div>

                        <div className="delivary flex flex-col w-auto h-auto ">
                            <img src="./delivary.png" alt="taxbilling" className='h-36 w-36'/>
                            <span className="tax roboto-mono-regular flex justify-center text-white">Free Delivery</span>
                        </div>

                        <div className="warrenty flex flex-col w-auto h-auto">
                            <img src="./warrenty.png" alt="taxbilling" className='h-36 w-36'/>
                            <span className="tax roboto-mono-regular flex justify-center text-white">upto 12 months warrenty</span>
                        </div>

                        <div className="discount flex flex-col w-auto h-auto">
                            <img src="./discount.png" alt="taxbilling" className='h-36 w-36' />
                            <span className="tax roboto-mono-regular flex justify-center text-white">Discount upto 25%</span>
                        </div>

                    </div>
                </div>



                {/* We also repair mobiles */}
                <div className="mt-12 md:mt-0 w-full h-screen">
                    <div className="w-full h-auto">
                        <img
                            src="./repair.jpg"
                            alt="smallImage"
                            className="h-5/6 w-full mx-auto md:m-auto rounded-xl absolute "
                        />
                        <div className="h-5/6 w-full absolute text-white inter-regular text-xl md:text-3xl bg-gray-900 bg-opacity-80 ">
                            <div className="w-3/4 h-full flex flex-col justify-center items-center mx-auto space-y-4 tracking-wider p-4 md:p-0">
                                We also Repair Mobile Phones
                                <Link to={'/product'} className="text-lg underline hover:text-gray-300 cursor-pointer">SEE MORE</Link>
                            </div>
                        </div>
                    </div>
                    
                </div>


                {/* products on offer */}
                    <span className="title text-4xl inter-bold text-white underline flex justify-center ">Products on offer</span>
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
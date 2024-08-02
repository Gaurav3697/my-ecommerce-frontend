import { useNavigate } from 'react-router-dom';
import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { Country, State } from "country-state-city";
import CheckOutSteps from './CheckOutSteps';
import { saveShippingInfo } from '../../actions/cartAction';

const Shipping = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { isAuthenticated } = useSelector((state) => state.user)
    const { shippingInfo } = useSelector((state) => state.cart);
    const [address, setAddress] = useState(shippingInfo.address);
    const [city, setCity] = useState(shippingInfo.city);
    const [state, setState] = useState(shippingInfo.state);
    const [country, setCountry] = useState(shippingInfo.country);
    const [pinCode, setPinCode] = useState(shippingInfo.pinCode);
    const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo);

    const shippingSubmit = (e) => {
        e.preventDefault();
        if (phoneNo.length < 10 || phoneNo.length > 10) {
            toast.error("Phone Number should be 10 digits Long");
            return;
        }
        dispatch(
            saveShippingInfo({ address, city, state, country, pinCode, phoneNo })
        );
        navigate('/order/confirm');
    };

    useEffect(()=>{
        if(!isAuthenticated){
            navigate('/login')
            console.log("I am from profile")
        }
    },[isAuthenticated,navigate])
    return (
        <Fragment>
            <div className='h-auto w-screen bg-white mt-24 overflow-y-hidden'>
                <CheckOutSteps activeStep={0} />

                <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 bg-white h-auto mt-6">
                    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Shipping Details</h2>
                    </div>
                    <div className="flex flex-col gap-2 mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                        <form
                            className="space-y-6"
                            encType="multipart/form-data"
                            onSubmit={shippingSubmit}
                        >
                            <div>
                                <input
                                    className='p-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                                    type="text"
                                    placeholder="Address"
                                    required
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                />
                            </div>

                            <div>
                                <input
                                    className='p-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                                    type="text"
                                    placeholder="City"
                                    required
                                    value={city}
                                    onChange={(e) => setCity(e.target.value)}
                                />
                            </div>

                            <div>
                                <input
                                    className='p-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                                    type="number"
                                    placeholder="Pin Code"
                                    required
                                    value={pinCode}
                                    onChange={(e) => setPinCode(e.target.value)}
                                />
                            </div>

                            <div>
                                <input
                                    className='p-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                                    type="number"
                                    placeholder="Phone Number"
                                    required
                                    value={phoneNo}
                                    onChange={(e) => setPhoneNo(e.target.value)}
                                    size="10"
                                />
                            </div>

                            <div>
                                <select
                                    className='p-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                                    required
                                    value={country}
                                    onChange={(e) => setCountry(e.target.value)}
                                >
                                    <option value="">Country</option>
                                    {Country &&
                                        Country.getAllCountries().map((item) => (
                                            <option key={item.isoCode} value={item.isoCode}>
                                                {item.name}
                                            </option>
                                        ))}
                                </select>
                            </div>

                            {country && (
                                <div>
                                    <select
                                        required
                                        value={state}
                                        onChange={(e) => setState(e.target.value)}
                                    >
                                        <option value="">State</option>
                                        {State &&
                                            State.getStatesOfCountry(country).map((item) => (
                                                <option key={item.isoCode} value={item.isoCode}>
                                                    {item.name}
                                                </option>
                                            ))}
                                    </select>
                                </div>
                            )}

                            <input
                                className='p-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                                type="submit"
                                value="Continue"
                                disabled={state ? false : true}
                            />
                        </form>

                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default Shipping
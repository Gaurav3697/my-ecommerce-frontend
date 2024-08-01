import React from 'react'
import { Link } from 'react-router-dom'
import CancelIcon from '@mui/icons-material/Cancel';

const Failure = () => {
    return (
        <div>
            <div className="bg-gray-100 h-auto mt-32">
                <div className="bg-white p-6  md:mx-auto">
                    <svg viewBox="0 0 24 24" className="text-red-600 w-16 h-16 mx-auto my-6">
                        <CancelIcon />
                    </svg>
                    <div className="text-center">
                        <h3 className="md:text-2xl text-base text-gray-900 font-semibold text-center">Payment Failed!</h3>
                        <p> Please, try again !  </p>
                        <div className="py-10 text-center">
                            <Link to={"http://localhost:3000/checkout"} className="px-12 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3">
                                GO BACK
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Failure

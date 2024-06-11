import React from 'react'
import { Link } from 'react-router-dom'

const forgetPassword = () => {
    return (
        <>
            <div className='flex flex-col m-auto relative top-32 w-1/2 border border-gray-400 rounded-2xl'>
                <span className="m-5 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Forgot password</span>
                <div className='flex flex-col gap-5 '>
                    <label htmlFor="email" className="flex justify-center text-xl font-medium leading-6 text-gray-600 items-center">Email address</label>
                    <div className="mt-2">
                        <input id="email" name="email" type="email" autocomplete="email" placeholder='Email' required className=" w-3/4 m-auto p-4 block rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                    </div>
                </div>
                <div className='flex m-6'>
                    <Link to={'/resetPassword'} className="flex w-1/2 m-auto justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Register</Link>
                </div>
                <span className="m-5 text-center text-lg leading-9 tracking-tight text-gray-600">we will send email to your email account for password recovery</span>
            </div>
        </>
    )
}

export default forgetPassword
import React, { Fragment, useEffect } from 'react'
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import {logout } from '../../actions/userAction';
import { Navigate } from 'react-router-dom';

const Profile = () => {
    // When reloaded userData is deleated and isAuthenticated becomes false again so I will save the user data and other datas in localStorage but at last
    const dispatch = useDispatch();
    const {loading,user,isAuthenticated,error} = useSelector((state)=>state.user)
    const navigate = useNavigate();
    const logoutHandler = ()=>{
        dispatch(logout());
        toast.success("Logged Out Successfully");
    }

    useEffect(()=>{
        if(error){
            toast.error(error);
            console.log(error.message);
        }
        if(!isAuthenticated){
            navigate('/login')
        }
    },[error,isAuthenticated])

    return (
        // <Fragment>
        //     { loading ? ("<h1>LOADING</h1>"):
              <Fragment>
                {user && user.name? (
                    <Fragment>
                        <div className='h-screen w-screen bg-white overflow-x-hidden border '>
                <div className="container mx-auto my-24 p-5 ">
                    <div className="md:flex no-wrap md:-mx-2 border">
                        {/* <!-- Left Side --> */}
                        <div className="w-full md:w-3/12 md:mx-2 border ">
                            {/* <!-- Profile Card --> */}
                            <div className="bg-white p-3 border-t-4 border-green-400">
                                {/* user image */}
                                <div className="image overflow-hidden">
                                    <img className="h-auto w-full mx-auto"
                                    // i will replace the image with user original image after making register page
                                        src="/Profile.png"
                                        alt="user profile" />
                                </div>
                                {/* user information */}
                                <h1 className="flex items-center justify-center text-center text-gray-900 font-bold text-xl leading-8">{user.name}</h1>
                                <ul
                                    className="bg-gray-100 text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm">
                                    <li className="flex flex-col items-center py-1">
                                        <span>Joined at</span>
                                        {/* to show readable date change it from the backend */}
                                        <span >{user.createdAt}</span>
                                    </li>
                                </ul>
                            </div>
                            {/* <!-- End of profile card --> */}

                        </div>
                        {/* here we will show the user information in right side*/}
                        {/* <!-- Right Side --> */}
                        <div className="w-full md:w-9/12 mx-2 h-64">
                            {/* <!-- Profile tab --> */}
                            {/* <!-- About Section --> */}
                            <div className="bg-white p-3 shadow-sm rounded-sm">
                                <div className="flex justify-center text-center text-2xl items-center space-x-2 font-semibold text-gray-900 leading-8">
                                    <span clas="text-green-500">
                                        <svg className="h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                            stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                    </span>
                                    <span className=" m-3">About</span>
                                </div>
                                <div className="text-gray-700 m-5">
                                    <div className="grid md:grid-cols-2 text-lg gap-10">
                                        <div className="grid grid-cols-2">
                                            <div className="px-4 py-2 font-semibold">Name</div>
                                            <div className="px-4 py-2">{user.name}</div>
                                        </div>
                                        
                                        <div className="grid grid-cols-2">
                                            <div className="px-4 py-2 font-semibold">Email</div>
                                            <div className="px-4 py-2">{user.email}</div>
                                        </div>
                                        <div className="grid grid-cols-2">
                                            <div className="px-4 py-2 font-semibold">Role</div>
                                            <div className="px-4 py-2">{user.role}</div>
                                        </div>
                                        {/* if you want to add more data you can do it in future */}
                                        {/* <div className="grid grid-cols-2">
                                            <div className="px-4 py-2 font-semibold">Contact No.</div>
                                            <div className="px-4 py-2">+11 998001001</div>
                                        </div>
                                        <div className="grid grid-cols-2">
                                            <div className="px-4 py-2 font-semibold">Current Address</div>
                                            <div className="px-4 py-2">Beech Creek, PA, Pennsylvania</div>
                                        </div>
                                        <div className="grid grid-cols-2">
                                            <div className="px-4 py-2 font-semibold">Permanant Address</div>
                                            <div className="px-4 py-2">Arlington Heights, IL, Illinois</div>
                                        </div>
                                        <div className="grid grid-cols-2">
                                            <div className="px-4 py-2 font-semibold">Email.</div>
                                            <div className="px-4 py-2">
                                                <a className="text-blue-800" href="mailto:jane@example.com">jane@example.com</a>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-2">
                                            <div className="px-4 py-2 font-semibold">Birthday</div>
                                            <div className="px-4 py-2">Feb 06, 1998</div>
                                        </div> */}
                                    </div>
                                </div>
                                <Link
                                    className="flex items-center justify-center text-center w-44 m-auto text-gray-800 text-sm font-semibold rounded-lg hover:bg-gray-100 focus:outline-none focus:shadow-outline focus:bg-gray-100 hover:shadow-xs p-3 my-4 ">
                                    Change Profile Detail
                                </Link>
                                <Link
                                to={'/user/updatePassword'}
                                    className="flex items-center justify-center text-center w-44 m-auto text-gray-800 text-sm font-semibold rounded-lg hover:bg-gray-100 focus:outline-none focus:shadow-outline focus:bg-gray-100 hover:shadow-xs p-3 my-4">
                                    Change Password
                                </Link>
                                <button
                                    onClick={logoutHandler}
                                    className="block w-32 m-auto text-white bg-red-400 text-lg font-semibold rounded-xl hover:bg-red-600 cursor-pointer hover:shadow-xs p-3 my-4">
                                    Logout
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
                    </Fragment>
                ):(
                    <h1>Loading...</h1>
                )}

              </Fragment>
        //     }
        // </Fragment>
    )
}

export default Profile
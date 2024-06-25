import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import React, { Fragment } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { clearErrors,register } from '../../actions/userAction';
import toast from 'react-hot-toast';

//when i tries to register using image i got error 500 it means there is error in my backend so for now i will just do without image
//so will learn to add media in cloudinary properly and take time to practice it then i wll do my job
const Register = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isAuthenticated, loading, error } = useSelector(state => state.user);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // const [avatar, setAvatar] = useState(null);
    // const [avatarPreview, setAvatarPreview] = useState("/Profile.png");

    const registerSubmit = async (e) => {
        e.preventDefault();
        console.log(name,email,password);
        dispatch(register(name,email,password));
    };

    // const registerDataChange = (e) => {
    //     if (e.target.name === "avatar") {
    //         const file = e.target.files[0];
    //         const reader = new FileReader();
    //         reader.onload = () => {
    //             if (reader.readyState === 2) {
    //                 setAvatarPreview(reader.result);
    //                 setAvatar(file);
    //             }
    //         };
    //         reader.readAsDataURL(file);
    //     } else {
    //         setUser({ ...user, [e.target.name]: e.target.value });
    //     }
    // };

    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch(clearErrors());
        }
        if (isAuthenticated) {
            navigate("/user/me");
        }
    }, [error,dispatch,isAuthenticated,navigate])

    return (
        <Fragment>
        {
            loading ? (<div className='text-4xl h-screen w-screen flex justify-center mt-60'>Loading...</div> ):
            <Fragment>
            <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 bg-white h-auto mt-6">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Create a new account</h2>
                </div>

                <div className="flex flex-col gap-2 mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6" onSubmit={registerSubmit}>
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">Name</label>
                            <div className="mt-2">
                                <input value={name} onChange={(e)=>setName(e.target.value)} id="name" name="name" type="name" placeholder="name" autoComplete="name" required className="p-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
                            <div className="mt-2">
                                <input id="email" name="email" type="email" placeholder="email" value={email} onChange={(e)=>setEmail(e.target.value)} autoComplete="email" required className="p-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">password</label>
                            </div>
                            <div className="mt-2">
                                <input value={password} onChange={(e)=>setPassword(e.target.value)} id="password" name="password" type="password" placeholder="password" autoComplete="current-password" required className="p-4  block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                            </div>
                        </div>


                        {/* For image */}
                        {/* <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="files" className="block text-sm font-medium leading-6 text-gray-900">ProfilePic</label>
                            </div>
                            <div className="mt-2">
                                <img src={avatarPreview} alt="Avatar Preview" className='w-24 h-auto m-auto'/>
                                <input
                                    type="file"
                                    name="avatar"
                                    accept="image/*"
                                    onChange={registerDataChange}
                                    className="p-4  block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div> */}

                        <div>
                            <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign in</button>
                        </div>
                    </form>

                    <span className="m-5 text-center text-2xl font-bold leading-9 tracking-tight text-gray-600">Already a user</span>
                    <div>
                        <Link to={'/login'} className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Log in</Link>
                    </div>
                </div>
            </div>
        </Fragment> 
        }
    </Fragment>
    )
}

export default Register
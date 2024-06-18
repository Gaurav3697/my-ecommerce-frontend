import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import React, { Fragment } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { register } from '../../actions/userAction';
import toast from 'react-hot-toast';


//in the form value is used because email,name and password is already declared
const Register = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isAuthenticated, loading, error } = useSelector(state => state.user);
    const [user, setUser] = useState({
        name: "",
        email: "",
        password: ""
    });

    const { name, email, password } = user;

    const [avatar, setAvatar] = useState(null);
    const [avatarPreview, setAvatarPreview] = useState("/Profile.png");

    const registerSubmit = async (e) => {
        e.preventDefault();
        const myForm = new FormData();
        myForm.append('name', name);
        myForm.append('email', email);
        myForm.append('password', password);
        if(avatar){
            myForm.append('avatar', avatar);
        }
        dispatch(register(myForm));
    };

    const registerDataChange = (e) => {
        if (e.target.name === "avatar") {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onload = () => {
                if (reader.readyState === 2) {
                    setAvatarPreview(reader.result);
                    setAvatar(file);
                }
            };
            reader.readAsDataURL(file);
        } else {
            setUser({ ...user, [e.target.name]: e.target.value });
        }
    };

    useEffect(() => {
        if (error) {
            console.log(error);
            // toast.error(error);
        }
        if (isAuthenticated) {
            navigate("/me");
        }
    }, [error, toast, isAuthenticated, navigate])

    return (
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
                                <input onChange={registerDataChange} id="name" name="name" type="name" placeholder="name" value={name} autoComplete="name" required className="p-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
                            <div className="mt-2">
                                <input onChange={registerDataChange} id="email" name="email" type="email" placeholder="email" value={email} autoComplete="email" required className="p-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">password</label>
                            </div>
                            <div className="mt-2">
                                <input onChange={registerDataChange} id="password" name="password" type="password" placeholder="password" value={password} autoComplete="current-password" required className="p-4  block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                            </div>
                        </div>
                        <div>
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
                        </div>

                        <div>
                            <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign in</button>
                        </div>
                    </form>

                    <span className="m-5 text-center text-2xl font-bold leading-9 tracking-tight text-gray-600">Already a user</span>
                    <div>
                        <button className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"><Link to={'/register'}>Sign In</Link></button>
                    </div>


                </div>
            </div>
        </Fragment>
    )
}

export default Register
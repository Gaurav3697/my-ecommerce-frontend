import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from "react-hot-toast";
import { clearErrors, login } from '../../actions/userAction';
import { useNavigate } from "react-router-dom";

const Login = () => {
    const dispatch = useDispatch();
    const { loading, isAuthenticated, error } = useSelector((state) => state.user)
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(login(email, password));
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    useEffect(() => {
        if (error) {
            toast.error(error);
            console.log(error);
            dispatch(clearErrors());
        }
        if (isAuthenticated) {
            toast.success("Login Successfully");
            navigate("/user/me");
            console.log('isAuthenticated:', isAuthenticated);
        }

    }, [error, isAuthenticated, dispatch, navigate])


    return (
        <>
            {loading ? <h1>Loading...</h1> : (
                <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 bg-white h-screen">
                    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Login to your account</h2>
                    </div>

                    <div className="flex flex-col gap-5 mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                        <form className="space-y-6 " onSubmit={submitHandler} >
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
                                <div className="mt-2">
                                    <input id="email" name="email" type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="p-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                </div>
                            </div>

                            <div>
                                <div className="flex items-center justify-between">
                                    <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Password</label>
                                    <div className="text-sm">
                                        <Link to={'/forgotpassword'} className="font-semibold text-indigo-600 hover:text-indigo-500">Forgot password?</Link>
                                    </div>
                                </div>
                                <div className="mt-2">
                                    <input id="password" name="password" type={showPassword ? 'text' : 'password'} autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} required className="p-4  block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                    <label>
                                        <input
                                            type="checkbox"
                                            onChange={togglePasswordVisibility}
                                        />
                                        Show Password
                                    </label>
                                </div>
                            </div>

                            <div>
                                <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign in</button>
                            </div>
                        </form>

                        <span className="m-5 text-center text-2xl font-bold leading-9 tracking-tight text-gray-600">New User</span>
                        <div>
                            <Link to={'/register'} className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Register</Link>
                        </div>


                    </div>
                </div>
            )}
        </>
    )
}

export default Login
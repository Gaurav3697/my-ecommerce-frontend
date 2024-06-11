import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import React, { Fragment } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { register } from '../../actions/userAction';

const Register = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isAuthenticated, loading,error } = useSelector(state => state.user);
    const [user,setUser] = useState({
        name:"",
        email:"",
        password:""
    });

    const { name, email, password } = user;

    const [avatar, setAvatar] = useState("/Profile.png");
  const [avatarPreview, setAvatarPreview] = useState("/Profile.png");

  const registerSubmit = async (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("password", password);
    myForm.set("avatar", avatar);
    dispatch(register(myForm));
};

const registerDataChange = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(reader.result);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    } else {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
  };

  useEffect(()=>{
    if(isAuthenticated){
        navigate("/me");
    }
  })

    return (
        <Fragment>
            <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 bg-white h-screen mt-6">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Create a new account</h2>
                </div>

                <div className="flex flex-col gap-2 mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6" >
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">Name</label>
                            <div className="mt-2">
                                <input id="name" name="name" type="name" autocomplete="name" required className="p-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
                            <div className="mt-2">
                                <input id="email" name="email" type="email" autocomplete="email" required className="p-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">password</label>
                            </div>
                            <div className="mt-2">
                                <input id="password" name="password" type="password" autocomplete="current-password" required className="p-4  block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                            </div>
                        </div>
                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="files" className="block text-sm font-medium leading-6 text-gray-900">ProfilePic</label>
                            </div>
                            <div className="mt-2">
                                <input id="avatar" name="avatar" type="file" acceopt="image/*" required  className="p-4  block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
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
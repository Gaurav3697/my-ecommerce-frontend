import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { resetPassword } from '../../actions/userAction';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

const ResetPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {loading,error,success} = useSelector(state=>state.forgotPassword);
  const token = useParams().token;

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = new FormData();
    form.set('password',e.target.password.value);
    form.set('confirmPassword',e.target.confirmPassword.value);
    console.log(token,form);
    dispatch(resetPassword(token,form));
  }

  useEffect(() => {
    if(error){
      console.log(error);
      toast.error(error);
    }
    if(success){
      toast.success(success);
      navigate('/login');
    }
  }, [error,navigate,success])
  
  return (
    <>
    {loading ? "<h1>loading</h1>" : (
                <div className='flex flex-col m-auto relative top-32 w-1/2 border border-gray-400 rounded-2xl'>
                    <span className="m-5 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Forgot password</span>
                    <form onSubmit={handleSubmit}>
                        <div className='flex flex-col gap-5 '>
                            <label htmlFor="password" className="flex justify-center text-xl font-medium leading-6 text-gray-600 items-center">Password</label>
                            <div className="mt-2">
                                <input id="password" name="password" type="password" autocomplete="password" placeholder='Password' required className=" w-3/4 m-auto p-4 block rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                            </div>
                        </div>
                        <div className='flex flex-col gap-5 '>
                            <label htmlFor="confirmPassword" className="flex justify-center text-xl font-medium leading-6 text-gray-600 items-center">Confirm Password</label>
                            <div className="mt-2">
                                <input id="confirmPassword" name="confirmPassword" type="password" autocomplete="confirmPassword" placeholder='confirmPassword' required className=" w-3/4 m-auto p-4 block rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                            </div>
                        </div>
                        <div className='flex m-6'>
                            <button type='submit' className="flex w-1/2 m-auto justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Send</button>
                        </div>
                    </form>
                    <span className="m-5 text-center text-lg leading-9 tracking-tight text-gray-600">we will send email to your email account for password recovery</span>
                </div>
            )}
    </>
  )
}

export default ResetPassword
//When ou will give wrong password in old password,It will still change your password , resolve this problem else it can be harmful

import React,{useEffect} from 'react'
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux'
import { updatePassword } from '../../actions/userAction';
import { useNavigate } from 'react-router-dom'
import { UPDATE_PASSWORD_RESET } from '../../constants/userConstants';
import Loader from '../Loader';

const UpdatePassword = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {loading,error} = useSelector((state=>state.profile));
    let {isUpdated} = useSelector((state=>state.profile));
    const { isAuthenticated } = useSelector((state) => state.user)

    const submitFormHandler = (e)=>{
        e.preventDefault();
        const data = {
            oldPassword:e.target.oldPassword.value,
            newPassword:e.target.newPassword.value,
            confirmPassword:e.target.confirmPassword.value,
        }
        console.log(data);
        dispatch(updatePassword(data));
        console.log(isUpdated)

    }

    useEffect(() => {
      if(error){
        console.log(error);
        toast.error(error);
        isUpdated = false;
      }
      if(isUpdated){
        toast.success("password Changed successfully");
        navigate('/user/me');
        dispatch({
            type: UPDATE_PASSWORD_RESET,
          });
      }
      if(!isAuthenticated){
        navigate('/login')
        console.log("I am from profile")
    }
    }, [error,isUpdated,toast,navigate,isAuthenticated])
    

    return (
        <>
        {
            loading ? (<Loader/>) :
            <>
            <div className='h-screen w-screen bg-white'>
            <div className='flex flex-col m-auto relative top-32 w-1/2 border border-gray-400 rounded-2xl gap-4 ' >
                <span className="m-5 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Change Password</span>
                <form className="space-y-6" onSubmit={submitFormHandler}>
                <div className='w-3/4 m-auto'>
                    <div className="flex items-center justify-between">
                        <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Old Password</label>
                    </div>
                    <div className="mt-2">
                        <input id="oldPassword" name="OldPassword" type="password" autoComplete="current-password" required className="p-4  block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                    </div>
                </div>

                <div className='w-3/4 m-auto'>
                    <div className="flex items-center justify-between ">
                        <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">New password</label>
                    </div>
                    <div className="mt-2">
                        <input id="newPassword" name="newPassword" type="password" autoComplete="current-password" required className="p-4  block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                    </div>
                </div>

                <div className='w-3/4 m-auto'>
                    <div className="flex items-center justify-between">
                        <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Confirm Password</label>
                    </div>
                    <div className="mt-2">
                        <input id="confirmPassword" name="confirmPassword" type="password" autoComplete="current-password" required className="p-4  block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                    </div>
                </div>
                <div className='flex justify-center items-center text-center m-auto w-1/2 '>
                <button type="submit" className="m-6 flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Change Password</button>
                </div>
                </form>
            </div>
            </div>
            </>
        }
        </>
    )
}

export default UpdatePassword
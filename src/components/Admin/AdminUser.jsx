import { useSelector } from 'react-redux';
import SideBar from "./SideBar";
import ReusableTable from "./ReusableTable";
import { useDispatch } from "react-redux";
import { useEffect, useState } from 'react';
import { createColumnHelper } from '@tanstack/react-table';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { getAllUsers } from '../../actions/userAction';

const AdminUser = () => {
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((state) => state.user)
  const {loading,users,error} = useSelector((state)=>state.allusers) 
  const navigate = useNavigate();

  const deleteProductHandler = (id) => {
    // dispatch();
    toast.success("Product Deleted Successfully");
  }


  useEffect(() => {
    if (error) {
      console.log(error);
    }
    dispatch(getAllUsers());

    if (!isAuthenticated) {
      navigate('/login')
    }
  }, [dispatch, isAuthenticated]);

  const columnHelper = createColumnHelper(); //used to create column defination

  const columns = [
    columnHelper.accessor('name', {
      header: () => <span>Name</span>,
      size: "100px",
      // color:"blue",
    }),
    columnHelper.accessor('email', {
      header: () => <span>Email</span>,
      size: "100px",
      // color:"green",
    }),
    columnHelper.accessor('avatar', {
      header: <span>Avatar</span>,
      size: "100px",
      color: "red",
    }),
    columnHelper.accessor('role', {
      header: <span>Role</span>,
      size: "150px",
      // color:"blue",

    }),
    columnHelper.accessor('createdAt', {
      header: <span>created At</span>,
      size: "100px",
      // color:"green",

    }),
    columnHelper.accessor(row => row._id, {
      id: 'delete',
      header: () => <span>Delete</span>,
      cell: info => (
        <button onClick={() => deleteProductHandler(info.getValue())}>
          <DeleteIcon />
        </button>
      ),
      size: 50,
    }),

  ];

  return (
    <div className='mt-32 md:mt-20 box-border flex flex-row w-screen min-h-screen bg-white mb-32'>
      <SideBar />

      <div className="min-h-screen bg-gray-50/50 w-4/5">
        <div className="p-4 ">
          <span className='font-serif text-xl text-gray-500 uppercase'>{user.name}'s admin Dashboard -- Customers</span>

          {
            loading ? (<div className='text-4xl h-screen w-screen flex justify-center mt-60'>Loading...</div>) :
              (<ReusableTable data={users.user} columns={columns} />)
          }
        </div>
      </div>
    </div>
  )
}

export default AdminUser
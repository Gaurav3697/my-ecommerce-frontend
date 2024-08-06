import { useSelector } from 'react-redux';
import SideBar from "./SideBar";
import ReusableTable from "./ReusableTable";
import { useDispatch } from "react-redux";
import { useEffect, useState } from 'react';
import { createColumnHelper } from '@tanstack/react-table';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { getAllOrders } from '../../actions/orderAction';

const AdminUser = () => {
  const dispatch = useDispatch();
  const { user,isAuthenticated } = useSelector((state) => state.user)
  const navigate = useNavigate();
  const {loading,orders,error} = useSelector((state)=>state.allOrders)

  const deleteProductHandler = (id) => {
    // dispatch();
    toast.success("Product Deleted Successfully");
  }


  useEffect(() => {
    if (error) {
      console.log(error);
    }
    dispatch((getAllOrders()));

    if (!isAuthenticated) {
      navigate('/login')
    }
  }, [dispatch, isAuthenticated]);

  const columnHelper = createColumnHelper(); //used to create column defination

  const columns = [
    columnHelper.accessor('Item', {
      header: () => <span>Item</span>,
      size: "100px",
      // color:"blue",
    }),
    columnHelper.accessor('Item Image', {
      header: () => <span>Item Image</span>,
      size: "100px",
      // color:"blue",
    }),
    columnHelper.accessor('totalPrice', {
      header: () => <span>Item qty</span>,
      size: "100px",
      // color:"green",
    }),
    columnHelper.accessor('orderStatus', {
      header: <span>Item Status</span>,
      size: "100px",
      color: "red",
    }),
    columnHelper.accessor('createdAt', {
      header: <span>Created At</span>,
      size: "150px",
      // color:"blue",

    }),
  ];

  return (
    <div className='mt-32 md:mt-20 box-border flex flex-row w-screen min-h-screen bg-white mb-32'>
      <SideBar />

      <div className="min-h-screen bg-gray-50/50 w-4/5">
        <div className="p-4 ">
          {
            loading ? (<div className='text-4xl h-screen w-screen flex justify-center mt-60'>Loading...</div>) :
              (<ReusableTable data={orders.orders} columns={columns} />)
          }
        </div>
      </div>
    </div>
  )
}

export default AdminUser
import { useSelector } from 'react-redux';
import SideBar from "./SideBar";
import ReusableTable from "./ReusableTable";
import { useDispatch } from "react-redux";
import { useEffect, useState } from 'react';
import { createColumnHelper } from '@tanstack/react-table';
import { useNavigate } from 'react-router-dom';
import { deleteOrder, getAllOrders } from '../../actions/orderAction';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import toast from 'react-hot-toast';
import {DELETE_ORDER_RESET} from "../../constants/orderConstants"

const AdminUser = () => {
  const dispatch = useDispatch();
  const {isAuthenticated } = useSelector((state) => state.user)
  const navigate = useNavigate();
  const {loading,orders,error} = useSelector((state)=>state.allOrders)
  const { isDeleted, order:updatedOrder,error:updateError} = useSelector((state) => state.updateOrder)
  const [refresh,setRefresh] = useState(false);

  useEffect(() => {
    if (error) {
      console.log(error);
    }
    dispatch((getAllOrders()));

    if (!isAuthenticated) {
      navigate('/login')
    }
    if(isDeleted){
      toast.success("Product delete Successfully")
      dispatch({type:"DELETE_ORDER_RESET"})
    }

  }, [dispatch, isAuthenticated,isDeleted,refresh]);

  const columnHelper = createColumnHelper(); //used to create column defination

  const columns = [
    columnHelper.accessor('_id', {
      header: () => <span>Order Id</span>,
      size: "100px",
      // color:"blue",
    }),
    columnHelper.accessor('orderStatus', {
      header: () => <span>status_Processing</span>,
      size: "100px",
      // color:"blue",
    }),
    columnHelper.accessor('totalPrice', {
      header: () => <span>Total_price</span>,
      size: "100px",
      // color:"green",
    }),
    columnHelper.accessor('createdAt', {
      header: <span>Created At</span>,
      size: "150px",
      // color:"blue",
    }),
    columnHelper.accessor(row => row._id, {
      id: 'edit',
      header: () => <span>Edit</span>,
      cell: info => (
        <button onClick={() => handleEditClick(info.getValue())}>
          <EditIcon />
        </button>
      ),
      size: 50,
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

  const handleEditClick = (id) => {
    navigate(`/admin/order/${id}`);
  };

  const deleteProductHandler = (id) => {
    dispatch(deleteOrder(id));
    setRefresh(!refresh);
  }

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
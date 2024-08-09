// Update feature will be updated soon

import { useSelector } from 'react-redux';
import SideBar from "./SideBar";
import AddIcon from '@mui/icons-material/Add';
import ReusableTable from "./ReusableTable";
import { useDispatch } from "react-redux";
import { deleteProduct, getAdminProduct } from '../../actions/productAction';
import { useEffect, useState } from 'react';
import { createColumnHelper } from '@tanstack/react-table';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@mui/material";
import ProductForm from './ProductForm';
import toast from 'react-hot-toast';
import Loader from '../Loader';

const DialogBox = ({ DialogBoxToggle, open, Title }) => {
  return (
    <>
      <Dialog
        aria-labelledby="simple-dialog-title"
        open={open}
      // onClose={submitReviewToggle}
      >
        <DialogTitle>{Title}</DialogTitle>
        <DialogContent className="flex flex-col gap-3 overflow-hidden">
          <ProductForm />
        </DialogContent>
        <DialogActions>
          <Button onClick={DialogBoxToggle} color="secondary">
            Cancel
          </Button>

        </DialogActions>
      </Dialog>
    </>
  )

}

const AdminProduct = () => {
  const dispatch = useDispatch();
  const { loading, productList, error } = useSelector((state) => state.productList);
  const { loading:userLoading,user, isAuthenticated } = useSelector((state) => state.user)
  const { success, error: deleteError } = useSelector((state) => state.updateProduct)
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const DialogBoxToggle = () => {
    open ? setOpen(false) : setOpen(true);
  };

  const deleteProductHandler = (id) => {
    dispatch(deleteProduct(id));
  }

  useEffect(() => {
    if (error) {
      navigate('/profile')
      toast.error(error);
    }
    if (!isAuthenticated) {
      navigate('/login')
    }
    dispatch(getAdminProduct());
    if (success) {
      toast.success("Product delete Successfully");
      dispatch(getAdminProduct());
    }
    if (deleteError) {
      toast.error("Product didn't deleted successfully");
    }
    // console.log(productList.products); //ProductList is the array that contain message and array of products
  }, [dispatch, isAuthenticated, success,error]);

  const columnHelper = createColumnHelper(); //used to create column defination

  const columns = [
    columnHelper.accessor('name', {
      header: () => <span>Name</span>,
      size: "100px",
      // color:"blue",
    }),
    columnHelper.accessor('price', {
      header: () => <span>Price</span>,
      size: "100px",
      // color:"green",
    }),
    columnHelper.accessor('rating', {
      header: <span>Rating</span>,
      size: "100px",
      color: "red",
    }),
    columnHelper.accessor('category', {
      header: <span>Category</span>,
      size: "150px",
      // color:"blue",

    }),
    columnHelper.accessor('stock', {
      header: <span>Stock</span>,
      size: "100px",
      // color:"green",

    }),
    columnHelper.accessor('numOfReviews', {
      header: <span>Reviews</span>,
      size: "100px",
      // color:"red",
    }),
    columnHelper.accessor(row => row.images[0].url, {
      id: 'image',
      header: () => <span>Image</span>,
      cell: info => <img src={info.getValue()} alt="Product" style={{ width: '50px', height: '50px' }} />,
      size: 100,
    }),
    columnHelper.accessor(row => row._id, {
      id: 'edit',
      header: () => <span>Edit</span>,
      cell: info => (
        <button onClick={() => handleEditClick(info.getValue())}>
          <EditIcon onClick={DialogBoxToggle} />
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
    console.log('Edit product with id:', id);
    // Implement the logic to edit the product here
  };

  return (
    <div className='mt-32 md:mt-20 box-border flex flex-row w-screen min-h-screen bg-white mb-32'>
      <SideBar />

      <div className="min-h-screen bg-gray-50/50 w-full md:w-4/5">
        <div className="p-1 md:p-6 ">
          {
            userLoading ? ("") : (<span className='font-serif text-xl text-gray-500 uppercase'>{user.name}'s admin Dashboard -- Products</span>)
          }
          <div className="createproduct m-5">
            <button onClick={DialogBoxToggle} className="middle none font-sans font-bold center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 rounded-lg bg-gradient-to-tr from-gray-600 to-gray-400 text-white shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/40 active:opacity-[0.85] w-auto flex items-center gap-4 px-4 capitalize" type="button">
              <span className="h-8 w-8 bg-gray-900 rounded-full flex text-center justify-center"><AddIcon /></span>
              <p className="block antialiased font-sans text-base leading-relaxed text-inherit font-medium capitalize">ADD PRODUCT</p>
            </button>
          </div>

          {/* using DialogBox for adding new product */}
          {
            open ? <DialogBox DialogBoxToggle={DialogBoxToggle} open={open} Title={"Add a new product"} /> : null
          }

          {/* React table and pagination for products */}
          {
            loading ? (<Loader/>) :
              (
                <div className="">
                  {productList.products &&
                    <ReusableTable data={productList.products} columns={columns} />}
                </div>
              )
          }
        </div>
      </div>
    </div>
  )
}

export default AdminProduct
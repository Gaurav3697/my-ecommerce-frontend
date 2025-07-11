import { useState } from 'react'
import { Fragment, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getProduct } from '../../actions/productAction'
import { useSelector } from 'react-redux'
import ProductCard from '../../components/Product/ProductCard';
import { useParams } from 'react-router-dom';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { Typography } from '@mui/material'
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import Loader from '../Loader'

const categories = [
  "Laptop",
  "Smart Phones",
  "Fridge",
  "Wasing Machines",
  "Air Conditioners",
  "Camera",
];

const Product = () => {
  const dispatch = useDispatch();
  const { loading, error, productList } = useSelector((state) => state.productList);
  const [currentPage, setCurrentPage] = useState(1);
  const { keyword } = useParams();
  const [price, setPrice] = useState([0, 100000]);
  const [rating, setRating] = useState(0);
  const [category, setCategory] = useState(0);

  // for hamburger
  const [isOpen, setIsOpen] = useState(false);
  const genericHamburgerLine = `h-1 w-6 my-1 rounded-full bg-black transition ease transform duration-300`;

  const handleChange = (e, value) => {
    setCurrentPage(value);
  };

  const priceHandler = (event, newPrice) => {
    setPrice(newPrice);
  };

  useEffect(() => {
    if (error) {
      console.log(error);
    }
    dispatch(getProduct(keyword, currentPage, price, rating, category));
  }, [dispatch, error, keyword, currentPage, price, rating, category]);


  return (
    <Fragment>
      <div className='flex flex-col Product_Body pt-12 min-h-screen w-screen bg-black overflow-x-hidden'>
        <div className="h-auto grid grid-cols-5 relative">

          {/* hamburger menu */}
          <button
            className="flex flex-col h-12 w-12 rounded justify-center items-center group md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            <div
              className={`${genericHamburgerLine} ${isOpen
                ? "rotate-45 translate-y-3 opacity-50 group-hover:opacity-100"
                : "opacity-50 group-hover:opacity-100"
                }`}
            />
            <div
              className={`${genericHamburgerLine} ${isOpen ? "opacity-0" : "opacity-50 group-hover:opacity-100"
                }`}
            />
            <div
              className={`${genericHamburgerLine} ${isOpen
                ? "-rotate-45 -translate-y-3 opacity-50 group-hover:opacity-100"
                : "opacity-50 group-hover:opacity-100"
                }`}
            />
          </button>


          {/* Sticky filters sidebar (left) */}
          <div className={`${isOpen ? "block" : "hidden"} md:block col-span-1 h-full`}>
            <div className='flex flex-col gap-2 md:left-10 sticky top-20 h-auto overflow-y-auto py-4'>
              <center>
                <Typography>Price</Typography>
                <Box sx={{ width: 200 }}>
                  <Slider
                    value={price}
                    onChange={priceHandler}
                    valueLabelDisplay="auto"
                    // getAriaValueText={pricetext} //I didn't understood i will understand its need i will use it
                    min={0}
                    max={100000}
                  />
                </Box>
              </center>
              <center>
                <Typography>Ratings Above</Typography>
                <Box sx={{ width: 200 }}>
                  <Slider
                    value={rating}
                    onChange={(e, newRating) => {
                      setRating(newRating);
                      console.log(rating);
                    }}
                    valueLabelDisplay="auto"
                    // getAriaValueText={pricetext} //I didn't understood i will understand its need i will use it
                    min={0}
                    max={5}
                  />
                </Box>
              </center>
              <center>
                <Typography>Categories</Typography>
                <ul className="flex flex-col m-auto w-3/4 p-2 border border-gray-700 mt-2 rounded-lg">
                  {categories.map((category) => (
                    <li
                      className="text-sm text-white hover:bg-gray-400 px-4 py-1 rounded-xl transition-all cursor-pointer"
                      key={category}
                      onClick={() => setCategory(category)}
                    >
                      {category}
                    </li>
                  ))}
                </ul>
              </center>
            </div>

          </div>

          <div className={`${isOpen ? "hidden" : "block"} md:block col-span-4 md:col-span-4 h-auto overflow-y-auto p-2 m-10`}>
            {
              loading ? (<Loader />) :
                (<div className='flex flex-wrap m-auto gap-4 bottom-3'>
                  {
                    productList.products && productList.products.map((product) => (
                      <ProductCard key={product._id} product={product} />
                    ))
                  }
                </div>)
            }

          </div>
        </div>

        {/* you have to also adjust the oagination for filtered product counts */}
        <div className="pagination h-auto flex justify-end items-center m-10">
          {
            productList.productCount && productList.resultPerPage ?
              (productList.productCount / productList.resultPerPage > 1 ? <Stack spacing={2}>
                <Pagination count={parseInt((productList.productCount / productList.resultPerPage) + 1)} color="primary" page={currentPage} onChange={handleChange} />
              </Stack> : "")
              :
              " "
          }
        </div>
      </div>
    </Fragment>
  )
}


export default Product



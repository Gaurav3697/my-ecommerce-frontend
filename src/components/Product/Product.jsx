import { useState } from 'react'
import React, { Fragment, useEffect } from 'react'
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
    dispatch(getProduct(keyword, currentPage, price,rating,category));
  }, [dispatch, error, keyword, currentPage, price,rating,category]);


  return (
    <Fragment>
     {loading? (<div className='text-4xl h-screen w-screen flex justify-center mt-60'>Loading...</div>)  :
      <div className='flex flex-col gap-4 Product_Body mt-24 mb-36 h-auto w-screen bg-white'>
      <div className="h-auto grid grid-cols-5">
        <div className="filters h-screen col-span-1" >
          <span className="text-2xl font-serif text-gray-800 flex justify-center m-10 underline">Filters</span>
          <div className='flex flex-col gap-7'>
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
          <ul className="flex flex-col gap-5 m-auto w-3/4 p-5">
            {categories.map((category) => (
              <li
                className="text-md text-black hover:bg-gray-300 p-3 border rounded-xl transition-all cursor-pointer"
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
        <div className="product_containers h-auto col-span-4 p-2">
          <div className='flex flex-wrap m-auto gap-4 bottom-3'>
            {
              productList.products && productList.products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))
            }
          </div>
        </div>
      </div>
      {/* you have to also adjust the oagination for filtered product counts */}
      <div className="pagination h-auto flex justify-end items-center m-10">
        {
          productList.productCount && productList.resultPerPage ?
          (productList.productCount/productList.resultPerPage>1?<Stack spacing={2}>
            <Pagination count={parseInt((productList.productCount / productList.resultPerPage) + 1)} color="primary" page={currentPage} onChange={handleChange} />
          </Stack>:"")
             :
            " "
        }
      </div>
    </div>}
    </Fragment>
  )
}


export default Product



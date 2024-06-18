//show filters
//show products
// show pagination
// due to copy paste and not trying to understand its basic you also stucked here

import React,{Fragment, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'

const categories = [
  "Laptop",
  "Mobile",
  "Home Appliances",
  "TV",
  "Headphones",
  "Luxary Electronic Items"
]

const Product = ({match}) => {  //why to set match
  const dispatch = useDispatch();
  const [currentPage,setCurrentPage] = useState(1);
  const[price,setPrice] = useState([0,25000]);
  const [category,setCategory] = useState("");
  const [ratings,setRatings] = useState(0);
  
  //see what are things that can be extracted and what are the things that aren't
  const{
    products,
    loading,
    error,
    productsCount,
    resultPerPage
  } = useSelector((state) => state.productList);

  const keyword = match.params.keyword;

  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };

  const priceHandler = (event, newPrice) => {
    setPrice(newPrice);
  };


  return (
    <Fragment>

    </Fragment>
  )
}

export default Product
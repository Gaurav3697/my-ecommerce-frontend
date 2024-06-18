//show filters
//show products
// show pagination

import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Search = () => {
  const [keyword,setKeyword] = useState("");
  const navigate = useNavigate();

  const searchSubmitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/products/${keyword}`);
    } else {
      navigate("/products");
    }
  };

  return (
    <div>Search</div>
  )
}

export default Search
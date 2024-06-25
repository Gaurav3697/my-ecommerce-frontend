import axios from "axios";

import {
    PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_FAIL,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,
    NEW_REVIEW_REQUEST,
    NEW_REVIEW_SUCCESS,
    NEW_REVIEW_FAIL,
    CLEAR_ERRORS,
} from "../constants/productConstants";
import {server} from "../index";

//Get all Product
export const getProduct = (keyword="" , currentPage=1, price=[0,100000],rating=0, category,)=>
    async(dispatch) =>{
        try {
            dispatch({type: PRODUCT_LIST_REQUEST});
            let  link = `${server}/product?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&rating[gte]=${rating}`; //frontend is right but there is some flaw in backend.Lets match
            if(category){
                link = `${server}/product?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&rating[gte]=${rating}`;
            }
            // const link = `${server}/product`
            const {data} = await axios.get(link);
            dispatch({
                type:PRODUCT_LIST_SUCCESS,
                payload:data,
            });
        } catch (error) {
            dispatch({
                type:PRODUCT_LIST_FAIL,
                payload:error.response.data.message,
            });
        }
    };

//get product Detail
export const getProductDetail = (id) => async(dispatch)=>{
    try {
        dispatch({type:PRODUCT_DETAILS_REQUEST});
        const {data} = await axios.get(`${server}/product/${id}`);
        dispatch({
            type:PRODUCT_DETAILS_SUCCESS,
            payload:data,
        });
    } catch (error) {
        dispatch({
            type:PRODUCT_DETAILS_FAIL,
            payload:error.response.data.message,
        });
    }
};

// NEW REVIEW
export const newReview = (reviewData,id) => async (dispatch) => {
    try {
      dispatch({ type: NEW_REVIEW_REQUEST });
  
      const { data } = await axios.post(`${server}/product/reviews/${id}`, reviewData, {withCredentials: true} );
  
      dispatch({
        type: NEW_REVIEW_SUCCESS,
        payload: data.success,
      });
    } catch (error) {
      dispatch({
        type: NEW_REVIEW_FAIL,
        payload: error.response.data.message,
      });
    }
  };


// Clearing Errors
export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
  };
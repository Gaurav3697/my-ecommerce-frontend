import axios from "axios";

import {
    PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_FAIL,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,
} from "../constants/productConstants";
import {server} from "../index";

//Get all Product
export const getProduct = (keyword="" , currentPage=1, price=[0,25000], category,rating=0)=>
    async(dispatch) =>{
        try {
            dispatch({type: PRODUCT_LIST_REQUEST});
            // const link = `{server}/api/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&rating[gte]=${rating}`;
            if(category){
                link = `{server}/api/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&rating[gte]=${rating}`;
            }
            let link = `${server}/product`
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
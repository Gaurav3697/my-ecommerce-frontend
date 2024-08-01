import axios from "axios";
import {
    CREATE_ORDER_REQUEST,
    CREATE_ORDER_SUCCESS,
    CREATE_ORDER_FAIL,
    // MY_ORDERS_REQUEST,
    // MY_ORDERS_SUCCESS,
    // MY_ORDERS_FAIL,
    // ORDER_DETAILS_REQUEST,
    // ORDER_DETAILS_SUCCESS,
    // ORDER_DETAILS_FAIL,
    ALL_ORDERS_REQUEST,
    ALL_ORDERS_SUCCESS,
    ALL_ORDERS_FAIL,
    PAYMENT_REQUEST,
    PAYMENT_SUCCESS,
    PAYMENT_FAIL,
} from "../constants/orderConstants";
import { server } from "../index";

export const createOrder = (order) => async (dispatch) => {
    try {
        dispatch({
            type: CREATE_ORDER_REQUEST,
        });

        const config = {
            headers: {
                "Content-Type": "application/json",
            },
            withCredentials: true
        };

        const { data } = await axios.post(`/api/orders`, order, config);

        dispatch({
            type: CREATE_ORDER_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: CREATE_ORDER_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const getAllOrders = () => async (dispatch) => {
    try {
        dispatch({
            type: ALL_ORDERS_REQUEST,
        });

        const { data } = await axios.get(`${server}/orders/all`,{withCredentials:true});

        dispatch({
            type: ALL_ORDERS_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: ALL_ORDERS_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const getPaymentData = (price) => async (dispatch) => {
    try {
        dispatch({
            type: PAYMENT_REQUEST,
        });

        const { data } = await axios.post(`${server}/orders/payment`, { price }, {withCredentials:true});

        dispatch({
            type: PAYMENT_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: PAYMENT_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};
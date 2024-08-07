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
    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS,
    ORDER_DETAILS_FAIL,
    UPDATE_ORDER_SUCCESS,
    UPDATE_ORDER_REQUEST,
    UPDATE_ORDER_FAIL,
    DELETE_ORDER_REQUEST,
    DELETE_ORDER_SUCCESS,
    DELETE_ORDER_FAIL,
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

        const { data } = await axios.post(`${server}/order/new`, order, config);

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

export const getOrderDetails = (id) => async (dispatch) => {
    try {
        dispatch({
            type: ORDER_DETAILS_REQUEST,
        });

        const { data } = await axios.get(`${server}/order/${id}`, {withCredentials:true});

        dispatch({
            type: ORDER_DETAILS_SUCCESS,
            payload: data.order,
        });
    } catch (error) {
        dispatch({
            type: ORDER_DETAILS_FAIL,

            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const updateOrder = (id, order) => async (dispatch) => {
    try {
        dispatch({
            type: UPDATE_ORDER_REQUEST,
        });

        const config = {
            withCredentials: true
        };

        const { data } = await axios.put(`${server}/order/${id}`, order, config);

        dispatch({
            type: UPDATE_ORDER_SUCCESS,
            payload: data.success,
        });
    } catch (error) {
        dispatch({
            type: UPDATE_ORDER_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const deleteOrder = (id) => async (dispatch) => {
    try {
        dispatch({
            type: DELETE_ORDER_REQUEST,
        });

        const { data } = await axios.delete(`${server}/order/${id}`, {withCredentials:true});

        dispatch({
            type: DELETE_ORDER_SUCCESS,
            payload: data.success,
        });
    } catch (error) {
        dispatch({
            type: DELETE_ORDER_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};
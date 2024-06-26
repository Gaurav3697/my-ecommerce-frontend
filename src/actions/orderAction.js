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
} from "../constants/orderConstants";

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

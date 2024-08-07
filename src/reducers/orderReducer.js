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
    // UPDATE_ORDER_REQUEST,
    // UPDATE_ORDER_SUCCESS,
    // UPDATE_ORDER_FAIL, 
    // DELETE_ORDER_REQUEST,
    // DELETE_ORDER_SUCCESS,
    // DELETE_ORDER_FAIL,
    PAYMENT_REQUEST,
    PAYMENT_SUCCESS,
    PAYMENT_FAIL,
    CLEAR_ERRORS,
    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS,
    ORDER_DETAILS_FAIL,
    UPDATE_ORDER_REQUEST,
    DELETE_ORDER_REQUEST,
    UPDATE_ORDER_SUCCESS,
    DELETE_ORDER_SUCCESS,
    UPDATE_ORDER_FAIL,
    DELETE_ORDER_FAIL,
} from "../constants/orderConstants";

export const newOrderReducer = (state = {}, action) => {
    switch (action.type) {
      case CREATE_ORDER_REQUEST:
        return {
          ...state,
          loading: true,
        };
  
      case CREATE_ORDER_SUCCESS:
        return { 
          loading: false,
          order: action.payload,
        };
  
      case CREATE_ORDER_FAIL:
        return {
          loading: false,
          error: action.payload,
        };
      case CLEAR_ERRORS:
        return {
          ...state,
          error: null,
        };
  
      default:
        return state;
    }
  };

  //get all orders
export const getAllOrdersReducer = (state = { orders: [],loading:true }, action) => {
    switch (action.type) {
      case ALL_ORDERS_REQUEST:
        return {
          loading: true,
        };

      case ALL_ORDERS_SUCCESS:
        return {
          loading: false,
          orders: action.payload,
        };

      case ALL_ORDERS_FAIL:
        return {
          loading: false,
          error: action.payload,
        };
      case CLEAR_ERRORS:
        return {
          ...state,
          error: null,
        };

      default:
        return state;
    }
  };

  //paymentreducer to store price, ans some other datas
export const paymentreducer = (state = { paymentData: [] , loading:true }, action) => {
  switch (action.type) {
    case PAYMENT_REQUEST:
      return {
        loading: true,
      };

    case PAYMENT_SUCCESS:
      return {
        loading: false,
        paymentData: action.payload,
      };

    case PAYMENT_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const orderDetailreducer = (state = { order: {}, loading:true }, action) => {
  switch (action.type) {
    case ORDER_DETAILS_REQUEST:
      return {
        loading: true,
      };

    case ORDER_DETAILS_SUCCESS:
      return {
        loading: false,
        order: action.payload,
      };

    case ORDER_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const updateOrderReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_ORDER_REQUEST:
    case DELETE_ORDER_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case UPDATE_ORDER_SUCCESS:
      return {
        loading: false,
        isUpdated: action.payload,
      };

    case DELETE_ORDER_SUCCESS:
      return {
        loading: false,
        isDeleted: action.payload,
      };

    case UPDATE_ORDER_FAIL:
    case DELETE_ORDER_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};
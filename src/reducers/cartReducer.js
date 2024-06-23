import {
    ADD_TO_CART,
    REMOVE_CART_ITEM,
    SAVE_SHIPPING_INFO,
    CLEAR_ERRORS
  } from "../constants/cartConstants";
  
  export const cartReducer = (
    state = { cartItems: [], shippingInfo: {} },
    action
  ) => {
    switch (action.type) {
      case ADD_TO_CART:
        const item = action.payload;
  
        const isItemExist = state.cartItems.find(
          (i) => i.product === item.product
        );
  
        if (isItemExist) {
          return {
            ...state,
            cartItems: state.cartItems.map((i) =>
              i.product === isItemExist.product ? item : i
            ),
          };
        } else {
          return {
            ...state,
            cartItems: [...state.cartItems, item],
          };
        }
  
      case REMOVE_CART_ITEM:
        return {
          ...state,
          cartItems: state.cartItems.filter((i) => i.product !== action.payload), //It will filter all the product with cart and show only that product whose id will not be equal to that of deleted product
        };
  
      case SAVE_SHIPPING_INFO:
        return {
          ...state,
          shippingInfo: action.payload,
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
  
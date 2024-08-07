import {createStore,combineReducers,applyMiddleware} from "redux";
import {thunk} from "redux-thunk";
import {composeWithDevTools} from "@redux-devtools/extension";
import {productsReducer,productDetailsReducer, newReviewReducer, newProductReducer, productReducer, productUpdateReducer} from "./reducers/productReducer";
import { allUsersReducer, forgotPasswordReducer, profileReducer, userReducer } from "./reducers/userReducer";
import { cartReducer } from "./reducers/cartReducer";
import { getAllOrdersReducer, newOrderReducer, orderDetailreducer, paymentreducer, updateOrderReducer } from "./reducers/orderReducer";
// import { persistStore, persistReducer } from 'redux-persist' //This helps to store userData in localhost when logged in but i want to do the same using cookie
// import storage from 'redux-persist/lib/storage' // defaults to localStorage for web


const reducer = combineReducers({
    productList:productsReducer,
    productDetails:productDetailsReducer,
    user:userReducer,
    profile:profileReducer,
    forgotPassword:forgotPasswordReducer,
    cart: cartReducer,
    newOrder:newOrderReducer,
    newReview: newReviewReducer,
    // admin product reducers
    newProduct: newProductReducer,
    updateProduct:productUpdateReducer,

    //admin userReducers
    allusers:allUsersReducer,

    //admin orderReducers
    allOrders:getAllOrdersReducer,
    paymentData:paymentreducer,
    orderDetail:orderDetailreducer,
    updateOrder:updateOrderReducer
})

// const persistConfig = { //when there is persistor
//   key: 'root',
//   storage,
// }

// const persistedReducer = persistReducer(persistConfig, reducer); when there is persistor


// you can set intial state og cart here like
let initialState = {
    cart: {
      cartItems: localStorage.getItem("cartItems")
        ? JSON.parse(localStorage.getItem("cartItems"))
        : [],
      shippingInfo: localStorage.getItem("shippingInfo")
        ? JSON.parse(localStorage.getItem("shippingInfo"))
        : {},
    },
  };

const middleware = [thunk];
const store = createStore(reducer,initialState,composeWithDevTools(applyMiddleware(...middleware)));
// when there is persistor
// const store = createStore(persistedReducer,composeWithDevTools(applyMiddleware(...middleware)));
// const persistor = persistStore(store);

// export { store, persistor }; when there is persistor
export { store};

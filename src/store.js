import {createStore,combineReducers,applyMiddleware} from "redux";
import {thunk} from "redux-thunk";
import {composeWithDevTools} from "@redux-devtools/extension";
import {productsReducer,productDetailsReducer} from "./reducers/productReducer";
import { userReducer } from "./reducers/userReducer";
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web


const reducer = combineReducers({
    productList:productsReducer,
    productDetails:productDetailsReducer,
    user:userReducer
})

const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, reducer);


// you can set intial state og cart here like
// let initialState = {
//     cart: {
//       cartItems: localStorage.getItem("cartItems")
//         ? JSON.parse(localStorage.getItem("cartItems"))
//         : [],
//       shippingInfo: localStorage.getItem("shippingInfo")
//         ? JSON.parse(localStorage.getItem("shippingInfo"))
//         : {},
//     },
//   };

const middleware = [thunk];
// const store = createStore(reducer,composeWithDevTools(applyMiddleware(...middleware)));
const store = createStore(persistedReducer,composeWithDevTools(applyMiddleware(...middleware)));
const persistor = persistStore(store);

export { store, persistor };

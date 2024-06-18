import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import ProductDetail from './components/Product/ProductDetail';
import Register from './components/user/Register';
import Login from './components/user/Login';
import ForgetPassword from './components/user/ForgetPassword';
import UpdatePassword from './components/user/UpdatePassword';
import Profile from './components/user/Profile';
import { Toaster } from 'react-hot-toast';
import {useSelector } from 'react-redux';
import {store} from "./store";
import ProtectedRoute from './components/Route/ProtectedRoute';
import { loadUser } from './actions/userAction';
import ResetPassword from './components/user/ResetPassword';
import Cart from './components/cart/Cart';
import Shipping from './components/cart/Shipping';
import ConfirmOrder from './components/cart/ConfirmOrder';
import axios from "axios";
import {server} from "./index";
import Payment from './components/cart/Payment';
import Product from './components/Product/Product';

export default function App() {
  const {isAuthenticated} = useSelector(state=>state.user);
  const [stripeApiKey,setStripeApikey]= useState("");

  const getStripeApiKey = async()=>{
    const {data} = await axios.get(`${server}/stripeApiKey`, {withCredentials: true});
    setStripeApikey(data.stripeApiKey);
  }

  useEffect(()=>{
    store.dispatch(loadUser());
    console.log('isAuthenticated:',isAuthenticated); //removable
    getStripeApiKey(); 
    console.log('stripeApiKey:', stripeApiKey);
  },[])

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/products" element={<Product/>} /> */}
        <Route path="/productDetail/:id" element={<ProductDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgotpassword" element={<ForgetPassword />} />
        <Route path="/password/reset/:token" element={<ResetPassword />} />
        <Route path="/user/updatePassword" element={<ProtectedRoute Component={UpdatePassword} />} />
        <Route path="/user/me" element={<ProtectedRoute Component={Profile} />} />
        <Route path="/cart" element={<Cart/>} />
        <Route path="/checkout" element={<Shipping/>}/>
        <Route path="/order/confirm" element={<ConfirmOrder/>}/>
        {/* In development */}
        <Route path="/process/payment" element={<Payment/>}/> 
      </Routes>
      <Footer />
      <Toaster />
    </Router>
  );
}

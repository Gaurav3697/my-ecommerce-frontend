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
import {useDispatch, useSelector } from 'react-redux';
import ProtectedRoute from './components/Route/ProtectedRoute';
import {loadUser } from './actions/userAction';
import ResetPassword from './components/user/ResetPassword';
import Cart from './components/cart/Cart';
import Shipping from './components/cart/Shipping';
import ConfirmOrder from './components/cart/ConfirmOrder';
import axios from "axios";
import {server} from "./index";
import Payment from './components/cart/Payment';
import Product from './components/Product/Product';
import TestComponents from './components/TestComponents';

export default function App() {
  const dispatch = useDispatch();
  const {isAuthenticated} = useSelector(state=>state.user);
  const [setStripeApikey]= useState("");

  const getStripeApiKey = async()=>{
    const {data} = await axios.get(`${server}/stripeApiKey`, {withCredentials: true});
    setStripeApikey(data.stripeApiKey);
  }

  useEffect(()=>{
    if(isAuthenticated){
      dispatch(loadUser());
    // console.log('isAuthenticated:',isAuthenticated); //removable
    getStripeApiKey(); 
    // console.log('stripeApiKey:', stripeApiKey);
    }
  },[dispatch,isAuthenticated])

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/test" element={<TestComponents />} />
        <Route path="/product" element={<Product/>} />
        <Route path="/product/:keyword" element={<Product/>} />
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

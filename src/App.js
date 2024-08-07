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
import { useDispatch, useSelector } from 'react-redux';
import ProtectedRoute from './components/Route/ProtectedRoute';
import { loadUser } from './actions/userAction';
import ResetPassword from './components/user/ResetPassword';
import Cart from './components/cart/Cart';
import Shipping from './components/cart/Shipping';
import ConfirmOrder from './components/cart/ConfirmOrder';
import Product from './components/Product/Product';
import TestComponents from './components/TestComponents';
import AdminProduct from './components/Admin/AdminProduct';
import AdminUser from './components/Admin/AdminUser';
import AdminOrder from './components/Admin/AdminOrder';
import Success from './components/cart/Success';
import Failure from './components/cart/Failure';
import ProcessOrder from './components/Admin/ProcessOrder';

export default function App() {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector(state => state.user);

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch])

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/test" element={<TestComponents />} />
        <Route path="/product" element={<Product />} />
        <Route path="/product/:keyword" element={<Product />} />
        <Route path="/productDetail/:id" element={<ProductDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgotpassword" element={<ForgetPassword />} />
        <Route path="/password/reset/:token" element={<ResetPassword />} />
        <Route path="/user/updatePassword" element={<ProtectedRoute Component={UpdatePassword} />} />
        <Route path="/user/me" element={<ProtectedRoute Component={Profile} />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Shipping />} />
        <Route path="/order/confirm" element={<ConfirmOrder />} />
        {/* In development */}
        {/* <Route path="/process/payment" element={<Payment/>}/>  */}
        <Route path="/process/payment/success" element={<Success />} />
        <Route path="/process/payment/failure" element={<Failure />} />


        {/* Admin routes */}
        <Route path="/admin/Products" element={<AdminProduct />} />
        <Route path="/admin/Customers" element={<AdminUser />} />
        <Route path="/admin/Orders" element={<AdminOrder />} />
        <Route path="/admin/Order/:id" element={<ProcessOrder />} />


      </Routes>
      <Footer />
      <Toaster />
    </Router>
  );
}

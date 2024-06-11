import React, { Component } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
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
import { useSelector } from 'react-redux';
import ProtectedRoute from './components/Route/ProtectedRoute';

export default function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/productDetail/:id" element={<ProductDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgotpassword" element={<ForgetPassword />} />
        {/* <Route element={<ProtectedRoute/>}> */}
        <Route path="/user/updatePassword" element={<ProtectedRoute Component={UpdatePassword} />} />
        <Route path="/user/me" element={<ProtectedRoute Component={Profile} />} />
        {/* </Route> */}
      </Routes>
      <Footer />
      <Toaster />
    </Router>
  );
}

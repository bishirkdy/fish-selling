import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import Home from "../pages/Home";
import App from "../App";
import Login from "../components/auth/Login";
import Register from "../components/auth/Register";
import Shop from "../pages/Shop";
import ProtectedRoute from "../components/ProtectedRoute";
import OneProduct from "../components/product/OneProduct";
import Payment from "../pages/Payment";
import Orders from "../pages/Orders";
import Favorite from "../pages/Favorite";
import Profile from "../components/Profile";
import Success from "../components/Success";
import AdminProtectedRoute from "../components/AdminProtectedRoute";
import AdminDashboard from "../pages/admin/AdminDashboard";
import OrdersList from "../pages/admin/OrdersList";
import AddFish from "../pages/admin/productHandling/AddFish";
import ViewFish from "../pages/admin/productHandling/ViewFish";
import ViewCustomer from "../pages/admin/customerHandling/ViewCustomer";
import AdminAnalysis from "../pages/admin/AdminAnalysis";
import EditFish from "../pages/admin/productHandling/EditFish";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<App />}>
        <Route index element={<Home />} />
        <Route path="shop" element={<Shop />} />
        <Route element={<ProtectedRoute />}>
          <Route path="fish/:id" element={<OneProduct />} />
          <Route path="payment/:id" element={<Payment />} />
          <Route path="/payment/cart" element={<Payment />} />
          <Route path="/orders/:id" element={<Orders />} />
          <Route path="/favorite/:id" element={<Favorite />} />
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="/success" element={<Success />} />
        </Route>

        <Route path="admin" element={<AdminProtectedRoute />}>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="orders" element={<OrdersList />} />
          <Route path="addfish" element={<AddFish />} />
          <Route path="viewfish" element={<ViewFish />} />
          <Route path="customers" element={<ViewCustomer />} />
          <Route path="analytics" element={<AdminAnalysis />} />
          <Route path="editfish/:id" element={<EditFish />} />
        </Route>
      </Route>
    </>,
  ),
);

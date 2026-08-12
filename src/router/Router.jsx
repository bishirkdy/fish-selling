import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import Home from "../pages/user/home/Home";
import App from "../App";
import Login from "../components/auth/Login";
import Register from "../components/auth/Register";
import Shop from "../pages/user/explore/Shop";
import ProtectedRoute from "../components/protectedRoutes/ProtectedRoute";
import OneProduct from "../components/product/OneProduct";
import Payment from "../pages/user/payment/Payment";
import Orders from "../pages/user/order/Orders";
import Favorite from "../pages/user/favorite/Favorite";
import Profile from "../components/profile/Profile";
import Success from "../components/common/Success";
import AdminProtectedRoute from "../components/protectedRoutes/AdminProtectedRoute";
import AddFish from "../pages/admin/productHandling/AddFish";
import ViewFish from "../pages/admin/productHandling/ViewFish";
import ViewCustomer from "../pages/admin/customerHandling/ViewCustomer";
import EditFish from "../pages/admin/productHandling/EditFish";
import ForgotPassword  from "../components/auth/ForgotPassword";
import ResetPassword from "../components/auth/ResetPassword";
import CategoryManagement from "../pages/admin/categoryHandling/CategoryManagement";
import OrdersList from "../pages/admin/orderHandling/OrdersList";
import AdminDashboard from "../pages/admin/dashboardHandling/AdminDashboard";
import AdminAnalysis from "../pages/admin/analysisHandling/AdminAnalysis";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/forgot-password" element={<ForgotPassword/>}/>
      <Route path="/reset-password" element={<ResetPassword/>}/>
      <Route path="/" element={<App />}>
        <Route index element={<Home />} />
        <Route path="shop" element={<Shop />} />
        <Route path="fish/:id" element={<OneProduct />} />
        
        <Route element={<ProtectedRoute />}>
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
          <Route path="categories" element={<CategoryManagement/>}/>
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

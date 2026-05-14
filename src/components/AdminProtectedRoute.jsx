import React from "react";
import { useAuth } from "../context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";
import AdminSidebar from "./admin/AdminSidebar";

const AdminProtectedRoute = () => {
  const { user } = useAuth();

  return user && user?.role === "admin" ? (
    <div className="flex flex-row">
      <AdminSidebar />
      <Outlet />
    </div>
  ) : (
    <Navigate to="/login" />
  );
};

export default AdminProtectedRoute;

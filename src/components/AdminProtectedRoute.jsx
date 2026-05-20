import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import AdminSidebar from "./admin/AdminSidebar";
import { useSelector } from "react-redux";

const AdminProtectedRoute = () => {
  const {user} = useSelector(s => s.auth)
  return user && user?.role === "admin" ? (
    <div className="flex">
      <AdminSidebar />
      <main className="flex-1 p-4 lg:p-6 no-scrollbar overflow-hidden">
        <Outlet />
      </main>
    </div>
  ) : (
    <Navigate to="/login" />
  );
};

export default AdminProtectedRoute;

import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import AdminSidebar from "./admin/AdminSidebar";
import { useSelector } from "react-redux";

const AdminProtectedRoute = () => {
  const {user , loading} = useSelector(s => s.auth)
    if (loading) {
    return <h1>Loading...</h1>;
  }
  return user && user?.role === "Admin" ? (
    <div className="flex">
      <AdminSidebar />
      <main className="flex-1 no-scrollbar overflow-y-auto">
        <Outlet />
      </main>
    </div>
  ) : (
    <Navigate to="/" replace />
  );
};

export default AdminProtectedRoute;

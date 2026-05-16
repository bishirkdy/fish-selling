import React from "react";
import { useAuth } from "../context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";
import AdminSidebar from "./admin/AdminSidebar";

const AdminProtectedRoute = () => {
  const { user } = useAuth();

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

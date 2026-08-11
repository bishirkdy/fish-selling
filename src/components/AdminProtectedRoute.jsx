import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import AdminSidebar from "./admin/AdminSidebar";
import { useSelector } from "react-redux";
import { useGetCurrentUser } from "../tanstack/hooks/queries/auth/authQueries";

const AdminProtectedRoute = () => {
  const {data : user , isLoading} = useGetCurrentUser();
    if (isLoading) {
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

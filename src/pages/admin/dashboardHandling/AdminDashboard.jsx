import React from "react";
import TopDashboard from "../../../components/admin/adminDashboard/TopDashboard";
import RatingChart from "../../../components/admin/adminDashboard/RatingGraph";
import SalesChart from "../../../components/admin/adminDashboard/SalesProgress";

const AdminDashboard = () => {
  return (
    <div className="min-h-screen no-scrollbar w-full p-6">
      <TopDashboard />
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mt-6"> 
        <div className="xl:col-span-2">
          <SalesChart />
        </div>
        <div>
          <RatingChart />
        </div>

      </div>
    </div>
  );
};

export default AdminDashboard;
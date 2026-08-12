import React from "react";
import {
  DollarSign,
  ShoppingCart,
  Users,
  Package,
  TrendingUp,
  Boxes,
  HandCoins,
} from "lucide-react";
import Loader from "../../common/Loader";
import { useDashboardTopData } from "../../../tanstack/hooks/queries/analysis/adminAnalysisQueries";

const TopDashboard = () => {
  const { data: analysisData, isLoading, isError } = useDashboardTopData();

  if (isLoading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  const dashboardData = [
    {
      title: "Total Revenue",
      value: Math.floor(analysisData?.totalRevenue),
      icon: HandCoins,
    },
    {
      title: "Total Orders",
      value: analysisData?.totalOrders,
      icon: ShoppingCart,
    },
    {
      title: "Customers",
      value: analysisData?.totalCustomers,
      icon: Users,
    },
    {
      title: "Products",
      value: analysisData?.totalProducts,
      icon: Boxes,
    },
  ];
  return (
    <div className="grid grid-cols-1 h-fit md:grid-cols-2 xl:grid-cols-4 gap-6">
      {dashboardData.map((item, index) => (
        <div
          key={index}
          className="bg-white rounded-3xl  gap-4 p-6 border border-zinc-200 shadow-sm hover:shadow-md transition-all duration-300"
        >
          <div className="flex items-center justify-between">
            <div
              className="
                w-14    
                h-14
                rounded-2xl
                bg-black
                text-white
                flex
                items-center
                justify-center
              "
            >
              <item.icon size={26} />
            </div>
          </div>

          <div className="mt-6">
            <h3 className="text-zinc-500 text-sm font-medium">{item.title}</h3>
            <h1 className="text-3xl font-bold text-zinc-900 mt-2">
              {item.value}
            </h1>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TopDashboard;

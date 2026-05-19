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
import { useGetAllCartDataOfUser } from "../../../tanstack/hooks/queries/analysisQueries";

const dashboardData = [
  {
    title: "Total Revenue",
    value: "24,780",
    growth: "+12.5%",
    icon: DollarSign,
  },
  {
    title: "Total Orders",
    value: "1,248",
    growth: "+8.2%",
    icon: ShoppingCart,
  },
  {
    title: "Customers",
    value: "842",
    growth: "+5.4%",
    icon: Users,
  },
  {
    title: "Products",
    value: "126",
    growth: "+2.1%",
    icon: Package,
  },
];

const TopDashboard = () => {
  const {data : analysisData , isLoading , isError} = useGetAllCartDataOfUser();
  
  const dashboardData = [
  {
    title: "Total Revenue",
    value: analysisData?.profit,
    icon: HandCoins,
  },
  {
    title: "Total Orders",
    value: analysisData?.orderCount,
    icon: ShoppingCart,
  },
  {
    title: "Customers",
    value: analysisData?.userCount,
    icon: Users,
  },
  {
    title: "Products",
    value: analysisData?.productCount,
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
{/* 
            <div
              className="
                flex
                items-center
                gap-1
                text-green-600
                text-sm
                font-semibold
              "
            >
              <TrendingUp size={16} />

              {item.growth}
            </div> */}
          </div>

          <div className="mt-6">
            <h3 className="text-zinc-500 text-sm font-medium">
              {item.title}
            </h3>
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
import React, { useState } from 'react'
import SameDataComposedChart from '../../components/admin/adminAnalysis/ProductChart'
import { SalesChart } from '../../components/admin/adminAnalysis/SalesCharts'
import { ProfitChart } from '../../components/admin/adminAnalysis/ProfitChart'
import { CategoryChart } from '../../components/admin/adminAnalysis/CategoryProductsAnalisys'
import { useGetAllCartDataOfUser } from '../../tanstack/hooks/queries/analysisQueries'
import Loader from '../../components/Loader'

const AdminAnalysis = () => {
  const {data : topData , isLoading : topLoading , isError : topError} = useGetAllCartDataOfUser()  
     if (topLoading ) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <Loader />
      </div>
    );
  }
  return (
    <div className="w-full min-h-screen bg-gray-100 p-6"> 
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-800">
          Analytics Dashboard
        </h1>
        <p className="text-gray-500 mt-2">
          Monitor sales, profit, category performance and traffic
        </p>
      </div>   
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">
        <div className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100">
          <p className="text-gray-500 text-sm">Total Sales</p>
          <h2 className="text-3xl font-bold mt-2">₹ {topData?.total}</h2>
        </div>
        <div className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100">
          <p className="text-gray-500 text-sm">Total Orders</p>
          <h2 className="text-3xl font-bold mt-2">{topData?.orderCount}</h2>
        </div>
        <div className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100">
          <p className="text-gray-500 text-sm">Profit</p>
          <h2 className="text-3xl font-bold mt-2">₹ {Math.round(topData?.profit)}</h2>
        </div>
        <div className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100">
          <p className="text-gray-500 text-sm">Customers</p>
          <h2 className="text-3xl font-bold mt-2">{topData?.userCount}</h2>
        </div>
      </div>

      
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <div className="bg-white rounded-[30px] shadow-sm p-6 border border-gray-100">
          <div className="mb-5">
            <h2 className="text-2xl font-bold text-gray-800">
              Sales Overview
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Monthly sales performance
            </p>
          </div>
          <SalesChart />
        </div>      
        <div className="bg-white rounded-[30px] shadow-sm p-6 border border-gray-100">
          <div className="mb-5">
            <h2 className="text-2xl font-bold text-gray-800">
              Profit Analytics
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Revenue and profit comparison
            </p>
          </div>

          <ProfitChart />
        </div>

        
        <div className="bg-white rounded-[30px] shadow-sm p-6 border border-gray-100">
          <div className="mb-5">
            <h2 className="text-2xl font-bold text-gray-800">
              Product Analysis
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              User activity and performance
            </p>
          </div>

          <SameDataComposedChart />
        </div>

        
        <div className="bg-white rounded-[30px] shadow-sm p-6 border border-gray-100">
          <div className="mb-5">
            <h2 className="text-2xl font-bold text-gray-800">
              Category Distribution
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Fish category performance
            </p>
          </div>

          <div className="flex items-center justify-center">
            <CategoryChart />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminAnalysis;
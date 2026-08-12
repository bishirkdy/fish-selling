import { useState } from "react";
import { toast } from "react-toastify";

import Loader from "../../components/Loader";

import OrderStats from "../../components/admin/adminOrder/OrderStats";
import OrderFilters from "../../components/admin/adminOrder/OrderFilters";
import OrdersTable from "../../components/admin/adminOrder/OrdersTable";
import OrderPagination from "../../components/admin/adminOrder/OrderPagination";
import OrderProductModal from "../../components/admin/adminOrder/OrderProductModal";
import { useDeleteOrder, useEditOrderStatus } from "../../tanstack/hooks/mutations/order/adminOrderMutations";
import { useGetAllOrders } from "../../tanstack/hooks/queries/order/adminOrderQueries";
import { getTotalOrderStatus } from "../../services/analysis/adminAnalysisService";
const OrdersList = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  const [currentOrder, setCurrentOrder] = useState(null);

  const pageSize = 5;

  const {
    data,
    isLoading,
    isFetching,
    isError,
  } = useGetAllOrders({
    page,
    pageSize,
    search,
    status: filterStatus,
  });

  const {
    data: orderStatus,
    isLoading: statusLoading,
  } = getTotalOrderStatus();

  const {
    mutate: deleteOrder,
  } = useDeleteOrder();

  const {
    mutate: updateOrderStatus,
    isPending,
  } = useEditOrderStatus();

  const orderStatusHandler = (productId, status) => {
    if (!currentOrder) return;

    updateOrderStatus(
      {
        orderId: currentOrder.id,
        productId,
        status,
      },
      {
        onSuccess: () => {
          toast.success("Order status updated");
        },
        onError: (err) => {
          toast.error(err.message || "Failed to update status");
        },
      }
    );
  };

  const deleteOrderHandler = (orderId) => {
    deleteOrder(orderId, {
      onSuccess: () => {
        toast.success("Order deleted successfully");
      },
      onError: (err) => {
        toast.error(err.message || "Failed to delete order");
      },
    });
  };

  if (isLoading || statusLoading) {
    return <Loader />;
  }

  if (isError) {
    return (
      <div className="p-10 text-center text-red-500">
        Failed to load orders.
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-gray-100 p-4 md:p-6">

      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        Orders
      </h1>

      {/* Statistics */}
      <OrderStats data={orderStatus} />

      {/* Search + Filter */}
      <OrderFilters
        search={search}
        setSearch={setSearch}
        filterStatus={filterStatus}
        setFilterStatus={setFilterStatus}
        setPage={setPage}
      />

      {/* Orders */}
      <OrdersTable
        orders={data?.data}
        onView={(order) => setCurrentOrder(order)}
        onDelete={deleteOrderHandler}
      />

      {/* Pagination */}
      <OrderPagination
        page={page}
        setPage={setPage}
        totalPages={data?.totalPages}
        isFetching={isFetching}
      />

      {/* Order Details */}
      {currentOrder && (
        <OrderProductModal
          order={currentOrder}
          onClose={() => setCurrentOrder(null)}
          isPending={isPending}
          orderStatusHandler={orderStatusHandler}
        />
      )}

    </div>
  );
};

export default OrdersList;
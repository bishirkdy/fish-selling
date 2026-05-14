import { api } from "../../config/apiClient";

export const addOrders = async (data) => {
  const res = await api.post("/orders", data);
  return res.data;
};

export const addBulkOrders = async (data) => {
  const res = await api.post("/orders", data);
  return res.data;
};

export const getOrderByUser = async (user) => {
  const res = await api.get(`/orders?user=${user}`);

  const productIds = [];

  res.data.forEach((item) => {
    item.products.forEach((it) => {
      productIds.push(it.productId);
    });
  });
  const uniqueProductIds = [...new Set(productIds)];
  const products = await Promise.all(
    uniqueProductIds.map(async (id) => {
      const res = await api.get(`/products/${id}`);
      return res.data;
    }),
  );
  return {
    orders: res.data.sort((a, b) => b.orderedDate - a.orderedDate),
    products,
  };
};

export const getLatestOrderOfUser = async (id) => {
  const res = await api.get(`/orders/${id}`);
  return res.data;
};

export const removeOrder = async (id) => {
  const res = await api.delete(`/orders/${id}`);
  return res.data;
};

export const getAllOrders = async () => {
  const res = await api.get("/orders");
  const orders = res.data;

  const userIds = [...new Set(orders.map((item) => item.user))];
  const users = await Promise.all(
    userIds.map(async (id) => {
      const res = await api.get(`/users/${id}`);
      return res.data;
    }),
  );

  const productIds = [];
  orders.forEach((item) => {
    item.products.forEach((it) => {
      productIds.push(it.productId);
    });
  });

  const uniqueProductIds = [...new Set(productIds)];
  const products = await Promise.all(
    uniqueProductIds.map(async (id) => {
      const res = await api.get(`/products/${id}`);
      return res.data;
    }),
  );

  const updatedOrders = orders.map((order) => {
    const userData = users.find((user) => user.id === order.user);
    return {
      ...order,
      userData,
    };
  });

  return {
    orders: updatedOrders.sort((a, b) => b.orderedDate - a.orderedDate),
    products,
  };
};

export const statesOfOrders = async () => {
  const res = await api.get("/orders");
  const orders = res.data;
  return {
    orderedCount: orders.length,
    ordered: orders.filter((item) => item.orderStatus === "ORDERED").length,
    cancelled: orders.filter((item) => item.orderStatus === "CANCELLED").length,
    pending: orders.filter((item) => item.orderStatus === "PENDING").length,
  };
};

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
  const orderRes = await api.get(`/orders?user=${user}`);

  const productIds = [];
  orderRes.data.forEach((order) => {
    order.products.forEach((item) => {
      productIds.push(item.productId);
    });
  });
  const uniqueProductIds = [...new Set(productIds)];

  const products = await Promise.all(
    uniqueProductIds.map(async (id) => {
      const res = await api.get(`/products/${id}`);
      return res.data;
    }),
  );

  const updatedOrders = await Promise.all(
    orderRes.data.map(async (order) => {
      const shippingAddressRes = await api.get(
        `/addresses/${order.shippingAddress}`,
      );

      const updatedProducts = order.products.map((item) => {
        const productData = products.find(
          (product) => product.id === item.productId,
        );

        return {
          ...item,
          product: productData,
        };
      });

      return {
        ...order,
        shippingAddress: shippingAddressRes.data,
        products: updatedProducts,
      };
    }),
  );
  return updatedOrders.sort((a, b) => b.orderedDate - a.orderedDate);
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
  const orderRes = await api.get(`/orders`);

  const productIds = [];
  orderRes.data.forEach((order) => {
    order.products.forEach((item) => {
      productIds.push(item.productId);
    });
  });
  const uniqueProductIds = [...new Set(productIds)];

  const products = await Promise.all(
    uniqueProductIds.map(async (id) => {
      const res = await api.get(`/products/${id}`);
      return res.data;
    }),
  );

  const updatedOrders = await Promise.all(
    orderRes.data.map(async (order) => {
      const shippingAddressRes = await api.get(
        `/addresses/${order.shippingAddress}`,
      );
      const user = await api.get(`/users/${order.user}`);
      const updatedProducts = order.products.map((item) => {
        const productData = products.find(
          (product) => product.id === item.productId,
        );
        return {
          ...item,
          product: productData,
        };
      });

      return {
        ...order,
        user_name : user.data.name,
        email : user.data.email,
        shippingAddress: shippingAddressRes.data,
        products: updatedProducts,
      };
    }),
  );
  return updatedOrders.sort((a, b) => b.orderedDate - a.orderedDate);
};

export const statesOfOrders = async () => {
  const res = await api.get("/orders");
  const orders = res.data;

  const allProducts = orders.flatMap((order) => order.products);

  const stats = {
    orderedCount: allProducts.length,
    ordered: 0,
    confirmed: 0,
    packed: 0,
    shipped: 0,
    outOfDelivery: 0,
    delivered: 0,
    cancelled: 0,
  };

  allProducts.forEach((item) => {
    switch (item.orderStatus) {
      case "Order Placed":
        stats.ordered++;
        break;

      case "Confirmed":
        stats.confirmed++;
        break;

      case "Packed":
        stats.packed++;
        break;

      case "Shipping":
        stats.shipped++;
        break;

      case "Out For Delivery":
        stats.outOfDelivery++;
        break;

      case "Delivered":
        stats.delivered++;
        break;

      case "Cancelled":
        stats.cancelled++;
        break;

      default:
        break;
    }
  });

  return stats;
};

export const orderStatusChange = async ({ orderId, productId, final }) => {
  const { data } = await api.get(`/orders/${orderId}`);
  const { status, ...timeFields } = final;

  const updatedProducts = data.products.map((item) =>
    item.productId === productId
      ? { ...item, orderStatus: final.status, ...timeFields }
      : item,
  );

  const res = await api.patch(`/orders/${orderId}`, {
    products: updatedProducts,
  });

  return res.data;
};

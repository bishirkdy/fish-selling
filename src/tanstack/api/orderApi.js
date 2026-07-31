

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

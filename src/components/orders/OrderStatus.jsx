const OrderStatus = ({ status }) => {
  return (
    <div
      className={`flex items-center gap-2 px-4 py-2 rounded-full ${status.bg} ${status.text}`}
    >
      {status.icon}

      <span className="font-medium">
        {status.label}
      </span>
    </div>
  );
};

export default OrderStatus;
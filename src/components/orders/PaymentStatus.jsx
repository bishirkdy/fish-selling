const PaymentStatus = ({ payment }) => {
  return (
    <p className={`font-medium ${payment.color}`}>
      {payment.text}
    </p>
  );
};

export default PaymentStatus;
const DeliveryDetails = ({ formData, handleChange }) => {
  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold text-(--color-surface) mb-6">
        Delivery Details
      </h2>

      <div className="space-y-5">

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full border p-3 rounded-lg outline-none"
        />

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          className="w-full border p-3 rounded-lg outline-none"
        />

        <input
          type="tel"
          maxLength={10}
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          className="w-full border p-3 rounded-lg outline-none"
        />

        <input
          type="text"
          name="street"
          placeholder="Street / Area / Locality"
          value={formData.street}
          onChange={handleChange}
          className="w-full border p-3 rounded-lg outline-none"
        />

        <input
          type="text"
          name="post"
          placeholder="Post Office"
          value={formData.post}
          onChange={handleChange}
          className="w-full border p-3 rounded-lg outline-none"
        />

        <div className="grid grid-cols-2 gap-4">

          <input
            type="text"
            name="district"
            placeholder="District"
            value={formData.district}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg outline-none"
          />

          <input
            type="text"
            name="state"
            placeholder="State"
            value={formData.state}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg outline-none"
          />

        </div>

        <div className="grid grid-cols-2 gap-4">

          <input
            type="text"
            maxLength={6}
            name="pincode"
            placeholder="PIN Code"
            value={formData.pincode}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg outline-none"
          />

          <input
            type="text"
            name="landmark"
            placeholder="Landmark"
            value={formData.landmark}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg outline-none"
          />

        </div>

      </div>
    </div>
  );
};

export default DeliveryDetails;
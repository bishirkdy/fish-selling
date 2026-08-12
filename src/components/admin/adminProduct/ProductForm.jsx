const ProductForm = ({
  formData,
  error,
  category,
  handleChange,
  handleSubmit,
  isPending,
}) => {
  return (
    <div className="xl:col-span-2 bg-white rounded-[30px] shadow-sm p-6">

      <div className="mb-6">
        <h1 className="text-4xl font-bold text-(--color-background)">
          Edit Fish
        </h1>

        <p className="text-gray-500 mt-2">
          Update fish product information
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-7">

        <div className="grid md:grid-cols-2 gap-6 items-start">

          <div className="space-y-5">

            {/* Fish Name */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                Fish Name
              </label>

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter fish name"
                className={`w-full h-14 px-5 rounded-2xl border outline-none transition focus:ring-2 ${
                  error?.name
                    ? "border-red-500 focus:ring-red-300"
                    : "border-gray-300 focus:ring-(--color-surface)"
                }`}
              />

              {error?.name && (
                <p className="text-red-500 text-sm pl-1">
                  {error.name}
                </p>
              )}
            </div>

            {/* Category */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                Category
              </label>

              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className={`w-full h-14 px-5 rounded-2xl border outline-none transition focus:ring-2 ${
                  error?.category
                    ? "border-red-500 focus:ring-red-300"
                    : "border-gray-300 focus:ring-(--color-surface)"
                }`}
              >
                <option value="">
                  Select Category
                </option>

                {category?.map((item) => (
                  <option
                    key={item.id}
                    value={item.id}
                  >
                    {item.name}
                  </option>
                ))}
              </select>

              {error?.category && (
                <p className="text-red-500 text-sm pl-1">
                  {error.category}
                </p>
              )}
            </div>

          </div>


          <div className="space-y-5">

            {/* Price + Cost Price */}
            <div className="grid grid-cols-2 gap-4">

              <div className="space-y-2">
                <label className="block text-sm font-semibold">
                  Selling Price
                </label>

                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  className="w-full h-14 px-5 rounded-2xl border"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold">
                  Cost Price
                </label>

                <input
                  type="number"
                  name="costPrice"
                  value={formData.costPrice}
                  onChange={handleChange}
                  className="w-full h-14 px-5 rounded-2xl border"
                />
              </div>

            </div>


            {/* Discount + Stock */}
            <div className="grid grid-cols-2 gap-4">

              <div className="space-y-2">
                <label className="block text-sm font-semibold">
                  Discount %
                </label>

                <input
                  type="number"
                  name="discountPercentage"
                  value={formData.discountPercentage}
                  onChange={handleChange}
                  className="w-full h-14 px-5 rounded-2xl border"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold">
                  Stock
                </label>

                <input
                  type="number"
                  name="stock"
                  value={formData.stock}
                  onChange={handleChange}
                  className="w-full h-14 px-5 rounded-2xl border"
                />
              </div>

            </div>

          </div>

        </div>


        {/* Description */}
        <div className="space-y-2">

          <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
            Description
          </label>

          <textarea
            rows={5}
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Write fish description..."
            className={`w-full p-5 rounded-3xl border outline-none resize-none transition focus:ring-2 ${
              error?.description
                ? "border-red-500 focus:ring-red-300"
                : "border-gray-300 focus:ring-(--color-surface)"
            }`}
          />

          {error?.description && (
            <p className="text-red-500 text-sm pl-1">
              {error.description}
            </p>
          )}

        </div>


        {/* Submit */}
        <button
          type="submit"
          className="h-14 w-full rounded-2xl bg-(--color-surface) hover:bg-(--color-surface)/90 text-white font-semibold transition flex items-center justify-center gap-3 shadow-lg cursor-pointer"
        >
          {isPending ? "Updating..." : "Save Change"}
        </button>

      </form>

    </div>
  );
};

export default ProductForm;
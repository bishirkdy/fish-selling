import React, { useState } from "react";
import {
  Fish,
  DollarSign,
  Percent,
  Package,
  Image,
  FileText,
  Tag,
} from "lucide-react";

const AddFish = () => {
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    price: "",
    stock: "",
    discountPercentage: "",
    description: "",
    image: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="w-full min-h-screen bg-gray-100 p-6">
      <div
        className="
        max-w-6xl
        mx-auto
        grid
        grid-cols-1
        lg:grid-cols-3
        gap-6
      "
      >
        <div className="lg:col-span-2 bg-white rounded-3xl p-8 shadow-sm">
          <h1 className="text-3xl font-bold text-gray-800 mb-8">
            Add New Fish
          </h1>

          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {/* Fish Name */}
            <div>
              <label className="text-sm text-gray-700 mb-2 block font-medium">
                Fish Name
              </label>

              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter fish name"
                className="
                w-full
                bg-white
                border
                border-gray-300
                rounded-2xl
                p-4
                outline-none
                focus:border-blue-500
                focus:ring-2
                focus:ring-blue-100
              "
              />
            </div>

            {/* Category */}
            <div>
              <label className="text-sm text-gray-700 mb-2 block font-medium">
                Category
              </label>

              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="
                w-full
                bg-white
                border
                border-gray-300
                rounded-2xl
                p-4
                outline-none
                focus:border-blue-500
                focus:ring-2
                focus:ring-blue-100
              "
              >
                <option value="">Select Category</option>
                <option value="Freshwater Fish">Freshwater Fish</option>
                <option value="Saltwater Fish">Saltwater Fish</option>
                <option value="Exotic Fish">Exotic Fish</option>
                <option value="Beginner Friendly">Beginner Friendly</option>
                <option value="Popular Fish">Popular Fish</option>
              </select>
            </div>

            <div>
              <label className="text-sm text-gray-700 mb-2 block font-medium">
                Price
              </label>

              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="Enter price"
                className="
                w-full
                bg-white
                border
                border-gray-300
                rounded-2xl
                p-4
                outline-none
                focus:border-blue-500
                focus:ring-2
                focus:ring-blue-100
              "
              />
            </div>

            <div>
              <label className="text-sm text-gray-700 mb-2 block font-medium">
                Stock Quantity
              </label>

              <input
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                placeholder="Available stock"
                className="
                w-full
                bg-white
                border
                border-gray-300
                rounded-2xl
                p-4
                outline-none
                focus:border-blue-500
                focus:ring-2
                focus:ring-blue-100
              "
              />
            </div>

            {/* Discount */}
            <div>
              <label className="text-sm text-gray-700 mb-2 block font-medium">
                Discount %
              </label>

              <input
                type="number"
                name="discountPercentage"
                value={formData.discountPercentage}
                onChange={handleChange}
                placeholder="Discount percentage"
                className="
                w-full
                bg-white
                border
                border-gray-300
                rounded-2xl
                p-4
                outline-none
                focus:border-blue-500
                focus:ring-2
                focus:ring-blue-100
              "
              />
            </div>

            {/* Image URL */}
            <div>
              <label className="text-sm text-gray-700 mb-2 block font-medium">
                Image URL
              </label>

              <input
                type="text"
                name="image"
                value={formData.image}
                onChange={handleChange}
                placeholder="Paste image url"
                className="
                w-full
                bg-white
                border
                border-gray-300
                rounded-2xl
                p-4
                outline-none
                focus:border-blue-500
                focus:ring-2
                focus:ring-blue-100
              "
              />
            </div>

            {/* Description */}
            <div className="md:col-span-2">
              <label className="text-sm text-gray-700 mb-2 block font-medium">
                Description
              </label>

              <textarea
                rows={6}
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Write fish description..."
                className="
                w-full
                bg-white
                border
                border-gray-300
                rounded-2xl
                p-4
                outline-none
                resize-none
                focus:border-blue-500
                focus:ring-2
                focus:ring-blue-100
              "
              />
            </div>

            {/* Submit */}
            <div className="md:col-span-2 flex justify-end">
              <button
                type="submit"
                className="
                bg-blue-600
                hover:bg-blue-700
                text-white
                px-8
                py-4
                rounded-2xl
                font-semibold
                transition
                cursor-pointer
              "
              >
                Add Fish
              </button>
            </div>
          </form>
        </div>

        {/* RIGHT SIDE */}
        <div
          className="
          bg-white
          rounded-3xl
          p-6
          h-fit
          sticky
          top-6
          shadow-sm
        "
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Upload Images
          </h2>

          {/* Upload Box */}
          <label
            className="
            border-2
            border-dashed
            border-gray-300
            rounded-3xl
            h-72
            flex
            flex-col
            items-center
            justify-center
            cursor-pointer
            hover:border-blue-500
            transition
            bg-gray-50
          "
          >
            <input type="file" className="hidden" />

            <Image size={60} className="text-gray-400" />

            <p className="text-gray-600 mt-4 text-lg font-medium">
              Click to Upload
            </p>

            <span className="text-gray-400 text-sm mt-2">PNG, JPG, WEBP</span>
          </label>

          {/* Preview */}
          <div className="mt-8">
            <h3 className="text-gray-800 font-semibold mb-4">Image Preview</h3>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-100 rounded-2xl overflow-hidden h-32">
                <img
                  src="https://images.unsplash.com/photo-1524704654690-b56c05c78a00"
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="bg-gray-100 rounded-2xl overflow-hidden h-32">
                <img
                  src="https://images.unsplash.com/photo-1544551763-46a013bb70d5"
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddFish;

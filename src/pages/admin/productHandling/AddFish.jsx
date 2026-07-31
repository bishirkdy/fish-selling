import React, { useState } from "react";
import {
  Fish,
  DollarSign,
  Percent,
  Package,
  Image,
  FileText,
  Tag,
  SquareX,
} from "lucide-react";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import { useAddProduct } from "../../../tanstack/hooks/mutations/product/adminProductMutations";
import { useGetCategories } from "../../../tanstack/hooks/queries/category/categoryQueries";
const AddFish = () => {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    stock: "",
    discountPercentage: "",
    description: "",
    costPrice: "",
  });
  const [image, setImage] = useState(null);
  const { mutate, isPending } = useAddProduct();
  const { data: category } = useGetCategories();
  const [error, setError] = useState();
  const client = useQueryClient();
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    setError((prev) => ({
      ...prev,
      [e.target.name]: "",
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = {};
    if (!formData.name) errors.name = "Name is required";
    if (!formData.category) errors.category = "Category is required";
    if (!formData.price) errors.price = "Price is required";
    if (!formData.stock) errors.stock = "Stock is required";
    if (!formData.discountPercentage)
      errors.discountPercentage = "Discount percentage is required";
    if (!formData.description) errors.description = "Description is required";
    if (!image) errors.image = "Image is required";
    if (!formData.costPrice) errors.costPrice = "Cost price is required";
    if (Object.keys(errors).length > 0) {
      setError(errors);
      return;
    }
    try {
      const finalData = new FormData();

      finalData.append("name", formData.name);
      finalData.append("description", formData.description);
      finalData.append("price", Number(formData.price));
      finalData.append("costPrice", Number(formData.costPrice));
      finalData.append("stock", Number(formData.stock));
      finalData.append(
        "discountPercentage",
        Number(formData.discountPercentage),
      );

      finalData.append("isActive", true);
      finalData.append("isPrimary", true);
      finalData.append("categoryId", formData.category);

      if (image) {
        finalData.append("image", image);
      }
      mutate(finalData, {
        onSuccess: () => {
          toast.success("Product added successfully");
          client.invalidateQueries({ queryKey: ["products"] });
        },
        onError: (error) => {
          toast.error(error.message);
        },
        onSettled: () => {
          setFormData({
            name: "",
            category: "",
            price: "",
            stock: "",
            discountPercentage: "",
            description: "",
            costPrice: "",
          });
          setImage(null);
        },
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="w-full min-h-screen bg-gray-200 p-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 xl:grid-cols-3 gap-8">
        <div className="xl:col-span-2 bg-white rounded-[30px] shadow-sm p-6">
          <div className="mb-4">
            <h1 className="text-4xl font-bold text-(--color-background)">
              Add New Fish
            </h1>

            <p className="text-gray-500">
              Fill all product information carefully
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-7">
            <div className="grid md:grid-cols-2 gap-6 items-start">
              <div className="space-y-5">
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
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
                    <p className="text-red-500 text-sm font-medium pl-1">
                      {error.name}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
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
                    <option value="">Select Category</option>

                    {category?.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.name}
                      </option>
                    ))}
                  </select>

                  {error?.category && (
                    <p className="text-red-500 text-sm font-medium pl-1">
                      {error.category}
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-5">
                {/* Price + Cost Price */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">
                      Selling Price
                    </label>

                    <input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleChange}
                      placeholder="₹ Selling Price"
                      className="w-full h-14 px-5 rounded-2xl border border-gray-300"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">
                      Cost Price
                    </label>

                    <input
                      type="number"
                      name="costPrice"
                      value={formData.costPrice}
                      onChange={handleChange}
                      placeholder="₹ Cost Price"
                      className="w-full h-14 px-5 rounded-2xl border border-gray-300"
                    />
                  </div>
                </div>

                {/* Discount + Stock */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">
                      Discount %
                    </label>

                    <input
                      type="number"
                      name="discountPercentage"
                      value={formData.discountPercentage}
                      onChange={handleChange}
                      placeholder="Discount"
                      className="w-full h-14 px-5 rounded-2xl border border-gray-300"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">
                      Stock
                    </label>

                    <input
                      type="number"
                      name="stock"
                      value={formData.stock}
                      onChange={handleChange}
                      placeholder="Stock"
                      className="w-full h-14 px-5 rounded-2xl border border-gray-300"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
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
                <p className="text-red-500 text-sm font-medium pl-1">
                  {error.description}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isPending}
              className="h-14 px-10 w-full rounded-2xl bg-(--color-surface) hover:bg-(--color-surface)/90 text-white font-semibold transition cursor-pointer shadow-lg"
            >
              {isPending ? "Adding..." : "Add Fish"}
            </button>
          </form>
        </div>

        <div className="bg-white rounded-[30px] shadow-sm p-6 h-fit sticky top-6">
          <h2 className="text-2xl font-bold text-gray-800">Upload Images</h2>

          <p className="text-sm text-gray-500 mt-1 mb-6">
            Upload high quality fish images
          </p>

          <label className="h-52 rounded-[28px] border-2 border-dashed border-gray-300 bg-gray-50 flex flex-col items-center justify-center cursor-pointer hover:border-(--color-background) hover:bg-(--color-background)/5 transition">
            <input
              type="file"
              className="hidden"
              onChange={(e) => {
                setImage(e.target.files[0]);
                setError((prev) => ({
                  ...prev,
                  image: "",
                }));
              }}
            />

            <Image size={35} className="text-gray-400" />

            <h3 className="mt-5 text-lg font-semibold text-gray-700">
              Click to Upload
            </h3>

            <p className="text-sm text-gray-400 mt-2">PNG, JPG, WEBP</p>
          </label>

          {error?.image && (
            <p className="text-red-500 text-sm mt-3 font-medium text-center">
              {error.image}
            </p>
          )}

          <div className="mt-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-gray-800">Image Preview</h3>
            </div>

            <div>
              <div className="relative h-52 rounded-3xl overflow-hidden group">
                {image ? (
                  <>
                    <img
                      src={URL.createObjectURL(image)}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                    <button
                      onClick={() => setImage(null)}
                      type="button"
                      className="absolute top-3 right-3 w-8 h-8 rounded-full p-1 cursor-pointer bg-red-500 text-white opacity-0 group-hover:opacity-100 transition"
                    >
                      <SquareX />
                    </button>
                  </>
                ) : (
                  <p className="ml-2">No image to preview</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddFish;

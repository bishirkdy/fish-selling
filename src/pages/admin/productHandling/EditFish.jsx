import React, { useEffect, useState } from "react";
import {
  Image,
  SquareX,
  Save,
  Fish,
  Package,
  Percent,
  DollarSign,
  FileText,
} from "lucide-react";
import { useGetProductById } from "../../../tanstack/hooks/queries/productQueries";
import { useNavigate, useParams } from "react-router-dom";
import { useEditProductById } from "../../../tanstack/hooks/mutations/productMutation";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import Loader from "../../../components/Loader";
const EditFish = () => {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    stock: "",
    discountPercentage: "",
    description: "",
  });
  const { id } = useParams();
  const { data, isLoading, isError } = useGetProductById(id);
  const [image, setImage] = useState("");
  const { mutate, isPending } = useEditProductById();
  const client = useQueryClient();
  const navigate = useNavigate()
  useEffect(() => {
    if (data) {
      setFormData({
        name: data.name || "",
        category: data.category || "",
        price: data.price || "",
        stock: data.stock || "",
        discountPercentage: data.discountPercentage || "",
        description: data.description || "",
      });
      setImage(data.images || "");
    }
  }, [data]);
  const [error, setError] = useState({});

      if (isLoading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <Loader />
      </div>
    );
  }

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

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = {};
    if (!formData.name) errors.name = "Fish name is required";
    if (!formData.category) errors.category = "Category is required";
    if (!formData.price) errors.price = "Price is required";
    if (!formData.stock) errors.stock = "Stock is required";
    if (!formData.discountPercentage)
      errors.discountPercentage = "Discount is required";
    if (!formData.description) errors.description = "Description is required";

    if (Object.keys(errors).length > 0) {
      setError(errors);
      return;
    }
    const final = {
      ...formData,
      images: image,
    };
    mutate(
      { data: final, id },
      {
        onSuccess: () => {
          toast.success("Product edited successfully");
          client.invalidateQueries({ queryKey: ["products"] });
          navigate("/admin/viewfish")
        },
        onError: (err) => {
          toast.error(err.message);
        },
      },
    );
  };

  return (
    <div className="w-full min-h-screen bg-gray-200 p-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 xl:grid-cols-3 gap-8">
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
                    <p className="text-red-500 text-sm pl-1">{error.name}</p>
                  )}
                </div>

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
                    <option value="">Select Category</option>
                    <option value="Freshwater Fish">Freshwater Fish</option>
                    <option value="Saltwater Fish">Saltwater Fish</option>
                    <option value="Exotic Fish">Exotic Fish</option>
                    <option value="Beginner Friendly">Beginner Friendly</option>
                    <option value="Popular Fish">Popular Fish</option>
                  </select>

                  {error?.category && (
                    <p className="text-red-500 text-sm pl-1">
                      {error.category}
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-5">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                    Price
                  </label>

                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    placeholder="₹ Enter price"
                    className={`w-full h-14 px-5 rounded-2xl border outline-none transition focus:ring-2 ${
                      error?.price
                        ? "border-red-500 focus:ring-red-300"
                        : "border-gray-300 focus:ring-(--color-surface)"
                    }`}
                  />

                  {error?.price && (
                    <p className="text-red-500 text-sm pl-1">{error.price}</p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                      Discount %
                    </label>

                    <input
                      type="number"
                      name="discountPercentage"
                      value={formData.discountPercentage}
                      onChange={handleChange}
                      placeholder="Discount"
                      className={`w-full h-14 px-5 rounded-2xl border outline-none transition focus:ring-2 ${
                        error?.discountPercentage
                          ? "border-red-500 focus:ring-red-300"
                          : "border-gray-300 focus:ring-(--color-surface)"
                      }`}
                    />

                    {error?.discountPercentage && (
                      <p className="text-red-500 text-sm pl-1">
                        {error.discountPercentage}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                      Stock
                    </label>

                    <input
                      type="number"
                      name="stock"
                      value={formData.stock}
                      onChange={handleChange}
                      placeholder="Qty"
                      className={`w-full h-14 px-5 rounded-2xl border outline-none transition focus:ring-2 ${
                        error?.stock
                          ? "border-red-500 focus:ring-red-300"
                          : "border-gray-300 focus:ring-(--color-surface)"
                      }`}
                    />

                    {error?.stock && (
                      <p className="text-red-500 text-sm pl-1">{error.stock}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>

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
                <p className="text-red-500 text-sm pl-1">{error.description}</p>
              )}
            </div>

            <button
              type="submit"
              className="h-14 w-full rounded-2xl bg-(--color-surface) hover:bg-(--color-surface)/90 text-white font-semibold transition flex items-center justify-center gap-3 shadow-lg cursor-pointer"
            >
              Save Changes
            </button>
          </form>
        </div>

        <div className="bg-white rounded-[30px] shadow-sm p-6 h-fit sticky top-6">
          <h2 className="text-2xl font-bold text-gray-800">Update Image</h2>

          <p className="text-sm text-gray-500 mt-1 mb-6">
            Upload a new fish image
          </p>

          <label className="h-52 rounded-[28px] border-2 border-dashed border-gray-300 bg-gray-50 flex flex-col items-center justify-center cursor-pointer hover:border-(--color-background) hover:bg-(--color-background)/5 transition">
            <input
              type="file"
              className="hidden"
              onChange={(e) => setImage(URL.createObjectURL(e.target.files[0]))}
            />

            <Image size={35} className="text-gray-400" />

            <h3 className="mt-5 text-lg font-semibold text-gray-700">
              Click to Upload
            </h3>

            <p className="text-sm text-gray-400 mt-2">PNG, JPG, WEBP</p>
          </label>

          <div className="mt-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-gray-800">Image Preview</h3>
            </div>

            <div className="relative h-56 rounded-3xl overflow-hidden group border border-gray-200">
              <img src={image} alt="" className="w-full h-full object-cover" />

              <button
                type="button"
                disabled={isPending}
                onClick={() => setImage(null)}
                className="absolute top-3 right-3 w-9 h-9 rounded-full bg-red-500 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition cursor-pointer"
              >
                <SquareX size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditFish;

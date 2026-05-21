import React, { useState } from "react";
import {
  Search,
  Eye,
  Pencil,
  Trash2,
  Fish,
  Package,
  ShoppingBagIcon,
} from "lucide-react";
import { useGetProducts } from "../../../tanstack/hooks/queries/productQueries";
import { priceDiscounted } from "../../../utils/priceDescounted";
import { useDeleteProduct } from "../../../tanstack/hooks/mutations/productMutation";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import Loader from "../../../components/Loader";

const ViewFish = () => {
  const [search, setSearch] = useState("");
  const { data, isLoading, isError } = useGetProducts();
  const [view, setView] = useState(false);
  const [selectedFish, setSelectedFish] = useState(null);
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("");
  const [stockFilter, setStockFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 8;
  const client = useQueryClient();
  const navigate = useNavigate();
  const { mutate: deleteMutate, isPending } = useDeleteProduct();

  if (isLoading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  const filteredFish = data
    ?.filter((fish) => {
      const matchSearch =
        fish.name.toLowerCase().includes(search.toLowerCase()) ||
        fish.category.toLowerCase().includes(search.toLowerCase());

      const matchCategory = category === "all" || fish.category === category;

      const matchStock =
        stockFilter === ""
          ? true
          : stockFilter === "instock"
            ? fish.stock > 0
            : fish.stock === 0;

      return matchSearch && matchCategory && matchStock;
    })
    ?.sort((a, b) => {
      if (sort === "low-high") {
        return Number(a.price) - Number(b.price);
      }
      if (sort === "high-low") {
        return Number(b.price) - Number(a.price);
      }
      return 0;
    });

  const totalPages = Math.ceil(filteredFish?.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedFish = filteredFish?.slice(startIndex, endIndex);

  function deleteProductHandler(id) {
    deleteMutate(id, {
      onSuccess: () => {
        client.invalidateQueries({ queryKey: ["products"] });
        setView(false);
        setSelectedFish(null);
        toast.success("Item removed successfully");
      },
      onError: () => {
        toast.error("Something went wrong while deleting");
      },
    });
  }

  function viewOneCardFunction(fish) {
    setSelectedFish(fish);
    setView(true);
  }
  return (
    <div className="w-full min-h-screen bg-gray-100 p-6">
      <div className="flex flex-row w-full items-center justify-between">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Fish Products</h1>
          <p className="text-gray-500">Manage all available fish products</p>
        </div>

        <div className="flex flex-wrap gap-4 mb-6">
          <div className="relative">
            <Search
              size={18}
              className="absolute top-1/2 left-4 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              placeholder="Search fish..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full border border-(--color-surface) rounded-2xl pl-11 r-4 py-3 outline-none focus:border-(--color-accent)"
            />
          </div>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border p-3 rounded-xl"
          >
            <option value="all">All Categories</option>
            <option value="Freshwater Fish">Freshwater Fish</option>
            <option value="Saltwater Fish">Saltwater Fish</option>
            <option value="Exotic Fish">Exotic Fish</option>
            <option value="Beginner Friendly">Beginner Friendly</option>
            <option value="Popular Fish">Popular Fish</option>
          </select>

          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="border p-3 rounded-xl"
          >
            <option value="">Sort By</option>
            <option value="low-high">Price Low to High</option>
            <option value="high-low">Price High to Low</option>
          </select>

          <select
            value={stockFilter}
            onChange={(e) => setStockFilter(e.target.value)}
            className="border p-3 rounded-xl"
          >
            <option value="">All Stock</option>
            <option value="instock">In Stock</option>
            <option value="outstock">Out of Stock</option>
          </select>
        </div>
      </div>

      <div
        className="
          grid
          grid-cols-1
          sm:grid-cols-2
          lg:grid-cols-3
          xl:grid-cols-4
          gap-6
        "
      >
        {paginatedFish?.map((fish) => (
          <div
            key={fish.id}
            className="rounded-3xl overflow-hidden bg-white shadow-sm hover:shadow-xl hover:-translate-y-1 transition duration-300 border border-gray-100"
          >
            <div className="relative h-56 overflow-hidden">
              <img
                src={fish.images}
                alt={fish.name}
                className="w-full h-full object-cover hover:scale-105 transition duration-300"
              />
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold text-(--color-accent) shadow-sm border border-white/50">
                {fish.category}
              </div>
            </div>

            <div className="p-5">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-xl font-bold text-gray-800">
                    {fish.name}
                  </h2>
                  <p className="text-sm pt-1">
                    Stock :{" "}
                    {fish.stock === 0 ? (
                      <span className="line-through text-red-500">
                        Out of Stock
                      </span>
                    ) : (
                      fish.stock
                    )}
                  </p>
                </div>

                <div className="flex flex-col items-end gap-2">
                  <p className="bg-green-50 text-black-500 text-sm font-medium px-4 py-2 rounded-xl  border border-green-200">
                    ₹{priceDiscounted(fish.price, fish.discountPercentage)}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => viewOneCardFunction(fish)}
                  className="flex-1 cursor-pointer flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 py-2.5 rounded-xl text-sm font-medium transition"
                >
                  <Eye size={16} />
                  View
                </button>

                <button
                  onClick={() => navigate(`/admin/editfish/${fish.id}`)}
                  className="flex-1 flex cursor-pointer items-center justify-center gap-2 bg-blue-100 hover:bg-blue-200 text-blue-600 py-2.5 rounded-xl text-sm font-medium transition"
                >
                  <Pencil size={16} /> Edit
                </button>

                <button
                  onClick={() => deleteProductHandler(fish.id)}
                  className="w-11 h-11 flex cursor-pointer items-center justify-center bg-red-100 hover:bg-red-200 text-red-600 rounded-xl transition"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {paginatedFish.length > 0 && (
        <div className="flex items-center justify-center gap-3 mt-10">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}
            className="px-4 py-2 bg-gray-200 rounded-xl disabled:opacity-50"
          >
            Prev
          </button>

          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index + 1)}
              className={`w-10 h-10 rounded-xl ${
                currentPage === index + 1
                  ? "bg-black text-white"
                  : "bg-gray-200"
              }`}
            >
              {index + 1}
            </button>
          ))}

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((prev) => prev + 1)}
            className="px-4 py-2 bg-gray-200 rounded-xl disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}

      {paginatedFish?.length === 0 && (
        <div className="rounded-3xl p-12 mt-8 flex flex-col items-center justify-center text-center">
          <Fish size={60} className="text-gray-300 mb-4" />
          <h2 className="text-2xl font-bold text-gray-700">No Fish Found</h2>
          <p className="text-gray-500 mt-2">
            Try searching with another keyword
          </p>
        </div>
      )}
      {view && selectedFish && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-6">
          <div className="bg-white w-full max-w-5xl rounded-3xl relative grid grid-cols-1 lg:grid-cols-2 shadow-2xl">
            <button
              onClick={() => setView(false)}
              className="absolute top-5 right-5 bg-gray-100 hover:bg-gray-200 w-10 h-10 rounded-full flex items-center justify-center text-xl font-bold z-10 cursor-pointer"
            >
              ×
            </button>
            <div className="bg-gray-100 p-8 flex items-center justify-center">
              <img
                src={selectedFish?.images}
                alt={selectedFish?.name}
                className="w-full h-125 object-cover rounded-3xl"
              />
            </div>
            <div className="p-10 flex flex-col justify-between">
              <div>
                <span className="bg-blue-100 text-(--color-surface) px-4 py-2 rounded-full text-sm font-medium">
                  {selectedFish?.category}
                </span>

                <h1 className="text-4xl font-bold text-gray-800 mt-5">
                  {selectedFish?.name}
                </h1>

                <p className="text-green-600 font-medium mt-3">
                  In Stock : {selectedFish?.stock}
                </p>

                <div className="flex items-center gap-4 mt-6">
                  <p className="text-gray-400 line-through text-md">
                    ₹{selectedFish?.price}
                  </p>

                  <p className="text-xl font-bold text-black">
                    ₹
                    {priceDiscounted(
                      selectedFish?.price,
                      selectedFish?.discountPercentage,
                    )}
                  </p>

                  <span className="bg-green-100 text-black px-3 py-1 rounded-xl text-sm font-semibold">
                    {selectedFish?.discountPercentage}% OFF
                  </span>
                </div>

                <div className="mt-8">
                  <h3 className="text-xl font-bold text-gray-800">
                    Description
                  </h3>

                  <p className="text-gray-600 leading-8">
                    {selectedFish?.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewFish;

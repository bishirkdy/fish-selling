import React, { useState } from "react";
import { Search, Eye, Pencil, Trash2, Fish, Package } from "lucide-react";
import { useGetProducts } from "../../../tanstack/hooks/queries/peoductQueries";
import { priceDiscounted } from "../../../utils/priceDescounted";

const ViewFish = () => {
  const [search, setSearch] = useState("");
  const { data, isLoading, isError } = useGetProducts();
  // const data = []
  const filteredFish = data?.filter((fish) =>
    fish.title.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="w-full min-h-screen bg-gray-100 p-6">
      <div className="flex flex-row w-full items-center justify-between">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Fish Products</h1>
          <p className="text-gray-500">Manage all available fish products</p>
        </div>
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
            className="w-full border border-(--color-accent) rounded-2xl pl-11 r-4 py-3 outline-none focus:border-(--color-surface)"
          />
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
        {filteredFish?.map((fish) => (
          <div
            key={fish.id}
            className="
              rounded-3xl
              overflow-hidden
              shadow-sm
              hover:shadow-lg
              transition
            "
          >
            <div className="relative h-56 overflow-hidden">
              <img
                src={fish.images}
                alt={fish.title}
                className="w-full h-full object-cover hover:scale-105 transition duration-300"
              />
              <div
                className="
                  absolute
                  top-4
                  right-4
                  bg-white/90
                  backdrop-blur-md
                  px-3
                  py-1
                  rounded-full
                  text-xs
                  font-semibold
                  text-(--color-accent)
                "
              >
                {fish.category}
              </div>
            </div>

            <div className="p-5">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-xl font-bold text-gray-800">
                    {fish.title}
                  </h2>
                  <p className="text-sm pt-1">Stock : {fish.stock}</p>
                </div>

                <div className="flex flex-col items-end gap-2">
                  {/* <p className="bg-red-50 text-red-500 text-sm line-through px-4 py-2 rounded-xl  border border-red-100">
                    ₹{fish.price}
                  </p> */}
                  <p className="bg-green-50 text-black-500 text-sm font-medium px-4 py-2 rounded-xl  border border-green-200">
                    ₹{priceDiscounted(fish.price, fish.discountPercentage)}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button className="flex-1 cursor-pointer flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 py-2.5 rounded-xl text-sm font-medium transition">
                  <Eye size={16} />
                  View
                </button>

                <button className="flex-1 flex cursor-pointer items-center justify-center gap-2 bg-blue-100 hover:bg-blue-200 text-blue-600 py-2.5 rounded-xl text-sm font-medium transition">
                  <Pencil size={16} /> Edit
                </button>

                <button className="w-11 h-11 flex cursor-pointer items-center justify-center bg-red-100 hover:bg-red-200 text-red-600 rounded-xl transition">
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredFish?.length === 0 && (
        <div
          className="
            bg-white
            rounded-3xl
            p-12
            mt-8
            flex
            flex-col
            items-center
            justify-center
            text-center
          "
        >
          <Fish size={60} className="text-gray-300 mb-4" />

          <h2 className="text-2xl font-bold text-gray-700">No Fish Found</h2>

          <p className="text-gray-500 mt-2">
            Try searching with another keyword
          </p>
        </div>
      )}
    </div>
  );
};

export default ViewFish;

import { useSearchParams } from "react-router-dom";
import ProductCard from "../components/product/ProductCard";
import { useGetProducts } from "../tanstack/hooks/queries/productQueries";
import { buildParam } from "../utils/priceParam";
import Loader from "../components/Loader";
import { FishSymbol } from "lucide-react";

const Shop = () => {
  const [params, setParams] = useSearchParams();

  const query = params.get("q") || "";
  const category = params.get("category") || "";
  const sort = params.get("sort") || "";
  const price = params.get("price") || "";
  const rating = params.get("rating") || "";
  const page = Number(params.get("page")) || 1;

  const { data, isLoading, isError } = useGetProducts(
    buildParam(query, category, price),
  );

  if (isLoading) {
    return (
      <div className="w-screen h-screen bg-(--color-background) flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  let finalData = [...(data || [])];

  if (sort === "price-asc") finalData.sort((a, b) => a.price - b.price);
  if (sort === "price-desc") finalData.sort((a, b) => b.price - a.price);
  if (sort === "rating") finalData.sort((a, b) => b.rating - a.rating);

  const ITEMS_PER_PAGE = 6;
  const startIndex = (page - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedData = finalData.slice(startIndex, endIndex);
  const totalPages = Math.ceil(finalData.length / ITEMS_PER_PAGE);

  const handleCategory = (cat) => {
    setParams((prev) => {
      const p = new URLSearchParams(prev);
      p.set("category", cat);
      p.set("page", 1);
      return p;
    });
  };

  const handlePrice = (val) => {
    setParams((prev) => {
      const p = new URLSearchParams(prev);
      if (!val) {
        p.delete("price");
      } else {
        p.set("price", val);
      }
      p.set("page", 1);
      return p;
    });
  };

  const handleSort = (value) => {
    setParams((prev) => {
      const p = new URLSearchParams(prev);
      p.set("sort", value);
      return p;
    });
  };

  const handleRating = (value) => {
    setParams((prev) => {
      const p = new URLSearchParams(prev);
      p.set("rating", value);
      return p;
    });
  };

  const handlePage = (value) => {
    setParams((prev) => {
      const p = new URLSearchParams(prev);
      p.set("page", value);
      return p;
    });
  };

  return (
    <div className="flex flex-col h-screen overflow-y-auto lg:flex-row gap-6 p-4 pt-22 sm:p-6 lg:p-6 lg:pt-24 lg:px-16 bg-(--color-background) text-white">
      <div className="w-full lg:w-64 bg-(--color-surface) rounded-xl p-5 shadow-md lg:sticky lg:top-12 h-fit">
        <div className="mb-6">
          <h2 className="font-semibold text-lg mb-3">Category</h2>
          <div className="flex flex-wrap lg:flex-col gap-2">
            {["", "Saltwater Fish", "Exotic Fish", "Beginner Friendly"].map(
              (cat) => (
                <button
                  key={cat || "all"}
                  onClick={() => handleCategory(cat)}
                  className={`text-left px-3 py-2 rounded-md transition text-sm sm:text-base ${
                    category === cat
                      ? "bg-(--color-accent) text-black"
                      : "hover:bg-white/10"
                  }`}
                >
                  {cat || "All"}
                </button>
              ),
            )}
          </div>
        </div>
        <div className="mb-2">
          <h2 className="font-semibold text-lg mb-3">Price</h2>
          <div className="flex flex-wrap lg:flex-col gap-2">
            {[
              { label: "Below ₹200", value: "0-200" },
              { label: "₹201 - ₹400", value: "201-400" },
              { label: "₹401 - ₹600", value: "401-600" },
              { label: "₹601 - ₹800", value: "601-800" },
              { label: "₹801 - ₹1000", value: "801-1000" },
              { label: "Above ₹1000", value: "1000+" },
              { label: "Clear", value: "" },
            ].map((p) => (
              <button
                key={p.value}
                onClick={() => handlePrice(p.value)}
                className="text-left px-3 py-2 rounded-md hover:bg-white/10 transition text-sm sm:text-base"
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex-1">
        <div className="flex justify-start sm:justify-end mb-4">
          <select
            value={sort}
            onChange={(e) => handleSort(e.target.value)}
            className="w-full sm:w-auto p-3 border border-white/10 bg-(--color-surface) rounded-lg outline-none"
          >
            <option value="">Default</option>
            <option value="price-asc">Price Low → High</option>
            <option value="price-desc">Price High → Low</option>
            <option value="rating">Top Rated</option>
          </select>
        </div>
        {!paginatedData ||
          (paginatedData.length === 0 && (
            <div className="text-white h-2/3 bg-(--color-background) flex flex-col items-center justify-center">
              <FishSymbol size={60} className="text-green-500 mb-4" />
              <h1 className="text-2xl font-bold">No Fish Available</h1>
              <p className="text-gray-400 mt-2">
                Available fishes display here
              </p>
            </div>
          ))}
        {paginatedData.length > 0 && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
              {paginatedData.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            <div className="w-full flex items-center justify-center gap-4 py-8">
              <button
                onClick={() => handlePage(page - 1)}
                disabled={page === 1}
                className={`
      px-5 py-2 rounded-xl font-medium transition-all duration-200 cursor-pointer
      border border-white/10
      ${
        page === 1
          ? "bg-white/5 text-gray-500 cursor-not-allowed"
          : "bg-(--color-surface) hover:bg-(--color-accent) hover:text-black active:scale-95"
      }
    `}
              >
                Prev
              </button>
              <div className="px-5 py-2 rounded-xl bg-(--color-surface) border border-white/10 min-w-15 text-center">
                <h1 className="text-lg font-semibold">{page}</h1>
              </div>
              <button
                onClick={() => handlePage(page + 1)}
                disabled={page === totalPages}
                className="px-5 py-2 rounded-xl font-medium transition-all duration-200 cursor-pointer bg-(--color-surface) border border-white/10 hover:bg-(--color-accent) hover:text-black active:scale-95"
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
export default Shop;

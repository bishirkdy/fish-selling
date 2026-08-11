import { useSearchParams } from "react-router-dom";
import ProductCard from "../components/product/ProductCard";
import { buildParam } from "../utils/priceParam";
import Loader from "../components/Loader";
import { FishSymbol } from "lucide-react";
import { useEffect, useState } from "react";
import { useGetProducts } from "../tanstack/hooks/queries/product/productQueries";
import { useGetCategories } from "../tanstack/hooks/queries/category/categoryQueries";
import ProductSkeleton from "../components/product/ProductSkeleton";

const Shop = () => {
  const [params, setParams] = useSearchParams();
  const [fetching, setFetching] = useState(false);
  const [page, setPage] = useState(1);
  const [products, setProducts] = useState([]);
  const [hasMore, setHasMore] = useState(true);

  const query = params.get("search") || "";
  const category = params.get("category") || "";
  const sort = params.get("sort") || "";
  const price = params.get("price") || "";

  const { data, isLoading, isError } = useGetProducts(
    buildParam(query, category, price, page, sort),
  );
  const {
    data: categoryData,
    isLoading: categoryLoading,
    isError: categoryIsError,
  } = useGetCategories();

  // Reset when filters change
  useEffect(() => {
    setProducts([]);
    setPage(1);
    setHasMore(true);
  }, [query, category, price, sort]);

  // Add newly fetched products
  useEffect(() => {
    if (!data) return;

    if (data.length < 6) {
      setHasMore(false);
    }

    setProducts((prev) => {
      const ids = new Set(prev.map((item) => item.id));
      const filtered = data.filter((item) => !ids.has(item.id));
      return [...prev, ...filtered];
    });

    setFetching(false);
  }, [data]);

  useEffect(() => {
    const handleScroll = () => {
      const reachedBottom =
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 300;

      if (reachedBottom && !isLoading && !fetching && hasMore) {
        setFetching(true);
        setPage((prev) => prev + 1);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isLoading, fetching, hasMore]);

  if (isError || categoryIsError) {
    return (
      <div className="w-screen h-screen flex items-center justify-center text-white">
        Something went wrong
      </div>
    );
  }

  const handleCategory = (cat) => {
    setParams((prev) => {
      const p = new URLSearchParams(prev);

      if (!cat) {
        p.delete("category");
      } else {
        p.set("category", cat);
      }

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

      return p;
    });
  };

  const handleSort = (value) => {
    setParams((prev) => {
      const p = new URLSearchParams(prev);

      if (!value) {
        p.delete("sort");
      } else {
        p.set("sort", value);
      }

      return p;
    });
  };

  return (
    <div className="flex flex-col min-h-screen lg:flex-row gap-6 p-4 pt-22 sm:p-6 lg:p-6 lg:pt-24 lg:px-16 bg-(--color-background) text-white">
      <div className="w-full lg:w-64 bg-(--color-surface) rounded-xl p-5 shadow-md lg:sticky lg:top-12 h-fit">
        <div className="mb-6">
          <h2 className="font-semibold text-lg mb-3">Category</h2>

          <div className="flex flex-wrap lg:flex-col gap-2">
            <button
              onClick={() => handleCategory("")}
              className={`text-left px-3 py-2 rounded-md transition text-sm sm:text-base ${
                category === ""
                  ? "bg-(--color-accent) text-black"
                  : "hover:bg-white/10"
              }`}
            >
              All
            </button>

            {categoryData?.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleCategory(cat.name)}
                className={`text-left px-3 py-2 rounded-md transition text-sm sm:text-base ${
                  category === cat.name
                    ? "bg-(--color-accent) text-black"
                    : "hover:bg-white/10"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-2">
          <h2 className="font-semibold text-lg mb-3">Price</h2>

          <div className="flex flex-wrap lg:flex-col gap-2">
            {[
              {
                label: "Below ₹200",
                value: "0-200",
              },
              {
                label: "₹201 - ₹400",
                value: "201-400",
              },
              {
                label: "₹401 - ₹600",
                value: "401-600",
              },
              {
                label: "₹601 - ₹800",
                value: "601-800",
              },
              {
                label: "₹801 - ₹1000",
                value: "801-1000",
              },
              {
                label: "Above ₹1000",
                value: "1000+",
              },
              {
                label: "Clear",
                value: "",
              },
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
            {/* <option value="rating">Top Rated</option> */}
          </select>
        </div>

        {isLoading && products.length === 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
            {Array.from({ length: 6 }).map((_, index) => (
              <ProductSkeleton key={index} />
            ))}
          </div>
        )}

        {products.length === 0 && !isLoading && (
          <div className="text-white h-[60vh] flex flex-col items-center justify-center">
            <FishSymbol size={60} className="text-green-500 mb-4" />

            <h1 className="text-2xl font-bold">No Fish Available</h1>

            <p className="text-gray-400 mt-2">Available fishes display here</p>
          </div>
        )}

        {products.length > 0 && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </>
        )}

        {products.length > 0 && fetching && (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 mt-6">
            {Array.from({ length: 3 }).map((_, index) => (
              <ProductSkeleton key={index} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Shop;

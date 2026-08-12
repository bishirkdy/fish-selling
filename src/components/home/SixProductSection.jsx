import ProductCard from "../product/ProductCard";
import Loader from "../common/Loader";
import { useGetSixProduct } from "../../tanstack/hooks/queries/product/productQueries";
import ProductSkeleton from "../product/ProductSkeleton";

const SixProductSection = () => {
  const { data, isLoading, isError } = useGetSixProduct();

  return (
    <div className="bg-(--color-surface) py-16 px-6 md:px-12">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-white">
          Featured Fish
        </h2>
        <p className="text-slate-400 mt-2">
          Handpicked aquatic life for your aquarium
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {isLoading
          ? Array.from({ length: 6 }).map((_, index) => (
              <ProductSkeleton key={index} />
            ))
          : data?.data?.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
      </div>
    </div>
  );
};

export default SixProductSection;

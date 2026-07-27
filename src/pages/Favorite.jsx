import { useSelector } from "react-redux";
import {  Heart } from "lucide-react";
import ProductCard from "../components/product/ProductCard";
import { useNavigate } from "react-router-dom";

const Favorite = () => {
  const favData = useSelector((state) => state.favorite.favorite);
  const navigate = useNavigate()


  if (!favData || favData.length === 0) {
    return (
      <div className="min-h-screen bg-(--color-background) text-white flex flex-col items-center justify-center">
        <Heart size={60} className="text-red-500 mb-4" />

        <h1 className="text-2xl font-bold">No Favorites Yet</h1>

        <p className="text-gray-400 mt-2">
          Your favorite products will appear here.
        </p>
        <button onClick={() => navigate("/") } className="md:hidden px-4 py-2 rounded-lg mt-2 bg-(--color-accent)">Back to Home</button>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-8 bg-(--color-background) text-white px-4 md:px-16 lg:px-24">
      <h1 className="text-3xl font-bold mb-8">
        Favorite Products ({favData.length})
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {favData?.map((product) => (
          <div key={product.id}>
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Favorite;

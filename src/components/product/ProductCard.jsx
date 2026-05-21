import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useAddToCart } from "../../tanstack/hooks/mutations/cartMutation";
import { toast } from "react-toastify";
import { setToCart } from "../../redux/features/cartSlice";
import { useQueryClient } from "@tanstack/react-query";
import { Heart, HeartPlus, ShoppingCart } from "lucide-react";
import {
  useAddToFav,
  useRemoveFromFav,
} from "../../tanstack/hooks/mutations/favMutation";
import {
  setToFavorite,
  removeFromFavorite,
} from "../../redux/features/favoriteSlice";
import React from "react";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const {user} = useSelector(s => s.auth)
  const addToCartMutation = useAddToCart();
  const addToFavMutation = useAddToFav();
  const removeFavMutation = useRemoveFromFav();
  const favProduct = useSelector((s) => s.favorite.favorite);
  const cartProduct = useSelector((s) => s.cart.cart);
  const isFavorite = favProduct.some((item) => item.id === product.id);
  const isCart = cartProduct.some((item) => item.productId === product.id);
  const discountedPrice = Math.round(
    product.price - (product.price * product.discountPercentage) / 100,
  );
  
  function handleClick(id) {
    navigate(`/fish/${id}`);
  }

  function cartHandle(e, product) {
    e.preventDefault();
    e.stopPropagation();

    if (!user) {
      navigate("/login");
      toast.error("Please login");
      return;
    }

    const cart = {
      user: user.id,
      productId: product.id,
      title: product.title,
      price: product.price,
      image: product.images,
      discountPercentage: product.discountPercentage,
      quantity: 1,
    };

    addToCartMutation.mutate(cart, {
      onSuccess: () => {
        toast.success(`${product.title} added to cart`);

        dispatch(setToCart(cart));

        queryClient.invalidateQueries({
          queryKey: ["carts"],
          exact: true,
        });
      },

      onError: (err) => {
        toast.error(err.message || `Failed to add ${product.title} to cart`);
      },
    });
  }

  function handleFav(e, product) {
    e.stopPropagation();

    if (!user) {
      navigate("/login");
      toast.error("Please login");
      return;
    }

    const dataToDB = {
      userId: user?.id,
      productId: product.id,
    };

    const dataToSlice = {
      productId: product.id,
      title: product.title,
      price: product.price,
      image: product.images,
      description: product.description,
      discountPercentage: product.discountPercentage,
    };

    addToFavMutation.mutate(dataToDB, {
      onSuccess: () => {
        dispatch(setToFavorite(dataToSlice));

        queryClient.invalidateQueries({
          queryKey: ["favorites", user?.id],
        });
      },

      onError: (err) => {
        toast.error(err.message || "Error occurred");
      },
    });
  }

  function removeFromFav(e, productId) {
    e.stopPropagation();
    const removableData = {
      userId: user?.id,
      productId,
    };

    removeFavMutation.mutate(removableData, {
      onSuccess: () => {
        dispatch(removeFromFavorite(productId));

        queryClient.invalidateQueries({
          queryKey: ["favorites", user?.id],
        });
      },

      onError: (err) => {
        toast.error(err.message || "Error occurred");
      },
    });
  }

  return (
    <div
      onClick={() => handleClick(product.id)}
      className="bg-(--color-surface) rounded-2xl overflow-hidden border border-white/10 hover:border-(--color-accent) hover:-translate-y-2 transition-transform duration-300 group flex flex-col h-full shadow-lg hover:shadow-amber-500/20 cursor-pointer"
    >
      <div className="relative overflow-hidden">
        <img
          src={product.images}
          alt={product.title}
          className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500"
        />

        {product.discountPercentage > 0 && (
          <div className="absolute left-3 top-3 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg backdrop-blur-sm">
            {product.discountPercentage}% OFF
          </div>
        )}

        <div className="absolute right-3 top-3">
          {user && (
            <button
              onClick={(e) =>
                isFavorite
                  ? removeFromFav(e, product.id)
                  : handleFav(e, product)
              }
              className="bg-white/20 backdrop-blur-md p-2 rounded-full hover:scale-110 transition cursor-pointer"
            >
              {isFavorite ? (
                <Heart className="text-red-500 fill-red-500 w-5 h-5" />
              ) : (
                <HeartPlus className="text-white w-5 h-5" />
              )}
            </button>
          )}
        </div>
      </div>

      <div className="p-4 flex flex-col grow">
        <h3 className="text-(--color-text) text-lg font-semibold">
          {product.title}
        </h3>

        <p className="text-sm text-gray-400 mt-1 line-clamp-2">
          {product.description.slice(0, 40) + " ..."}
        </p>

        <div className="mt-4 flex items-center gap-2 flex-wrap">
          <p className="text-2xl font-bold text-(--color-text)">
            ₹{discountedPrice}
          </p>

          {product.discountPercentage > 0 && (
            <p className="text-sm text-gray-500 line-through">
              ₹{product.price}
            </p>
          )}
        </div>

        <div className="flex items-center gap-1 my-3">
          <span className="text-yellow-400 text-sm">⭐</span>
          <span className="text-sm text-gray-300">{product.rating}</span>
        </div>
        <button
          type="button"
          onClick={(e) => cartHandle(e, product)}
          disabled={addToCartMutation.isPending}
          className="mt-auto w-full flex items-center cursor-pointer justify-center gap-2 bg-(--color-accent) hover:bg-transparent border border-(--color-accent) text-(--color-text) py-3 rounded-xl font-semibold transition-all duration-300"
        >
          <ShoppingCart className={`w-5 h-5`} />
          {isCart ? "Added in cart" : addToCartMutation.isPending ? "Adding..." : "Add to Cart"}
        </button>
      </div>
    </div>
  );
};

export default React.memo(ProductCard);
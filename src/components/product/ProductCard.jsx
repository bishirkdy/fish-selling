import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import { Heart, HeartPlus, ShoppingCart } from "lucide-react";

import React from "react";
import { useAddToCart } from "../../tanstack/hooks/mutations/cart/cartMutations";
import {
  useAddToFav,
  useRemoveFromFav,
} from "../../tanstack/hooks/mutations/favorite/favMutations";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { user } = useSelector((s) => s.auth);
  const addToCartMutation = useAddToCart();
  const addToFavMutation = useAddToFav();
  const removeFavMutation = useRemoveFromFav();
  const favProduct = useSelector((s) => s.favorite.favorite);
  const cartProduct = useSelector((s) => s.cart.cart);
  const isFavorite = favProduct.some((item) => item.id === product.id);

  const isCart = cartProduct.some((item) => item.productId === product.id);

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
    if (isCart) {
      toast.info("Product is already in your cart");
      return;
    }

    const cart = {
      productId: product.id,
      quantity: 1,
    };

    addToCartMutation.mutate(cart, {
      onSuccess: () => {
        toast.success(`${product.name} added to cart`);
        queryClient.invalidateQueries({
          queryKey: ["cart"],
        });
      },

      onError: (err) => {
        toast.error(err.message || `Failed to add ${product.name} to cart`);
      },
    });
  }

  function handleFav(e, productId) {
    e.stopPropagation();

    if (!user) {
      navigate("/login");
      toast.error("Please login");
      return;
    }

    addToFavMutation.mutate(productId, {
      onSuccess: () => {
        toast.success("Added to favorites");
        queryClient.invalidateQueries({
          queryKey: ["favorites"],
        });
      },
      onError: (err) => {
        toast.error(err.message || "Error occurred");
      },
    });
  }
  function removeFromFav(e, productId) {
    e.stopPropagation();

    removeFavMutation.mutate(productId, {
      onSuccess: () => {
        toast.success("Removed from favorites");
        queryClient.invalidateQueries({
          queryKey: ["favorites"],
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
          src={(product?.imageUrls?.[0] || product.imageUrl) ?? null}
          alt={product.name}
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
              disabled={
                addToFavMutation.isPending || removeFavMutation.isPending
              }
              onClick={(e) =>
                isFavorite
                  ? removeFromFav(e, product.id)
                  : handleFav(e, product.id)
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
          {product?.description
            ? product.description.slice(0, 40) + "..."
            : ""}{" "}
        </p>

        <div className="mt-4 flex items-center gap-2 flex-wrap">
          <p className="text-2xl font-bold text-(--color-text)">
            ₹{product.discountedPrice}
          </p>

          {product.discountPercentage > 0 && (
            <p className="text-sm text-gray-500 line-through">
              ₹{product.originalPrice}
            </p>
          )}
        </div>

        <div className="flex items-center justify-between my-3">
          {/* <div className="flex items-center gap-1">
            <span className="text-yellow-400 text-sm">⭐</span>
            <span className="text-sm text-gray-300">{product.rating}</span>
          </div> */}

          <span
            className={`text-xs font-semibold px-3 py-1 rounded-full ${
              product.stock > 0
                ? "bg-green-500/20 text-green-400"
                : "bg-red-500/20 text-red-400"
            }`}
          >
            {product.stock > 0 ? `${product.stock} Left` : "Out of Stock"}
          </span>
        </div>
        <button
          type="button"
          onClick={(e) => cartHandle(e, product)}
          disabled={addToCartMutation.isPending || product.stock <= 0}
          className={`mt-auto w-full flex items-center justify-center gap-2 py-3 rounded-xl font-semibold transition-all duration-300 ${
            product.stock <= 0
              ? "bg-gray-500 cursor-not-allowed text-white"
              : "bg-(--color-accent) hover:bg-transparent border border-(--color-accent) text-(--color-text) cursor-pointer"
          }`}
        >
          <ShoppingCart className="w-5 h-5" />

          {product.stock <= 0
            ? "Out of Stock"
            : isCart
              ? "Added in Cart"
              : addToCartMutation.isPending
                ? "Adding..."
                : "Add to Cart"}
        </button>
      </div>
    </div>
  );
};

export default React.memo(ProductCard);

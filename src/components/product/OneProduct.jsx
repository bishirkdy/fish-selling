import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetProductById } from "../../tanstack/hooks/queries/productQueries";
import { Check, Star, Truck, X } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { useAddToCart } from "../../tanstack/hooks/mutations/cartMutation";
import { toast } from "react-toastify";
import {  useSelector } from "react-redux";
import Loader from "../Loader";
import { priceDiscounted } from "../../utils/priceDescounted";
import { useAddReview } from "../../tanstack/hooks/mutations/reviewMutation";
import { useGetReviewOfProduct } from "../../tanstack/hooks/queries/reviewQueries";

const OneProduct = () => {
  
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useSelector((s) => s.auth);
  const { data, isLoading, isError } = useGetProductById(id);
  const { data: reviews } = useGetReviewOfProduct(data?.id);
  const cartData = useSelector((s) => s.cart.cart);
  const queryClient = useQueryClient();
  const addToCartMutation = useAddToCart();
  const { mutate, isPending } = useAddReview();
  const isCart = cartData.some((d) => d.productId === data?.id);
  
  if (isLoading) {
    return (
      <div className="w-screen h-screen bg-(--color-background) flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  if (isError)
    return <div className="text-red-500 p-30">Error loading product</div>;
  if (!data) return <div className="text-gray-400 p-10">No product found</div>;
console.log(reviews);
  
function cartHandle(product) {
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
      toast.success(`${product.title} added to cart`);
      queryClient.invalidateQueries({
        queryKey: ["cart"],
      });
    },

    onError: (err) => {
      toast.error(err.message || "Failed to add product");
    },
  });
}

  function reviewHandle() {
    if (!user) {
      toast.info("Please login");
      return;
    }
    if (!comment.trim()) {
      return toast.error("Comment required");
    }

    const review = {
      productId: data.id,
      rating,
      comment,
    };

    mutate(review, {
      onSuccess: () => {
        toast.success("Review added");
        setComment("");
        setRating(5);

        queryClient.invalidateQueries({
          queryKey: ["reviews"],
        });
      },
      onError: (err) => {
        toast.error(err.message);
      },
    });
  }

  return (
    <div className="min-h-screen flex flex-col pt-24 items-center bg-(--color-background) text-(--color-text) p-6">
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
        <div className="rounded-xl overflow-hidden">
          <img
            src={data.imageUrls[0]}
            alt={data.title}
            className="w-full h-100 object-cover"
          />
        </div>

        <div className="flex flex-col gap-5">
          <h1 className="text-3xl font-bold leading-snug">{data.title}</h1>

          <p className="text-gray-400 text-sm">⭐ {data.rating} / 5</p>

          <div className="flex items-center gap-3">
            <span className="text-2xl font-bold text-(--color-accent)">
              ₹{priceDiscounted(data.price, data.discountPercentage)}
            </span>

            <span className="text-gray-500 line-through">₹{data.price}</span>

            <span className="text-green-500 text-sm font-semibold">
              {data.discountPercentage}% OFF
            </span>
          </div>

          <p className="text-gray-300 leading-relaxed text-sm">
            {data.description}
          </p>

          <div className="text-sm flex flex-col gap-2 text-gray-400">
            <p className="flex items-center gap-2">
              {data.stock > 0 ? (
                <>
                  <Check size={16} className="text-green-500" />
                  <span>In Stock</span>
                </>
              ) : (
                <>
                  <X size={16} className="text-red-500" />
                  <span className="line-through text-red-500">
                    Out of Stock
                  </span>
                </>
              )}
            </p>

            <p className="flex items-center gap-2">
              <Truck size={16} className="text-blue-400" />
              <span>Free Delivery</span>
            </p>
          </div>

          <div className="flex gap-4 mt-4">
            <button
              onClick={() => {
                if (data.stock > 0) {
                  navigate("/payment/cart", {
                    state: {
                      items: [
                        {
                          productId: data.id,
                          quantity: 1,
                        },
                      ],
                      total: priceDiscounted(
                        data.price,
                        data.discountPercentage,
                      ),
                    },
                  });
                } else {
                  toast.info("Out of Stock");
                }
              }}
              className="flex-1 bg-(--color-accent) text-(--color-text) py-3 rounded-lg font-semibold hover:opacity-90 cursor-pointer transition"
            >
              {data.stock > 0 ? "Buy Now" : "Out of Stock"}
            </button>

            <button
              onClick={() => cartHandle(data)}
              className={`flex-1 py-3 rounded-lg font-semibold transition ${
                isCart
                  ? "bg-gray-500 cursor-not-allowed"
                  : "border border-(--color-accent) hover:bg-(--color-accent) cursor-pointer"
              }`}
            >
              {!isCart ? "Add to cart" : " Added to cart"}
            </button>
          </div>
        </div>
      </div>
      <div className="w-[90vw] mx-auto mt-14 border-t border-white/10 pt-10">
        <h2 className="text-2xl font-bold mb-6">Customer Reviews</h2>

        <div className="bg-white/5 rounded-2xl p-5 mb-10">
          <h3 className="text-lg font-semibold mb-4">Write a Review</h3>

          <div className="flex items-center gap-2 mb-4">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => setRating(star)}
                className={`text-2xl transition ${
                  star <= rating ? "text-yellow-400" : "text-gray-500"
                }`}
              >
                <Star fill={star <= rating ? "currentColor" : "none"} />
              </button>
            ))}
          </div>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Write your comment..."
            className="w-full h-32 bg-black/20 border border-white/10 rounded-xl p-4 outline-none resize-none"
          />

          <button
            disabled={isPending}
            onClick={reviewHandle}
            className="mt-4 bg-(--color-accent) px-6 py-3 rounded-xl font-semibold hover:opacity-90 transition"
          >
            {isPending ? "Submitting..." : "Submit Review"}
          </button>
        </div>

        <div className="flex flex-col gap-5">
          {reviews?.length > 0 ? (
            reviews.map((review) => (
              <div
                key={review.id}
                className="bg-white/5 border border-white/10 rounded-2xl p-5"
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold">
                    {review.userName || "Unknown User"}
                  </h4>

                  <div className="flex text-yellow-400">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} size={18} fill="currentColor" />
                    ))}
                  </div>
                </div>

                <p className="text-gray-400 text-sm leading-relaxed">
                  {review.comment}
                </p>

                <p className="text-xs text-gray-500 mt-3">
                  {new Date(review.createdAt).toLocaleDateString()}
                </p>
              </div>
            ))
          ) : (
            <div className="text-center text-gray-500 py-10">
              No reviews yet
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OneProduct;

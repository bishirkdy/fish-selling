import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetProductById } from "../../tanstack/hooks/queries/productQueries";
import { Check, Truck } from "lucide-react";
import { setToCart } from "../../redux/features/cartSlice";
import { useQueryClient } from "@tanstack/react-query";
import { useAddToCart } from "../../tanstack/hooks/mutations/cartMutation";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Loader";
import { priceDiscounted } from "../../utils/priceDescounted";

const OneProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const {user} = useSelector(s => s.auth)
  const dispatch = useDispatch();
  const { data, isLoading, isError } = useGetProductById(id);
  const cartData = useSelector((s) => s.cart.cart);
  const queryClient = useQueryClient();
  const addToCartMutation = useAddToCart();
  const isCart = cartData.some((d) => d.productId === data?.id);
  if (isLoading) {
    return (
      <div className="w-screen h-screen bg-(--color-background) flex items-center justify-center">
        <Loader />
      </div>
    );
  }
  if (isError)
    return <div className="text-red-500 p-10">Error loading product</div>;
  if (!data) return <div className="text-gray-400 p-10">No product found</div>;

  function cartHandle(product) {
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
        queryClient.invalidateQueries({ queryKey: ["carts"], exact: true });
      },
      onError: (err) => {
        toast.error(
          `${err.message || `Failed to add ${product.title} to cart`}`,
        );
      },
    });
  }


  return (
    <div className="min-h-screen flex items-center bg-(--color-background) text-(--color-text) p-6">
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
        <div className="rounded-xl overflow-hidden">
          <img
            src={data.images}
            alt={data.title}
            className="w-full h-100 object-cover"
          />
        </div>

        <div className="flex flex-col gap-5">
          <h1 className="text-3xl font-bold leading-snug">{data.title}</h1>

          <p className="text-gray-400 text-sm">⭐ {data.rating} / 5</p>

          <div className="flex items-center gap-3">
            <span className="text-2xl font-bold text-(--color-accent)">
              ₹{priceDiscounted(data.price , data.discountPercentage)}
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
              <Check size={16} className="text-green-500" />
              <span>In Stock</span>
            </p>

            <p className="flex items-center gap-2">
              <Truck size={16} className="text-blue-400" />
              <span>Free Delivery</span>
            </p>
          </div>

          <div className="flex gap-4 mt-4">
            <button
              onClick={() => {
                navigate("/payment/cart", {
                  state: {
                    items: [
                      {
                        productId: data.id,
                        quantity: 1,
                      },
                    ],
                    total: priceDiscounted(data.price , data.discountPercentage),
                  },
                });
              }}
              className="flex-1 bg-(--color-accent) text-(--color-text) py-3 rounded-lg font-semibold hover:opacity-90 cursor-pointer transition"
            >
              Buy Now
            </button>

            <button
              onClick={() => cartHandle(data)}
              className="flex-1 border border-(--color-accent) py-3 rounded-lg font-semibold hover:bg-(--color-accent) cursor-pointer transition"
            >
              {!isCart ? "Add to cart" : " Added to cart"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OneProduct;

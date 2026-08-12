import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

import Loader from "../../../components/common/Loader";


import {
  useEditProductById,
} from "../../../tanstack/hooks/mutations/product/adminProductMutations";

import {
  useGetCategories,
} from "../../../tanstack/hooks/queries/category/categoryQueries";

import {
  useGetProductById,
} from "../../../tanstack/hooks/queries/product/productQueries";
import ProductForm from "../../../components/admin/adminProduct/ProductForm";
import ProductImageUpload from "../../../components/admin/adminProduct/ProductImageUpload";


const EditFish = () => {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    costPrice: "",
    stock: "",
    discountPercentage: "",
    description: "",
  });

  const [image, setImage] = useState("");
  const [preview, setPreview] = useState("");
  const [error, setError] = useState({});

  const { id } = useParams();

  const {
    data,
    isLoading,
    isError,
  } = useGetProductById(id);

  const { mutate, isPending } = useEditProductById();

  const { data: category } = useGetCategories();

  const client = useQueryClient();
  const navigate = useNavigate();


  useEffect(() => {
    if (data) {
      setFormData({
        name: data.name || "",
        category: data.categoryId || "",
        price: data.originalPrice || "",
        costPrice: data.costPrice || "",
        stock: data.stock || "",
        discountPercentage:
          data.discountPercentage || "",
        description: data.description || "",
      });

      setImage(data.imageUrls[0] || "");
      setPreview(data.imageUrls[0] || "");
    }
  }, [data]);


  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));

    setError((prev) => ({
      ...prev,
      [e.target.name]: "",
    }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = {};

    if (!formData.name)
      errors.name = "Fish name is required";

    if (!formData.category)
      errors.category = "Category is required";

    if (!formData.price)
      errors.price = "Price is required";

    if (formData.stock === "")
      errors.stock = "Stock is required";

    if (!formData.costPrice)
      errors.costPrice = "Cost Price is required";

    if (formData.discountPercentage === "")
      errors.discountPercentage = "Discount is required";

    if (!formData.description)
      errors.description = "Description is required";


    if (Object.keys(errors).length > 0) {
      setError(errors);
      return;
    }


    try {
      const form = new FormData();

      form.append("name", formData.name);
      form.append(
        "description",
        formData.description
      );
      form.append(
        "price",
        Number(formData.price)
      );
      form.append(
        "costPrice",
        Number(formData.costPrice)
      );
      form.append(
        "stock",
        Number(formData.stock)
      );
      form.append(
        "discountPercentage",
        Number(formData.discountPercentage)
      );
      form.append(
        "categoryId",
        formData.category
      );
      form.append("isPrimary", true);


      if (image instanceof File) {
        form.append("image", image);
      }


      mutate(
        {
          id,
          data: form,
        },
        {
          onSuccess: () => {
            toast.success(
              "Product edited successfully"
            );

            client.invalidateQueries({
              queryKey: ["products"],
            });

            navigate("/admin/viewfish");
          },

          onError: (err) => {
            toast.error(err.message);
          },
        }
      );

    } catch (error) {
      toast.error(error.message);
    }
  };


  if (isLoading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <Loader />
      </div>
    );
  }


  if (isError) {
    return (
      <div className="flex justify-center items-center h-screen">
        Product not found
      </div>
    );
  }


  return (
    <div className="w-full min-h-screen bg-gray-200 p-6">

      <div className="max-w-7xl mx-auto grid grid-cols-1 xl:grid-cols-3 gap-8">

        <ProductForm
          title="Edit Fish"
          description="Update fish product information"
          buttonText="Save Change"
          formData={formData}
          error={error}
          category={category}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          isPending={isPending}
        />


        <ProductImageUpload
          image={image}
          preview={preview}
          setImage={setImage}
          setPreview={setPreview}
          isPending={isPending}
        />

      </div>

    </div>
  );
};


export default EditFish;
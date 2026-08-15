import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

import { useAddProduct } from "../../../tanstack/hooks/mutations/product/adminProductMutations";
import { useGetCategories } from "../../../tanstack/hooks/queries/category/categoryQueries";
import ProductForm from "../../../components/admin/adminProduct/ProductForm";
import ProductImageUpload from "../../../components/admin/adminProduct/ProductImageUpload";

const AddFish = () => {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    costPrice: "",
    stock: "",
    discountPercentage: "",
    description: "",
  });

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [error, setError] = useState({});

  const navigate = useNavigate();
  const client = useQueryClient();

  const { data: category } = useGetCategories();

  const { mutate, isPending } = useAddProduct();

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

  const handleSubmit = (e) => {
    e.preventDefault();

    const errors = {};

    if (!formData.name.trim()) {
      errors.name = "Fish name is required";
    } else if (formData.name.trim().length < 3) {
      errors.name = "Fish name must be at least 3 characters";
    }

    if (!formData.category) {
      errors.category = "Category is required";
    }

    if (formData.price === "") {
      errors.price = "Selling price is required";
    } else if (Number(formData.price) <= 0) {
      errors.price = "Selling price must be greater than 0";
    }

    if (formData.costPrice === "") {
      errors.costPrice = "Cost price is required";
    } else if (Number(formData.costPrice) <= 0) {
      errors.costPrice = "Cost price must be greater than 0";
    }

    if (
      formData.price !== "" &&
      formData.costPrice !== "" &&
      Number(formData.costPrice) > Number(formData.price)
    ) {
      errors.costPrice = "Cost price cannot be greater than selling price";
    }

    if (formData.stock === "") {
      errors.stock = "Stock is required";
    } else if (Number(formData.stock) < 0) {
      errors.stock = "Stock cannot be negative";
    } else if (!Number.isInteger(Number(formData.stock))) {
      errors.stock = "Stock must be a whole number";
    }

    if (formData.discountPercentage === "") {
      errors.discountPercentage = "Discount is required";
    } else if (
      Number(formData.discountPercentage) < 0 ||
      Number(formData.discountPercentage) > 100
    ) {
      errors.discountPercentage = "Discount must be between 0 and 100";
    }

    // Description
    if (!formData.description.trim()) {
      errors.description = "Description is required";
    } else if (formData.description.trim().length < 10) {
      errors.description = "Description must be at least 10 characters";
    }

    // Image
    if (!image) {
      errors.image = "Product image is required";
    }

    if (Object.keys(errors).length > 0) {
      setError(errors);
      return;
    }

    try {
      const form = new FormData();

      form.append("name", formData.name);
      form.append("description", formData.description);

      form.append("price", Number(formData.price));

      form.append("costPrice", Number(formData.costPrice));

      form.append("stock", Number(formData.stock));

      form.append("discountPercentage", Number(formData.discountPercentage));

      form.append("categoryId", formData.category);

      form.append("isPrimary", true);

      if (image instanceof File) {
        form.append("image", image);
      }

      mutate(form, {
        onSuccess: () => {
          toast.success("Product added successfully");

          client.invalidateQueries({
            queryKey: ["products"],
          });

          navigate("/admin/viewfish");
        },

        onError: (err) => {
          toast.error(err.message || "Failed to add product");
        },
      });
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="w-full min-h-screen bg-gray-200 p-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 xl:grid-cols-3 gap-8">
        <ProductForm
          title="Add Fish"
          description="Add a new fish product"
          buttonText="Add Fish"
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
          error={error}
        />
      </div>
    </div>
  );
};

export default AddFish;

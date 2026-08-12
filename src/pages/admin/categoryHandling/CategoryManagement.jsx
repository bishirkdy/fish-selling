import { useState } from "react";
import { toast } from "react-toastify";
import Loader from "../../../components/common/Loader";
import { useGetCategories } from "../../../tanstack/hooks/queries/category/categoryQueries";
import {
  useAddCategory,
  useDeleteCategory,
} from "../../../tanstack/hooks/mutations/category/adminCategoryMutations";
import CategoryList from "../../../components/admin/adminCategory/CategoryList";
import AddCategory from "../../../components/admin/adminCategory/AddCategory";
import { useQueryClient } from "@tanstack/react-query";

const CategoryManagement = () => {
  const [categoryName, setCategoryName] = useState("");
  const [search, setSearch] = useState("");
  const client = useQueryClient()
  const { data: categories, isLoading } = useGetCategories();

  const {
    mutate: addCategory,
    isPending: addPending,
  } = useAddCategory();

  const {
    mutate: deleteCategory,
    isPending: deletePending,
  } = useDeleteCategory();

  const submitHandler = (e) => {
    e.preventDefault();

    if (!categoryName.trim()) {
      toast.error("Category name is required");
      return;
    }

    addCategory(
      {
        name: categoryName,
      },
      {
        onSuccess: () => {
          toast.success("Category added successfully");
          client.invalidateQueries({queryKey : ["categories"]})
          setCategoryName("");
        },

        onError: (err) => {
          toast.error(err.message || "Something went wrong");
        },
      }
    );
  };

  const deleteHandler = (id) => {
    if (!window.confirm("Delete this category?")) {
      return;
    }

    deleteCategory(id, {
      onSuccess: () => {
        toast.success("Category deleted");
        client.invalidateQueries({queryKey : ["categories"]})

      },

      onError: (err) => {
        toast.error(err.message || "Delete failed");
      },
    });
  };

  if (isLoading) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-gray-100 p-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

        <AddCategory
          categoryName={categoryName}
          setCategoryName={setCategoryName}
          submitHandler={submitHandler}
          addPending={addPending}
        />

        <CategoryList
          categories={categories}
          search={search}
          setSearch={setSearch}
          deleteHandler={deleteHandler}
          deletePending={deletePending}
        />

      </div>
    </div>
  );
};

export default CategoryManagement;
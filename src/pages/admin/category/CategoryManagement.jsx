import { useState } from "react";
import { Search, Trash2, Tag } from "lucide-react";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";

import Loader from "../../../components/Loader";
import { useGetCategories } from "../../../tanstack/hooks/queries/category/categoryQueries";
import { useAddCategory, useDeleteCategory } from "../../../tanstack/hooks/mutations/category/adminCategoryMutations";



const CategoryManagement = () => {
  const [categoryName, setCategoryName] = useState("");
  const [search, setSearch] = useState("");

  const queryClient = useQueryClient();

  const { data: categories, isLoading } = useGetCategories();
  const { mutate: addCategory, isPending: addPending } = useAddCategory();
  const { mutate: deleteCategory, isPending: deletePending } =
    useDeleteCategory();

  const filteredCategories = categories?.filter((category) =>
    category.name.toLowerCase().includes(search.toLowerCase())
  );

  function submitHandler(e) {
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
          queryClient.invalidateQueries({
            queryKey: ["categories"],
          });

          setCategoryName("");
        },
        onError: (err) => {
          toast.error(err.message || "Something went wrong");
        },
      }
    );
  }

  function deleteHandler(id) {
    if (!window.confirm("Delete this category?")) return;

    deleteCategory(id, {
      onSuccess: () => {
        toast.success("Category deleted");
        queryClient.invalidateQueries({
          queryKey: ["categories"],
        });
      },
      onError: (err) => {
        toast.error(err.message || "Delete failed");
      },
    });
  }

  if (isLoading) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-gray-100 p-8">

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Add Category */}

        <div className="bg-white rounded-3xl shadow-sm p-6 h-fit">

          <h2 className="text-2xl font-bold mb-6">
            Add Category
          </h2>

          <form onSubmit={submitHandler} className="space-y-5">

            <div>
              <label className="font-medium block mb-2">
                Category Name
              </label>

              <input
                type="text"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
                placeholder="Enter category name"
                className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-black"
              />
            </div>

            <button
              disabled={addPending}
              className="w-full bg-black text-white py-3 rounded-xl hover:bg-gray-800 disabled:opacity-50 cursor-pointer"
            >
              {addPending ? "Adding..." : "Add Category"}
            </button>

          </form>

        </div>

        {/* Category List */}

        <div className="lg:col-span-2 bg-white rounded-3xl shadow-sm">

          <div className="p-6 border-b flex flex-col md:flex-row md:items-center md:justify-between gap-4">

            <h2 className="text-2xl font-bold">
              Categories
            </h2>

            <div className="relative w-full md:w-80">

              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type="text"
                placeholder="Search category..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full border rounded-xl pl-10 pr-4 py-3 outline-none"
              />

            </div>

          </div>

          <table className="w-full">

            <thead className="bg-gray-50">

              <tr>

                <th className="text-left px-6 py-4">No</th>

                <th className="text-left px-6 py-4">
                  Category
                </th>

                <th className="text-center px-6 py-4">
                  Delete
                </th>

              </tr>

            </thead>

            <tbody>

              {filteredCategories?.map((category, index) => (

                <tr
                  key={category.id}
                  className="border-b last:border-none"
                >

                  <td className="px-6 py-5">
                    {index + 1}
                  </td>

                  <td className="px-6 py-5">

                    <div className="flex items-center gap-3">

                      <Tag size={18} />

                      <span className="font-medium">
                        {category.name}
                      </span>

                    </div>

                  </td>

                  <td className="px-6 py-5">

                    <div className="flex justify-center">

                      <button
                        disabled={deletePending}
                        onClick={() => deleteHandler(category.id)}
                        className="w-10 h-10 rounded-xl bg-red-100 hover:bg-red-200 text-red-600 flex items-center justify-center cursor-pointer disabled:opacity-50"
                      >
                        <Trash2 size={18} />
                      </button>

                    </div>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

          {filteredCategories?.length === 0 && (

            <div className="text-center py-16">

              <Tag
                size={55}
                className="mx-auto text-gray-300"
              />

              <h2 className="text-xl font-bold mt-4">
                No Categories
              </h2>

              <p className="text-gray-500 mt-2">
                Add your first category.
              </p>

            </div>

          )}

        </div>

      </div>

    </div>
  );
};

export default CategoryManagement;
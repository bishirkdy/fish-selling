import { useMutation } from "@tanstack/react-query";
import { addCategory, deleteCategory } from "../../../../services/category/adminCategoryService";


export const useAddCategory = () => {
  return useMutation({
    mutationFn: addCategory,
  });
};

export const useDeleteCategory = () => {
  return useMutation({
    mutationFn: deleteCategory,
  });
};
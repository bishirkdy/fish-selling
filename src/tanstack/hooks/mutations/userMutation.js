import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addUser, loginUser } from "../../api/userApi";

export const useCreateUser = () => {
  const client = useQueryClient();
  return useMutation({
    mutationFn: addUser,
    onSuccess: () => {
      client.invalidateQueries(["users"]);
    },
  });
};
export const useLogin = () => {
  return useMutation({
    mutationFn: loginUser,
  });
};

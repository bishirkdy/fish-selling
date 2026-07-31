import { useMutation, useQueryClient } from "@tanstack/react-query";
import { loginUser, registerUser } from "../../../../services/auth/authServices";

export const useRegisterUser = () => {
  const client = useQueryClient();
  return useMutation({
    mutationFn: registerUser,
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
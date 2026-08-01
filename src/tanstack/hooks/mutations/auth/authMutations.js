import { useMutation, useQueryClient } from "@tanstack/react-query";
import { forgotPassword, loginUser, logoutUser, registerUser, resetPassword } from "../../../../services/auth/authServices";

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

export const useLogout = () => {
  return useMutation({
    mutationFn: logoutUser,
  });
};

export const useForgotPassword = () => {
  return useMutation({
    mutationFn: forgotPassword,
  });
};

export const useResetPassword = () => {
  return useMutation({
    mutationFn: resetPassword,
  });
};
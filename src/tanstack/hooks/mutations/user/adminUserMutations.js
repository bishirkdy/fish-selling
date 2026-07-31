import { useMutation } from "@tanstack/react-query"
import { blockUser, unblockUser } from "../../../../services/user/adminUserService"

export const useBlockUser = () => {
  return useMutation({
    mutationFn : blockUser
  })
}

export const useUnblockUser = () => {
  return useMutation({
    mutationFn : unblockUser
  })
}
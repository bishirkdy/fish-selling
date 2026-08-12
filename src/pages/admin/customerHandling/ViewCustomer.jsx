import { useState } from "react";
import { toast } from "react-toastify";
import { Users } from "lucide-react";
import Loader from "../../../components/common/Loader";
import {
  useBlockUser,
  useDeleteUser,
  useUnblockUser,
} from "../../../tanstack/hooks/mutations/user/adminUserMutations";

import { useGetUsers } from "../../../tanstack/hooks/queries/user/adminUserQueries";
import { useQueryClient } from "@tanstack/react-query";
import CustomerFilters from "../../../components/admin/adminCustomer/CustomerFilters";
import CustomerTable from "../../../components/admin/adminCustomer/CustomerTable";
import CustomerPagination from "../../../components/admin/adminCustomer/CustomerPagination";

const ViewCustomer = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [deletingId, setDeletingId] = useState(null);

  const pageSize = 6;
  const client = useQueryClient();

  const {
    data,
    isLoading,
    isFetching,
  } = useGetUsers({
    page,
    pageSize,
    search,
    status: filter,
  });

  const {
    mutate: userBlockMutate,
    isPending: blockPending,
  } = useBlockUser();

  const {
    mutate: deleteMutate,
    isPending: deletePending,
  } = useDeleteUser();

  const {
    mutate: userUnblockMutate,
    isPending: unblockPending,
  } = useUnblockUser();

  const blockUserHandler = (id) => {
    if (!window.confirm("Block this user?")) return;

    userBlockMutate(id, {
      onSuccess: () => {
        client.invalidateQueries({
          queryKey: ["users"],
        });

        toast.success("User has been blocked");
      },

      onError: (err) => {
        toast.error(err.message);
      },
    });
  };

  const unblockUserHandler = (id) => {
    if (!window.confirm("Unblock this user?")) return;

    userUnblockMutate(id, {
      onSuccess: () => {
        client.invalidateQueries({
          queryKey: ["users"],
        });

        toast.success("User has been unblocked");
      },

      onError: (err) => {
        toast.error(err.message);
      },
    });
  };

  const deleteUserHandler = (id) => {
    if (
      !window.confirm(
        "Are you sure you want to permanently delete this user?"
      )
    ) {
      return;
    }

    setDeletingId(id);

    deleteMutate(id, {
      onSuccess: () => {
        client.invalidateQueries({
          queryKey: ["users"],
        });

        toast.success("User deleted successfully");
      },

      onError: (err) => {
        toast.error(
          err.message || "Failed to delete user"
        );
      },

      onSettled: () => {
        setDeletingId(null);
      },
    });
  };

  if (isLoading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  const customers = data?.data ?? [];

  return (
    <div className="w-full min-h-screen bg-gray-100 p-8">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-(--background)">
            Customers
          </h1>

          <p className="text-(--color-background)">
            Manage all registered customers
          </p>
        </div>

        <div className="bg-(--color-background) text-white px-6 py-3 rounded-2xl font-semibold">
          Total : {data?.totalCount ?? 0}
        </div>
      </div>

      {/* Filters */}
      <CustomerFilters
        search={search}
        setSearch={setSearch}
        filter={filter}
        setFilter={setFilter}
        setPage={setPage}
      />

      {/* Table */}
      {customers.length > 0 && (
        <CustomerTable
          customers={customers}
          page={page}
          pageSize={pageSize}
          blockPending={blockPending}
          unblockPending={unblockPending}
          deletingId={deletingId}
          blockUserHandler={blockUserHandler}
          unblockUserHandler={unblockUserHandler}
          deleteUserHandler={deleteUserHandler}
        />
      )}

      {/* Pagination */}
      {customers.length > 0 && (
        <CustomerPagination
          page={page}
          setPage={setPage}
          totalPages={data?.totalPages}
          isFetching={isFetching}
        />
      )}

      {/* Empty */}
      {customers.length === 0 && (
        <div className="p-12 mt-8 text-center">
          <Users
            size={60}
            className="mx-auto text-gray-300 mb-4"
          />

          <h2 className="text-2xl font-bold text-gray-700">
            No Customer Found
          </h2>

          <p className="text-gray-500 mt-2">
            Try searching with another keyword
          </p>
        </div>
      )}

    </div>
  );
};

export default ViewCustomer;
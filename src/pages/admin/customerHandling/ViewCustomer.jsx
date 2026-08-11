import { useState } from "react";
import {
  Search,
  Users,
  Mail,
  Ban,
  Unlock,
  Loader2,
  Trash2,
} from "lucide-react";
import { toast } from "react-toastify";
import Loader from "../../../components/Loader";
import {
  useBlockUser,
  useDeleteUser,
  useUnblockUser,
} from "../../../tanstack/hooks/mutations/user/adminUserMutations";
import { useGetUsers } from "../../../tanstack/hooks/queries/user/adminUserQueries";
import { useQueryClient } from "@tanstack/react-query";

const ViewCustomer = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const pageSize = 6;
  const { data, isLoading, isFetching } = useGetUsers({
    page,
    pageSize,
    search,
    status: filter,
  });

  const [deletingId, setDeletingId] = useState(null);
  const { mutate: userBlockMutate, isPending: blockPending } = useBlockUser();
  const { mutate: deleteMutate, isPending: deletePending } = useDeleteUser();
  const { mutate: userUnblockMutate, isPending: unblockPending } =
    useUnblockUser();
  const client = useQueryClient();

  if (isLoading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  function blockUserHandler(id) {
    if (!window.confirm("Block this user?")) return;

    userBlockMutate(id, {
      onSuccess: () => {
        client.invalidateQueries({ queryKey: ["users"] });
        toast.success("User has been blocked");
      },
      onError: (err) => {
        toast.error(err.message);
      },
    });
  }

  function unblockUserHandler(id) {
    if (!window.confirm("Unblock this user?")) return;

    userUnblockMutate(id, {
      onSuccess: () => {
        client.invalidateQueries({ queryKey: ["users"] });
        toast.success("User has been unblocked");
      },
      onError: (err) => {
        toast.error(err.message);
      },
    });
  }

  function deleteUserHandler(id) {
    if (
      !window.confirm("Are you sure you want to permanently delete this user?")
    )
      return;

    setDeletingId(id);

    deleteMutate(id, {
      onSuccess: () => {
        client.invalidateQueries({ queryKey: ["users"] });
        toast.success("User deleted successfully");
      },
      onError: (err) => {
        toast.error(err.message || "Failed to delete user");
      },
      onSettled: () => {
        setDeletingId(null);
      },
    });
  }

  return (
    <div className="w-full min-h-screen bg-gray-100 p-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-(--background)">Customers</h1>
          <p className="text-(--color-background)">
            Manage all registered customers
          </p>
        </div>

        <div
          className="
            bg-(--color-background)
            text-white
            px-6
            py-3
            rounded-2xl
            font-semibold
          "
        >
          Total : {data?.totalCount ?? 0}
        </div>
      </div>

      <div className="border-(--color-background) rounded-2xl shadow-sm mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search
              size={18}
              className="
        absolute
        top-1/2
        left-4
        -translate-y-1/2
      "
            />

            <input
              type="text"
              placeholder="Search customer..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              className="
        w-full
        border
        border-gray-300
        rounded-2xl
        pl-11
        pr-4
        py-3
        outline-none
        focus:ring-2
      "
            />
          </div>

          <select
            onChange={(e) => {
              setFilter(e.target.value);
              setPage(1);
            }}
            className="border border-gray-300 rounded-2xl px-4 py-3 outline-none focus:ring-2 bg-white"
          >
            <option value="all">All Users</option>
            <option value="active">Active Users</option>
            <option value="blocked">Blocked Users</option>
          </select>
        </div>
      </div>
      {data?.data.length > 0 && (
        <div className="bg-white rounded-3xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-250">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className=" py-4 text-sm font-semibold text-gray-600">
                    No
                  </th>
                  <th className="text-left px-6 py-2 text-sm font-semibold text-gray-600">
                    Customer
                  </th>

                  <th className="text-left px-6 py-2 text-sm font-semibold text-gray-600">
                    Contact
                  </th>

                  <th className="text-left px-6 py-2 text-sm font-semibold text-gray-600">
                    Status
                  </th>

                  <th className="text-center py-2 text-sm font-semibold text-gray-600">
                    Block User
                  </th>
                  <th className="text-center py-2 text-sm font-semibold text-gray-600">
                    Delete
                  </th>
                </tr>
              </thead>

              <tbody>
                {data?.data?.map((customer, index) => (
                  <tr
                    key={customer.id}
                    className="border-b hover:bg-gray-50 transition"
                  >
                    <td className="px-6 py-3">
                      {(page - 1) * pageSize + index + 1}
                    </td>
                    <td className="px-6 py-3">
                      <div className="flex items-center gap-4">
                        <div>
                          <h2 className="font-semibold text-gray-800">
                            {customer.name}
                          </h2>
                          <p className="text-sm text-gray-500 mt-1">
                            ID : #{customer.id}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-3">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-gray-600">
                          <Mail size={15} />

                          <span className="text-sm">{customer.email}</span>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-3">
                      <span
                        className={`px-4 py-2 rounded-full text-sm font-semibold
                        ${
                          customer.isBlocked
                            ? "bg-red-100 text-red-600"
                            : "bg-green-100 text-green-700"
                        }
                      `}
                      >
                        {customer.isBlocked ? "Blocked" : "Active"}
                      </span>
                    </td>
                    <td className="py-3 pl-6">
                      <button
                        disabled={blockPending || unblockPending}
                        onClick={() =>
                          customer.isBlocked
                            ? unblockUserHandler(customer.id)
                            : blockUserHandler(customer.id)
                        }
                        className={`w-10 h-10 flex items-center justify-center rounded-xl transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed
                      ${
                        customer.isBlocked
                          ? "bg-green-100 hover:bg-green-200 text-green-600"
                          : "bg-red-100 hover:bg-red-200 text-red-600"
                      }`}
                      >
                        {blockPending || unblockPending ? (
                          <Loader2 size={18} className="animate-spin" />
                        ) : customer.isBlocked ? (
                          <Unlock size={18} />
                        ) : (
                          <Ban size={18} />
                        )}
                      </button>
                    </td>
                    <td className="py-3 pl-6">
                      <button
                        disabled={deletingId === customer.id}
                        onClick={() => deleteUserHandler(customer.id)}
                        className="w-10 h-10 flex items-center justify-center rounded-xl bg-red-100 hover:bg-red-200 text-red-600 transition disabled:opacity-50"
                      >
                        {deletingId === customer.id ? (
                          <Loader2 size={18} className="animate-spin" />
                        ) : (
                          <Trash2 size={18} />
                        )}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex items-center justify-center gap-2 p-6">
            <button
              disabled={page === 1 || isFetching}
              onClick={() => setPage((prev) => prev - 1)}
              className="px-4 py-2 rounded-lg bg-gray-200 disabled:opacity-50"
            >
              Previous
            </button>

            <span className="px-4 py-2">
              Page {data?.page ?? page} of {data?.totalPages ?? 1}
            </span>

            <button
              disabled={page === data?.totalPages || isFetching}
              onClick={() => setPage((prev) => prev + 1)}
              className="px-4 py-2 rounded-lg bg-gray-200 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {data?.data.length === 0 && (
        <div
          className="p-12 mt-8 text-center
          "
        >
          <Users size={60} className="mx-auto text-gray-300 mb-4" />
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

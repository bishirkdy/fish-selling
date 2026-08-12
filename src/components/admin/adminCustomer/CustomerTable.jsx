import {
  Mail,
  Ban,
  Unlock,
  Loader2,
  Trash2,
} from "lucide-react";

const CustomerTable = ({
  customers,
  page,
  pageSize,
  blockingId,
  unblockingId,
  deletingId,
  blockUserHandler,
  unblockUserHandler,
}) => {
  return (
    <div className="bg-white rounded-3xl shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full min-w-250">

          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="py-4 text-sm font-semibold text-gray-600">
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

              {/* <th className="text-center py-2 text-sm font-semibold text-gray-600">
                Delete
              </th> */}
            </tr>
          </thead>


          <tbody>
            {customers?.map((customer, index) => {

              const isBlocking =
                blockingId === customer.id;

              const isUnblocking =
                unblockingId === customer.id;

              const isChangingStatus =
                isBlocking || isUnblocking;

              return (
                <tr
                  key={customer.id}
                  className="border-b hover:bg-gray-50 transition"
                >

                  {/* Number */}
                  <td className="px-6 py-3">
                    {(page - 1) * pageSize + index + 1}
                  </td>


                  {/* Customer */}
                  <td className="px-6 py-3">
                    <div>
                      <h2 className="font-semibold text-gray-800">
                        {customer.name}
                      </h2>

                      <p className="text-sm text-gray-500 mt-1">
                        ID : #{customer.id}
                      </p>
                    </div>
                  </td>


                  {/* Email */}
                  <td className="px-6 py-3">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Mail size={15} />

                      <span className="text-sm">
                        {customer.email}
                      </span>
                    </div>
                  </td>


                  {/* Status */}
                  <td className="px-6 py-3">
                    <span
                      className={`px-4 py-2 rounded-full text-sm font-semibold ${
                        customer.isBlocked
                          ? "bg-red-100 text-red-600"
                          : "bg-green-100 text-green-700"
                      }`}
                    >
                      {customer.isBlocked
                        ? "Blocked"
                        : "Active"}
                    </span>
                  </td>


                  {/* Block / Unblock */}
                  <td className="py-3 pl-6">
                    <button
                      disabled={isChangingStatus}
                      onClick={() =>
                        customer.isBlocked
                          ? unblockUserHandler(customer.id)
                          : blockUserHandler(customer.id)
                      }
                      className={`w-10 h-10 flex items-center justify-center rounded-xl transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${
                        customer.isBlocked
                          ? "bg-green-100 hover:bg-green-200 text-green-600"
                          : "bg-red-100 hover:bg-red-200 text-red-600"
                      }`}
                    >
                      {isChangingStatus ? (
                        <Loader2
                          size={18}
                          className="animate-spin"
                        />
                      ) : customer.isBlocked ? (
                        <Unlock size={18} />
                      ) : (
                        <Ban size={18} />
                      )}
                    </button>
                  </td>


                  {/* //Delete
                  <td className="py-3 pl-6">
                    <button
                      disabled={
                        deletingId === customer.id
                      }
                      onClick={() =>
                        deleteUserHandler(customer.id)
                      }
                      className="w-10 h-10 flex items-center justify-center rounded-xl bg-red-100 hover:bg-red-200 text-red-600 transition disabled:opacity-50"
                    >
                      {deletingId === customer.id ? (
                        <Loader2
                          size={18}
                          className="animate-spin"
                        />
                      ) : (
                        <Trash2 size={18} />
                      )}
                    </button>
                  </td> */}

                </tr>
              );
            })}
          </tbody>

        </table>
      </div>
    </div>
  );
};

export default CustomerTable;
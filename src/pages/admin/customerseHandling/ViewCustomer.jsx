import React, { useState } from "react";
import {
  Search,
  Eye,
  Trash2,
  Mail,
  Phone,
  MapPin,
  Users,
} from "lucide-react";

const customersData = [
  {
    id: 1,
    name: "John Mathew",
    email: "john@example.com",
    phone: "+91 9876543210",
    location: "Kerala, India",
    orders: 12,
    image: "https://i.pravatar.cc/150?img=12",
    status: "Active",
  },
  {
    id: 2,
    name: "Rahul",
    email: "rahul@example.com",
    phone: "+91 9876543211",
    location: "Mumbai, India",
    orders: 5,
    image: "https://i.pravatar.cc/150?img=15",
    status: "Blocked",
  },
  {
    id: 3,
    name: "Ameen",
    email: "ameen@example.com",
    phone: "+91 9876543212",
    location: "Delhi, India",
    orders: 18,
    image: "https://i.pravatar.cc/150?img=18",
    status: "Active",
  },
  {
    id: 4,
    name: "Faiz",
    email: "faiz@example.com",
    phone: "+91 9876543213",
    location: "Chennai, India",
    orders: 8,
    image: "https://i.pravatar.cc/150?img=25",
    status: "Active",
  },
];

const ViewCustomer = () => {
  const [search, setSearch] = useState("");

  const filteredCustomers = customersData.filter((customer) =>
    customer.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="w-full min-h-screen bg-gray-100 p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Customers
          </h1>

          <p className="text-gray-500 mt-2">
            Manage all registered customers
          </p>
        </div>

        <div
          className="
            bg-cyan-500
            text-white
            px-6
            py-3
            rounded-2xl
            font-semibold
          "
        >
          Total : {customersData.length}
        </div>
      </div>

      {/* Search */}
      <div className="bg-white rounded-3xl p-5 shadow-sm mb-6">
        <div className="relative max-w-md">
          <Search
            size={18}
            className="
              absolute
              top-1/2
              left-4
              -translate-y-1/2
              text-gray-400
            "
          />

          <input
            type="text"
            placeholder="Search customer..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
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
              focus:ring-cyan-500
            "
          />
        </div>
      </div>

      {/* Customers Table */}
      <div className="bg-white rounded-3xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1000px]">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                  Customer
                </th>

                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                  Contact
                </th>

                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                  Location
                </th>

                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                  Orders
                </th>

                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                  Status
                </th>

                <th className="text-center px-6 py-4 text-sm font-semibold text-gray-600">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredCustomers.map((customer) => (
                <tr
                  key={customer.id}
                  className="
                    border-b
                    hover:bg-gray-50
                    transition
                  "
                >
                  {/* Customer */}
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-4">
                      <img
                        src={customer.image}
                        alt={customer.name}
                        className="
                          w-14
                          h-14
                          rounded-2xl
                          object-cover
                        "
                      />

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

                  {/* Contact */}
                  <td className="px-6 py-5">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-gray-600">
                        <Mail size={15} />

                        <span className="text-sm">
                          {customer.email}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 text-gray-600">
                        <Phone size={15} />

                        <span className="text-sm">
                          {customer.phone}
                        </span>
                      </div>
                    </div>
                  </td>

                  {/* Location */}
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-2 text-gray-600">
                      <MapPin size={16} />

                      <span>{customer.location}</span>
                    </div>
                  </td>

                  {/* Orders */}
                  <td className="px-6 py-5">
                    <div
                      className="
                        inline-flex
                        items-center
                        gap-2
                        bg-cyan-50
                        text-cyan-600
                        px-4
                        py-2
                        rounded-xl
                        font-semibold
                      "
                    >
                      <Users size={16} />

                      {customer.orders} Orders
                    </div>
                  </td>

                  {/* Status */}
                  <td className="px-6 py-5">
                    <span
                      className={`
                        px-4
                        py-2
                        rounded-full
                        text-sm
                        font-semibold
                        ${
                          customer.status === "Active"
                            ? "bg-green-100 text-green-600"
                            : "bg-red-100 text-red-600"
                        }
                      `}
                    >
                      {customer.status}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-5">
                    <div className="flex items-center justify-center gap-3">
                      <button
                        className="
                          w-10
                          h-10
                          flex
                          items-center
                          justify-center
                          rounded-xl
                          bg-gray-100
                          hover:bg-gray-200
                          transition
                        "
                      >
                        <Eye size={18} />
                      </button>

                      <button
                        className="
                          w-10
                          h-10
                          flex
                          items-center
                          justify-center
                          rounded-xl
                          bg-red-100
                          hover:bg-red-200
                          text-red-600
                          transition
                        "
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Empty State */}
      {filteredCustomers.length === 0 && (
        <div
          className="
            bg-white
            rounded-3xl
            p-12
            mt-8
            text-center
          "
        >
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
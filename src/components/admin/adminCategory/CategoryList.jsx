import { Search, Tag, Trash2 } from "lucide-react";

const CategoryList = ({
  categories,
  search,
  setSearch,
  deleteHandler,
  deletePending,
}) => {
  const filteredCategories = categories?.filter((category) =>
    category.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="lg:col-span-2 bg-white rounded-3xl shadow-sm">

      {/* Header + Search */}
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

      {/* Table */}
      {filteredCategories?.length > 0 && (
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left px-6 py-4">
                No
              </th>

              <th className="text-left px-6 py-4">
                Category
              </th>

              <th className="text-center px-6 py-4">
                Delete
              </th>
            </tr>
          </thead>

          <tbody>
            {filteredCategories.map((category, index) => (
              <tr
                key={category.id}
                className="border-b last:border-none"
              >
                <td className="px-6 py-3">
                  {index + 1}
                </td>

                <td className="px-6 py-3">
                  <div className="flex items-center gap-3">
                    <Tag size={18} />
                    <span className="font-medium">
                      {category.name}
                    </span>
                  </div>
                </td>

                <td className="px-6 py-3">
                  <div className="flex justify-center">
                    <button
                      disabled={deletePending}
                      onClick={() => deleteHandler(category.id)}
                      className="w-10 h-10 rounded-xl bg-red-100 hover:bg-red-200 text-red-600 flex items-center justify-center cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Empty */}
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
            {search
              ? "Try searching with another keyword."
              : "Add your first category."}
          </p>
        </div>
      )}
    </div>
  );
};

export default CategoryList;
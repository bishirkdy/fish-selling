const AddCategory = ({
  categoryName,
  setCategoryName,
  submitHandler,
  addPending,
}) => {
  return (
    <div className="bg-white rounded-3xl shadow-sm p-6 h-fit">
      <h2 className="text-2xl font-bold mb-6">
        Add Category
      </h2>

      <form onSubmit={submitHandler} className="space-y-5">
        <div>
          <label className="font-medium block mb-2">
            Category Name
          </label>

          <input
            type="text"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            placeholder="Enter category name"
            className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        <button
          type="submit"
          disabled={addPending}
          className="w-full bg-black text-white py-3 rounded-xl hover:bg-gray-800 disabled:opacity-50 cursor-pointer"
        >
          {addPending ? "Adding..." : "Add Category"}
        </button>
      </form>
    </div>
  );
};

export default AddCategory;